---
layout: post
author: "Khaled A"
title:  "Introducing HMC Engage"
date:   2017-03-31 10:12:45
summary: "HMC Engage is the new CRM!"
categories: HMC Engage
tags: Mosaic Engage CRM
featured_image: /images/cover.jpg
---

## The Platform 

`HMC Engage` is `program` based! This means that the Engage content is based on the program hotel group ids and therefore it encompasses the different hotels, outlets, call centers, sales, app companion ecommerce site, in-house portal and mobile app that are within this program. We truly think this is the most logical way of structuring our `value` delivery to our clients. The following are some examples of programs:

- CircleM - the entire CircleM program
- CH - the entire Clubhotel program
- CHME - the Clubhotel program for the Middle East
- CHME-UAE - the Clubhotel program for the UAE
- OROVERDE - the entire OroVerde program
- PCASIA - the entire PCASIA program
- PCASIA-CHN - the PCASIA program for China program

With this extreme flexibility on how we can conjure up programs, every scenario should be supported. Our customers can choose to monitor programs from a very high level i.e CH, monitor an individual country i.e. CHME-UAE or even individual hotel (discouraged). The HMC Engage platform will auto-adjust and self-refresh to accommodate the different programs and cater to their specific requirement. This is an example of Clubhotel parent and child programs: 

![Program Structure](https://mosaicapi.blob.core.windows.net/images/a4ddb9ab-0bfc-4b26-a6d4-ba092b94136c.png)

## Tabs

In order to maximize the usefulness of `HMC Engage`, the product is built on tabs. Just like a browser, `HMC Engage` allows users to open up different tabs with different content so one can view different things at the same time. Users can open up different instances of the same type...for example, the user can have different memberships search tabs each displaying different results. 

Each user session has a home tab that cannot be dismissed. This home tab acts as a reference point and a dashboard for the selected program.

<TBA - shows an example of tabs>

## Permission Matrix

`HMC Engage` provides a configurable permission matrix to control how `programs` are conveyed to the user. For example, we may be able to turn off the email campaign features on some programs or turn off the ability to export members to CSV. The matrix is extensive and covers all aspects of the platform. Th efollowing is a sample permissions definitions:

<TBA - permission matrix>

## Dynamic Theming

Since `HMC Engage` is targeted for our hotel clients and internal employees, it provides dynamic themeing based on the URL. So if the user has access to https://www.hmcengage.com, then the user sees the default product theme:

![Default Theming](https://mosaicapi.blob.core.windows.net/images/0a6b5214-1add-401e-b280-e5b02475684c.png)

If a client hotel has access to their program customized URL i.e. https://circlem.hmcmosaic.com, then the user sees a customized product theme:

![CircleM Theming](https://mosaicapi.blob.core.windows.net/images/85c913e5-e436-4021-8ac0-18907033ae6a.png)

## Data Points

We envision `HMC Engage` to be a go-to product for our hotel clients to monitor program performance in a holistic way. `HMC Engage` provides many data points that make it easy and convenient for our client hotels to gain insights. Each one of these data points is exportable.

### Memberships

- Search using flexible facets
- Filter, sort and view the memberships
- Layout the memberships in grid or card layout.
- Gain at-a-glance view of the membership's salient features  
- Drill down to individual memberships to gain access to a membership's full data
- Search based on location
- Export to CSV
- Load and save membership queries
- Create Email, SMS and Push campaigns from within the memberships search tab. 

<TBA - memberships>

### Offers

A complete Offers management platform which handles creation, targeting and distribution.

<TBA - offers>

### Push Messages

A complete Push Messages management platform which handles creation, targeting and distribution.
   
<TBA - push messages>

### Dynamic Vouchers

A complete Dynamic Vouchers management platform which handles creation, targeting and distribution.
   
<TBA - dynamic vouchers>

### Email Campaigns

A list that shows all user-created email campaigns with stats about usage: bounces, opens, clicks, etc

<TBA - email campaigns>

### SMS Campaigns

A list that shows all user-created SMS campaigns with stats about usage: deliveries, errors, unreachables, etc

<TBA - SMS campaigns>

### Push Campaigns

A list that shows all user-created Push campaigns with stats about usage: deliveries, invocations, etc

<TBA - push campaigns>

### Tracking History

A drillable list that shows all program-bound tracking transactions aggergated per month. The list can be further grouped by country, hotel and outlets.

<TBA - tracking history>

### Reservation History

A drillable list that shows all program-bound reservation transactions aggergated per month. The list can be further grouped by country and hotel.

<TBA - reservation history>

### Static Voucher Redemptions History

A drillable list that shows all program-bound redemptions generated from static vocuhers aggergated per month. The list can be further grouped by country, hotel and outlet.

<TBA - static voucher redemptions>

### Dynamic Voucher Redemptions History

A drillable list that shows all program-bound redemptions generated from dynamic vocuhers aggergated per month. The list can be further grouped by country, hotel and outlet.

<TBA - dynamic voucher redemptions>

### Sales History

A drillable list that shows all program-bound sales transactions aggergated per month. The list can be further grouped by country and package item.

<TBA - sales history>

### Ecommerce Sales History

A drillable list that shows all program-bound ecommerce sales transactions aggergated per month. The list can be further grouped by country and package item.

<TBA - ecommerce sales history>

### In-House Sales History

A drillable list that shows all program-bound in-house sales transactions aggergated per month. The list can be further grouped by country, hotel and user.

<TBA - in-house sales history>

### Renewal Ratios

A drillable list that shows all program-bound renewal rations aggergated per month. The list can be further grouped by country and package items.

<TBA - renewal ratios>

### Mobile Apps Stats

A collection of mobile apps stat charts to convey the effectiveness of the mobile apps.

<TBA - mobile app stats>

### Ecommerce Site Stats

A collection of ecommerce site (the app companion site) stat charts to convey the effectiveness of the site.

<TBA - ecommerce site stats>

### Email Stats

A collection of email stat charts to convey the effectiveness of our email collection.

<TBA - email stats>

### SMS Stats

A collection of SMS stat charts to convey the effectiveness of our SMS notifications.

<TBA - SMS stats>

### Canned Reports

A collection of program-bound pre-built reports for different purposes. Reports are available in PDF, CSV and Excel. You can read more about canned reports [here](http://hmccode.github.io/2017-03-31/canned-reports-processing).

<TBA - canned reports>

## Transactional Requests

Since most of the data points in `HMC Engage` are aggregated per a period, the platform allows users to request the actual transactions that make up these aggregations. The transactions reports will be delivered via Email to the requestor's email address. Users will be able to make requests from `Engage` and they will be able to monitor them as well. Due to the sensitive nature of the transactional listing, all requests are subject to approval. 
  