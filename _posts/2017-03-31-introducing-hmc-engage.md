---
layout: post
author: "Khaled A"
title:  "Introducing HMC eNgage"
date:   2017-03-31 10:12:45
summary: "HMC eNgage is the new CRM!"
categories: HMC eNgage
tags: Mosaic Engage CRM
featured_image: /images/cover.jpg
---

## The Platform

`HMC eNgage` is `program` based! This means that the eNgage content is based on the program hotel group ids and therefore it encompasses the different hotels, outlets, call centers, sales, app companion ecommerce site, in-house portal and mobile app that are within this program. We truly think this is the most logical way of structuring our `value` delivery to our clients. 

The following are some examples of programs:

- CircleM - the entire CircleM program
- CH - the entire Clubhotel program
- CHME - the Clubhotel program for the Middle East
- CHME-UAE - the Clubhotel program for the UAE
- OROVERDE - the entire OroVerde program
- PCASIA - the entire PCASIA program
- PCASIA-CHN - the PCASIA program for China program

With this extreme flexibility on how we can conjure up programs, every scenario should be supported. Our customers can choose to monitor programs from a very high level i.e CH, monitor an individual country i.e. CHME-UAE or even an individual hotel (discouraged). The `HMC eNgage` platform will auto-adjust and self-refresh to accommodate the different programs and cater to their specific requirement. This is an example of Clubhotel parent and child programs: 

