---
layout: post
author: "Khaled A"
title:  "Canned Reports Processing"
date:   2017-03-31 10:12:45
summary: "Canned Reports Processing"
categories: Reports
tags: Mosaic Digital Canned Reports
featured_image: /images/cover.jpg
---

In an effort to reduce customer-facing reports from being subjected to Oracle availability or to the report server performance nuances, we are creating the concept of canned reports. These reports will be pre-built, time stamped and ready to be delivered to customers in multiple formats.

The canned reports will appear in our new customer-facing product `HMC Engage` which will have customized theming based on the different programs that we make available in `Engage`. 

Similar to how `Engage` approaches things, canned reports are `program` based! This means that the canned reports content is based on the program hotel group ids and therefore it encompasses the different hotels, outlets, call centers, app companion ecommerce site, in-house portal and mobile app that are within this program. We truly think this is the most logical way of structuring our `value` delivery to our clients. The following are some examples of programs:

- CircleM - the entire CircleM program
- CH - the entire Clubhotel program
- CHME - the Clubhotel program for the Middle East
- CHME-UAE - the Clubhotel program for the UAE
- OROVERDE - the entire OroVerde 
- PCASIA - the entire PCASIA program
- PCASIA-CH - the PCASIA program for China program

With this extreme flexibility on how we can create programs, every scenario should be supported. Our customers can choose to monitor programs from a very high level, monitor an individual country or even individual hotels (discouraged). The HMC Engage program will auto-adjust and self-refresh to accommodate the different programs.

Canned reports is a section within each program. Each canned report has some meta data associated with it such as ID, name, description, etc. But more importantly, it has the different runs that are associated with report. Report runs have the following information:

- Run Date
- Report ID
- Report Name
- Render Format i.e. PDF, CSV, etc
- Processor i.e. SSRS, PowerBI, etc
- Period i.e. Last 7 Days or JAN-2017
- Duration - the number of seconds to execute the report

### Report Processors

The main idea behind canned reports is that each has a peer processor associated with it. So when we create a canned report, we also create that peer processor which knows how to execute the report against the report server, capture its output and add it to the report runs list.

![Canned Report Processor](http://i.imgur.com/Gql8FOP.png)
  
The peer processor is aware of the refresh rate, the reports server from which to retrieve the report, the supported periods, etc. Peer processors are pieces of code that need to be written by developers. 
