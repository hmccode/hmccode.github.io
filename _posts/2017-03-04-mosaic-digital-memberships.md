---
layout: post
author: "Khaled A"
title:  "Mosaic Digital Memberships"
date:   2017-03-04 10:12:45
summary: "A Digital Membership Technical Overview"
categories: mosaic digital membership
tags: Mosaic Digital Membership
featured_image: /images/cover.jpg
---

Digital Memberships refer to the memberships that are delivered to the members via the app. Right now, there is a small percentage of our active memberships considered digital, this is expected to change soon with the advent of many mobile apps in so many programs. 

Digital Memberships support 3 modes of operation for the mobile app:

- Full Membership - this mode supports the entire membership and requires that the member log in with an activation code.  
- Brochure-ware - this mode allows anyone to download the app and use it to browse content such as hotels, dining and offers.
- Invitee - this mode allows an invitee who received an invitation from a friend to download and activate the app for a period of time such as week. In this mode, the invitee will be able to avail discount codes to try out the membership. Dynamic Vouchers can also target an invitee membership if desired.

The following is true about digital memberships:

- Invitee activation codes length is 6 digits as opposed to 5 digits for the regular memberships. This allows the back-end to immediately recognize the invitee activation codes.
- Dynamic Voucher codes length is 6 digits as opposed to 5 or 9. This allows the back-end to immediately recognize the dynamic voucher codes.
- Dynamic Voucher redemptions happen outside Oracle and are processed entirely in the Document database.
- Dynamic voucher redemptions are subjected to a program redemption policy that is defined at the program level. More about that below.
- Discount codes are now persistent in the digital membership document database.
- Discount codes do support time-to-live expiration dates but it is not enforced.
- Pin generation allows members to generate short time-lived pin codes to allow customer support or reservation agents to impersonate them.

Along side the digital memberships, we also have the new concept of digital programs. The new approach for our products is to center everything around programs as opposed to hotel groups, region, etc. This seems to be a better fit for our products and services especially when the digital memberships will be essential to our future.

## Refresh Processor

Digital Memberships are pre-calculated entities that are constantly kept up-to-date by a refresh processor that knows where to pull data from. The digital memberships themselves are stored in a scalable Document DB database that can span multiple regions. In addition, digital membership summaries are stored in a search service to allow clients to search for properties within digital memberships in an extremely efficient way:

