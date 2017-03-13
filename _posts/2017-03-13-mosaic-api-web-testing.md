---
layout: post
author: "Khaled A"
title:  "Mosaic API Web Testing"
date:   2017-03-13 10:12:45
summary: "Mosaic API Web Testing"
categories: mosaic API Web Testing
tags: Mosaic Digital Membership
featured_image: /images/cover.jpg
---

The new version of Mosaic API will have substantial changes! They new changes are mainly to support dynamic vouchers, member makes member and digital memberships. Because the API surface got exponentially bigger and more complicated, I wanted to subject the Mosaic API layer to substantial testing. 

To do this, I deployed dynamic tests using Azure functions to 4 different regions in Azure and hammered the API from 4 different regions: West US, West Europe,, West Japan and South Brazil. I collected the results in PowerBI. The tests are divided into 3 main categories:

- Mobile Apps
- POS Agents
- Back office

I ran the test for about 30 minutes in all regions:

![PowerBI Timeline](http://i.imgur.com/ZZqJbQd.png)

The different test categories stacked differently:

![PowerBI Test Categories](http://i.imgur.com/Oc2HUJS.png)

The different regions reported different average duration:

![PowerBI Different Regions](http://i.imgur.com/Yua1tWy.png)

The different methods reported different average duration:

![PowerBI different methods](http://i.imgur.com/b1MZSqC.png)

The ability to dynamically deploy web tests in different regions, collect results in real-time and tear them down using PowerShell script is a great way to conduct regression tests before the system is deployed to production. 