![Program Structure](https://mosaicapi.blob.core.windows.net/images/a4ddb9ab-0bfc-4b26-a6d4-ba092b94136c.png)

Although `HMC eNgage` was designed with Mosaic in mind, it has been architectured in such a way to allow other products to be plugged into the same `HMC eNgage` container host. This can be quite useful if we decide to offer a similar `eNgage` functionality for the VOILA product, `HMC eNgage` platform will be able to fit this requirement in quite nicely. 

![Extensible Architecture](https://mosaicapi.blob.core.windows.net/images/6bc41816-68ed-4511-852c-4d1508a8f064.png)

Internally, `HMC eNgage` routes requests to the different products and only offer a container to host the tabs and the user interaction. This extensible architecture will have a very positive impact and allows us to re-use our investment for public-facing products such as VOILA and internal-facing products such as Sapphire!!

What is with the `eNgage` name though? Well...it is up to your imagination....but when we invented the name, we thought of `explore` and `gauge`.... but then we also wanted this to be an engagement and engaging platform. So we called it conveniently `eNgage` and omitted the `u` to avoid spelling-mistake syndrome. Once you realize its full potential, I hope you will be as excited about it as we are!! :-)

## Tabs

In order to maximize the usefulness of `HMC eNgage`, the product user interface is built on tabs. Just like a browser, `HMC eNgage` allows users to open up different tabs with different content so one can view different things at the same time. Users can open up different instances of the same type...for example, the user can have different memberships search tabs each displaying different results. 

Each user session has a home tab (that cannot be dismissed) and a choice from several tab types:

![Tab Choices](https://mosaicapi.blob.core.windows.net/images/16cbc01f-3088-4b3d-91eb-79aa9ea1b66a.png)

This home tab acts as a reference point and a dashboard for the selected program. The following illustration shows 7 different tabs opened at once:

![Example of Tabs](https://mosaicapi.blob.core.windows.net/images/d4eb4b26-a8ca-4a5d-ab8e-d20f8f59fff7.png)

In addition, tabs can be dismissed in one single button as shown in the above illustration reference 8. This provides an added convenience to users.

## Permission Matrix

`HMC eNgage` provides a configurable permission matrix to control how `programs` are conveyed to the user. For example, we may be able to turn off the email campaign features on some programs or turn off the ability to export members to CSV. The matrix is extensive and covers all aspects of the platform. The following are just a few examples of popular permissions:

- Can send campaigns without approval - normally all campaigns are subject to approvals. For convenience, approval requests arrive to the approvers via Email detailing the campaign and the targets. Approvers can simply either approve or reject right from the email message. 
- Can send campaigns without throttling - each program can be configured to allow a maximum campaigns per user per day, per 7 days and per 30 days
- Can export - export buttons are available in most tabs. This permission allows or denies users the ability to export
- Can view tab type - normally users will be able to select from several tab types such as sales, F&B, reservations, app insights, etc. This set of permissions allows or denies users the ability to view these tabs

Here is a sample of an Email approval request:

![Approval Email](https://mosaicapi.blob.core.windows.net/images/30e89e08-c746-48f1-a218-bb4657050e5e.png)

1. The email contains information about the campaign name and description
2. The email actual email body is provided as a URL with sample data
3. The email contains `Approve` and `Reject` buttons to allow approvers to approve or reject from the email itself

## Dynamic Theming

Since `HMC eNgage` is targeted for our hotel clients and internal employees, it provides dynamic themeing based on the URL. So if the user has access to https://www.hmcengage.com, then the user sees the default product theme:

![Default Theming](https://mosaicapi.blob.core.windows.net/images/24501e3c-43a0-44bd-a3e5-0ec9cc66a237.png)

If a client hotel has access to their program customized URL i.e. `https://circlem.hmcengage.com`, then the user sees a customized product theme:

![CircleM Theming](https://mosaicapi.blob.core.windows.net/images/a1c598b2-47e0-41ff-8a60-15b83a3086f1.png)

## Transactional Requests

Since most of the data points in `HMC eNgage` are aggregated per a period, the platform allows users to request the actual transactions that make up these aggregations. The transactions reports will be delivered via Email to the requestor's email address. Users will be able to make requests from `eNgage` and they will be able to monitor them as well. Due to the sensitive nature of the transactional listing, all requests are subject to approval. 

`<User Interface to be added>`

## Data Points

We envision `HMC eNgage` to be a go-to product for our hotel clients to monitor program performance in a holistic way. `HMC eNgage` provides many data points that make it easy and convenient for our client hotels to gain insights. Each one of these data points is exportable.

### Dashboard

`<To be added>`

### Memberships

The `memberships` data access point provides an extreme flexibility in managing the program memberships., It provides advanced features such as:

1. Search using flexible facets
2. Filter, sort and view the memberships
3. Layout the memberships in grid or card layout.
4. Gain at-a-glance view of the membership's salient properties  
5. Drill down to individual memberships to gain access to a membership's full data
6. Search based on location
7. Export to CSV
8. Load and save membership queries
9. Create Email, SMS and Push campaigns from within the memberships search tab. 

![Memberships](https://mosaicapi.blob.core.windows.net/images/78911a7c-de2c-4e8f-817a-5dfd609f77f0.png)

Asking for more details about a specific memberships opens up a dialog that details everything about the membership including F&B tracking records, reservation records, purchase transactions, member comments, etc.

![Membership Detail](https://mosaicapi.blob.core.windows.net/images/d13a5dca-8c40-4be8-b7c4-42cee89dc471.png)

To add more convenience, several membership detail dialogs can be invoked to allow viewing details for several memberships at the same time.  

As mentioned above, the create campaign dialog within the tab is available for Email, SMS and Push campaigns:

![Email Campaign](https://mosaicapi.blob.core.windows.net/images/16149737-be7f-4a7d-8ecb-a080c9f9b142.png)

The dialog offers several nice features:

1. It shows the count of the targets and the facets used to filter them
2. The actual campaign email can be uploaded directly from the dialog
3. A great convenience to send the campaign from the dialog
4. The dialog offers preview option to allow users to preview the campaign before it is actually sent to real members
5. The dialog offers two modes for delivery: immediate or scheduled

The user can create and load saved queries so they don't have to re-filter the search list every time. In other words, members tabs do not have to start from scratch, `HMC eNgage` allows users to load saved queries:

![Query Open](https://mosaicapi.blob.core.windows.net/images/23f8c324-bf26-4c04-89fb-9d9f9fc00595.png)

Finally, `HMC eNgage` allows the members list to be switched to grid mode is this is more convenient to users:

![Grid Mode](https://mosaicapi.blob.core.windows.net/images/469d8c31-0e59-435a-a16d-801993b1691c.png)
 
### Offers

A complete Offers management platform which handles creation, targeting and distribution.

![Offers]({{ site.url }}/images/offers.png)

### Push Messages

A complete Push Messages management platform which handles creation, targeting and distribution.

![Push]({{ site.url }}/images/push.png)

### Dynamic Vouchers

A complete Dynamic Vouchers management platform which handles creation, targeting and distribution.

`<To be added>`

### Email Campaigns

A list that shows all user-created email campaigns with stats about usage: bounces, opens, clicks, etc

![Email Campaigns List](https://mosaicapi.blob.core.windows.net/images/a8a079c5-5d1f-490a-8c5d-ff510af8419c.png)

It provides several features such as:

1. Filter by date
2. At-a-glance quick information about each campaign
3. Summary strip to show the total campaigns, targets, etc

### SMS Campaigns

Similar to the Email campaigns list, it shows all user-created SMS campaigns with stats about usage: deliveries, errors, unreachables, etc.

### Push Campaigns

Similar to the Email campaigns list, it shows all user-created Push campaigns with stats about usage: deliveries, invocations, etc.

### Tracking History

A drillable list that shows all program-bound tracking transactions aggergated per period. The list can be further grouped by country, hotel and outlets:

![Tracking List](https://mosaicapi.blob.core.windows.net/images/0fd7ae5c-3957-4b57-814a-914b84e3cac3.png)

It provides several features such as:

1. Drillable list that allow users to drill down to the outlet level
2. Summary strip to show overall stats such as discount %, cover per visit, etc
3. At each level, a list of top spenders is available. This is extremely useful information which allows users to pull top spenders information quickly and seamlessly
4. Exportable list allows users to convert the information to CSV for further offline analysis if desired
5. Transaction Request is also available to allow users to make a special request to receive the actual transactions for certain period. This is useful in case users would like to see the actual transactions that make up these aggregations. There is more information about this feature below. 

The top spenders dialog is pretty powerful! 

- It shows the top spenders list ranked from high to low and the the engagement for each i.e. covers, food, beverage, discount and total:

![Top Spenders List](https://mosaicapi.blob.core.windows.net/images/89635d26-0106-44d4-8d35-8cb8316a44b1.png)

- It allows users to send SMS or push campaigns directly from the dialog targeting the actual currently visible top spenders:

![Top Spenders Campaigns](https://mosaicapi.blob.core.windows.net/images/829f6bb6-54c4-47ba-8951-638f2f6995bb.png)

- To add more convenience, the dialog also allows users to award dynamic vouchers i.e. eCerts directly from th dialog making it extremely efficient to target and award members:

![Top Spenders eCerts](https://mosaicapi.blob.core.windows.net/images/ffc40605-c37e-4201-8903-d1a3e0ba1a8f.png)

### Reservation History

A drillable list that shows all program-bound reservation transactions aggregated per month. The list can be further grouped by country and hotel.

![Reservation History](https://mosaicapi.blob.core.windows.net/images/faf6e530-096e-46dc-8afe-5e406449eb32.png)

**The reservation history list provides similar features as the tracking history. The difference is that this list shows top bookers as opposed to spenders**

### Static & Dynamic Voucher Redemption History

A drillable list that shows all program-bound redemptions generated from static or dynamic vocuhers aggergated per period. The list can be further grouped by country, hotel and outlet.

![Redemption History](https://mosaicapi.blob.core.windows.net/images/d67614b3-b991-40f9-847c-7d41cee77834.png)

**The redemption history list provides similar features as the tracking history. The difference is that this list shows top redeemers and top sources as opposed to spenders**

**Since we wanted to provide both static and dynamic voucher redemptions in the same tab, we provided a switch to allow users to switch between the two voucher types.**

### Sales History

A drillable list that shows all program-bound sales transactions aggregated per month. The list can be further grouped by country and package item.

![Sales History](https://mosaicapi.blob.core.windows.net/images/6af62614-eb37-49c9-84f5-a15c2fd55f93.png)

The left summary strip shows the top 3 popular packages and the top 3 performing countries.

### Ecommerce Sales History

A drillable list that shows all program-bound ecommerce sales transactions aggregated per month. The list can be further grouped by country and package item.

![Ecommerce Sales History](https://mosaicapi.blob.core.windows.net/images/7a568129-cef3-4e0e-864b-9f1611d3b3b2.png)

The left summary strip shows the top 3 popular packages and the top 3 performing countries.

### In-House Sales History

A drillable list that shows all program-bound in-house sales transactions aggregated per month. The list can be further grouped by country, hotel and user.

![In-House Sales History](https://mosaicapi.blob.core.windows.net/images/68309d3f-127c-4688-ac2e-bdd39c5da54d.png)

The left summary strip shows the top 3 popular packages and the top 3 performing countries.

### Mobile Apps Stats

A collection of mobile apps stat charts to convey the effectiveness of the mobile apps.

![App Stats](https://mosaicapi.blob.core.windows.net/images/931a2fee-79c3-458d-afdf-ce6794cbf46c.png)

### Ecommerce Site Stats

A collection of ecommerce site (the app companion site) stat charts to convey the effectiveness of the site.

![Ecommerce Stats](https://mosaicapi.blob.core.windows.net/images/90a73399-b700-4800-86ca-736b20e2cd59.png)

### Email Stats

A collection of email stat charts to convey the effectiveness of our email collection.

![Email Stats](https://mosaicapi.blob.core.windows.net/images/b8f6526e-6ae5-441e-b445-f401cffbe0ce.png)

### SMS Stats

A collection of SMS stat charts to convey the effectiveness of our SMS notifications and its sources.

![SMS Stats](https://mosaicapi.blob.core.windows.net/images/88fca013-4981-4c0e-991d-86b93a99b82a.png)

### Renewal Ratios

A drillable list that shows all program-bound renewal rations aggergated per month. The list can be further grouped by country and package items.

![Renewal Ratios](https://mosaicapi.blob.core.windows.net/images/3f86e0e7-d584-40d3-ac9f-d68390000718.png)

### Canned Reports

A collection of program-bound pre-built reports for different purposes. Reports are available in PDF, CSV or Excel. You can read more about canned reports [here](http://hmccode.github.io/2017-03-31/canned-reports-processing). The main idea is to make additional reports catered for each program in a convenient way and minimal download time. Each canned report can have its own set of parameters, run period and refresh interval.

![Canned Reports](https://mosaicapi.blob.core.windows.net/images/fcf3f770-b252-485d-8d96-96287ed55b10.png)
