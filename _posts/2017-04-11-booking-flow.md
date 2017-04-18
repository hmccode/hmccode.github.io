---
layout: post
author: "Khaled A"
title:  "Booking Flow"
date:   2017-04-11 10:12:45
summary: "Booking Flow for in and out network hotels!"
categories: HMC Mosaic
tags: Mosaic Booking
featured_image: /images/cover.jpg
---

- Lookup per program and phone number. This means that agents will have access to programs instead of hotels
- The search happens against the membership search indexer. So the search query can be mobile phone, name, card number, email, etc. The search ends with *
- The results are displayed in a grid ....so the agent has to pick the member or reduce the search
- The agent selects a membership
- This reveals some minor detail about the member including the past reservations and some tracking info
- The agent can update the email and mobile number if necessary
- The agent then can initiate a new booking which will pop up a form to fill out: 
  - Price, nights, hotels and upload some pictures, etc. 
  - Indicate whether the booking is for in or out of network. This means that this process works for both in and out of network.
  - Indicate whether the booking requires a voucher or not
  - Pick an email template .....with or without pictures, etc
- When submitted, the system does sanity checking to make sure there are vouchers available, etc. If ok, it stores the booking request and sends an approval email to the member which includes a URL (that points to the program site i.e. circlem.movenpick.com/bookings/key=ksjaksjaksjkasjas)
- The member reviews the URL agrees to the term (including the voucher) and provides his/her CC information  
- If approved:
  - The site (where the URL is hosted) will charge the credit card. If this fails, processing stops. If successful, the approval is submitted. 
  -  If voucher is involved, the system (not the agent) will pick a voucher to be redeemed based on rooms and whether the hotel is in or out of network is indicated in the booking request. 
  - Notify the hotel that a booking has been made and that the voucher is already redeemed. This only applies if the hotel is in-network!!! 
  - Notify the agent via Email that the booking request has been processed. No credit card info is revealed to the agent
- Once the confirmation email is received, the agent will proceed with the manual booking, generate a confirmation email and send it to the member. Alternatively, the agent can pick up the booking request, fill in the confirmation detail and send the confirmation email from our own system.
- We will need to provide a way to cancel the reservation which will undo all the steps above including refund the credit card
- The good thing about this is that it works the same for both in and out of network  