![Refresh Processor](https://mosaicapi.blob.core.windows.net/images/b28eb434-3bcf-4021-8f44-0cfa314d2f8f.png)

As depicted, the refresh processor:

- runs in the background as a separate process. 
- is triggered when a mobile device is either logged in or registered. 
- can also be triggered manually to force a refresh.
- can also be triggered by an import of existing mobile devices so they can be registered and refreshed. 
- pulls data from Oracle and the Engage server and updates the DocumentDB and the Search Service.

Having the digital membership readily available in a JSON format in the Document DB allows for much greater scalability and faster response time. The JSON-based digital membership contains the following salient information:

- Meta data such as ids, last update and last refresh.
- Membership Info such as card number, expiration date, etc.
- Device Info such as manufacturer, platform, device id, etc.
- Tracking Transactions - lists the membership tracking transactions in the last 12 months.
- Reservation Transactions - lists the membership reservation transactions in the last 12 months.
- Membership transactions lists all membership-bound transactions such as purchase, renewal, fulfillment, etc.
- Dynamic Vouchers - lists the membership eligible dynamic vouchers (and their expiration).
- Static Vouchers - lists the membership eligible static vouchers (and their expiration).
- Offers - lists the membership eligible offers.
- Discount Codes - lists all the discount codes that are availed for this membership and their consumption date.
- Invitees - lists all the persons that the member has invited to join the program. Usually there is an associated voucher (i.e. referral type) associated with each program that will be added to the member if any invitee actually joined the program. 
- Notifications - lists all the notification messages (whether push, SMS or Email) that were communicated to the member. Mainly this is used for renewal reminders.
- Pins - lists all the pins that were issued by the member to unlock his/her membership to a customer service agent so they can impersonate the member. 
- Counters - such as tracking transactions counter, reservation counter, food and beverage spend and room spend. 

*All digital membership refresh requests are persisted to the database in `Core.DigitalMembershipRefresh` so we can tack the program and membership codes that are being refreshed and the refresh duration.
*
Similarly digital programs are pre-calculated entities that are constantly kept up-to-date by a refresh processor that knows where to pull data from. The digital programs themselves are stored in a scalable Document DB database that can span multiple regions. Having the digital program readily available in a JSON format in the Document DB allows for much greater scalability and faster response time. The JSON-based digital program contains the following salient information:

- Meta data such as ids, last update and last refresh.
- Content per content type i.e. app or site
- Redemption Policies per voucher type i.e. food, room, spa, referral or other
- Tracking Transactions per hotel for the last 12 months
- Tracking Transactions per outlet for the last 12 months
- Voucher Redemptions per hotel for the last 12 months
- Dynamic Vouchers per hotel for the last 12 months
- Push Messages, their targets and stats for the last 12 months
- Offers for the last 12 months
- Email Campaigns, their targets and their status
- SMS Campaigns, their targets and their status
- Devices
- Sales per the different packages

*All digital programs refresh requests are persisted to the database in `Core.DigitalProgramRefresh` so we can tack the programs that are being refreshed and the refresh duration.
*

## Digital Service

It is a behind-the-scene service that provides access to the Document DB and the Search Service:

![Digital Service 1](https://mosaicapi.blob.core.windows.net/images/3b1561b4-0c6f-45e6-b6b2-a13b2208b96f.png)

There are 3 clients that indirectly use the Digital Service functionality:

- Mobile Apps
	- Login
	- Register Device
	- Invite Friends
	- Generate Discount Code
	- Generate Pin to allow customer support reps to impersonate members
	- Retrieve Dynamic Vouchers
	- Retrieve Static Vouchers
	- Retrieve Offers
- POS Agents
	- Validate Memberships
	- Validate Vouchers
	- Redeem Vouchers
	- Post Tracking Record
- Back office
	- Validate and Redeem Vouchers
	- Search Digital Memberships
	- Retrieve Membership Detail

The digital service attempts to minimize dependency on Oracle as much as possible:

- The Mobile Apps controller processes the `login`', `register device`, `invite friends`, `generate discount codes`, `generate pin code`, `retrieve static vouchers`, `retrieve dynamic vouchers` and `retrieve offers` directly against the digital membership. This will make the API to scale much better and keep the digital membership refreshed. 
- The POS Agents and the back office controllers look up the digital membership. If found, they process the requests (validation, redemption, un-redemption and tracking) against the digital membership directly. If not found, they will run the requests against Oracle directly as it used to do. 

### Oracle Requests

As discussed, when the digital service processes voucher redemption (or un-redemption) or tracking requests, it processes them against the digital membership directly. However, some requests need to be sent to Oracle such as Tracking and Static Voucher Redemption and un-redemption. To do so, the digital service does not synchronously call Oracle but enqueues up requests instead in a new table called `Core.OracleRequest`. This will buffer the requests against Oracle and will make the system function even if Oracle is down or under maintenance. There is a background task that runs every n minutes to process Oracle requests and track the number of attempts.

![Queued Oracle Requests](http://i.imgur.com/OtXKCUF.png)

### Redemption Policies

Dynamic vouchers redemption process can be policed by a set of rules defined at the program level. We refer to this as `Redemption Policy`. The program defines a set of dynamic voucher one for each voucher type: Food, Room, Spa, Referral or other. As noted, the redemption policies are stored per program in the digital program document.
 
## Reservation Service

It is a behind-the-scene services that provides access to the Document DB and the Search Service:

![Digital Service 2](https://mosaicapi.blob.core.windows.net/images/77b9f238-e8fe-4661-b5d7-95ad3f3c98d9.png)

There is only one client that indirectly uses the Reservation Service functionality:

- Reservation Portal
	- Login for members and impersonation for customer support
	- Search and retrieve digital memberships
	- Retrieve Hotels Availability
	- Book and redeem vouchers

## The Document DB

It is a NO-SQL database that has two main collections:
- Digital Memberships
- Digital Programs

The digital memberships collection stores all the details about memberships and the collection is partitioned by `program` for faster access. 

The digital programs collection stores the program content for apps and sites, the dynamic voucher redemption policies and many other as noted above. The redemption policies state, per voucher type i.e. Food, Room, spa, etc, how the redemption processor is supposed to behave. For example, it is possible to define a redemption policy that applies to room vouchers only and restricts out-of-network vouchers to one per hotel. The other collections stored in the digital program provide program stats that can be used in HMC Engage,m for example, to provide a reasonable and fast program performance report.  

## Scheduled or manual control APIs

There are several control APIs that can be invoked to keep the system healthy:

- Refresh Digital Membership - invoked to force refresh a digital membership identified by program and activation code. Planned Interval: Manual.
- Update Digital Memberships - in addition to the refresh process, this scheduler monitors the digital memberships that changed at the server and forces a refresh. Planned Interval: 1 hour.
- Import Digital Memberships - Invoked to import digital memberships per month/year or for the past n months. Planned Interval: Manual.
- Refresh Digital Program - invoked to force refresh a digital program identified by program. Planned Interval: 8 hours.
- Process queued-up Oracle Requests - in order to make the system less reliant on Oracle, we now enqueue Oracle requests an play them against Oracle when this scheduler runs. Planned Interval: 15 minutes.
- Update Oracle Health System - invoked to determine Oracle health status. The status is maintained in the database so that the POS agents pulse signals can determine whether Oracle is up or down. If down, the POS agents will switch to offline mode. Planned Interval: 5 minutes.

