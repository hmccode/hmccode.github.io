---
layout: post
author: "Khaled A"
title:  "Mosaic In-House Content Management"
date:   2016-09-26 10:12:45
summary: "A description of the new content management aspects of In-House"
categories: mosaic In-House
tags: In-House Content Management
featured_image: /images/cover.jpg
---

This article discusses the content management aspects of the Mosaic In-House Sites:   

- [Motivation](#motivation)
- [Content Types](#content-types)
- [Content Management](#content-management)

## Motivation

## Content Types

The site content is described in [JSON](https://en.wikipedia.org/wiki/JSON). A complete content file sample can be downloaded from [here](https://www.dropbox.com/s/14koko8shf2s2so/mosaic-inhouse-circlem.json?dl=0).

In this section, we will discuss the specification for each content type. The content is made up of the following sections or types:

- [Program](#program)
- [Hotels](#hotels)
- [Users](#users)

### Program

#### JSON sample

```json
{
  "name": "CIRCLEM",
  "isCashAllowed": true,
  "isCreditCardAllowed": true,
  "isTempCardSupported": true
}
```

### Hotels

The Hotels content requires the following properties:

#### JSON sample

```json
  "hotels": [
    {
      "businessKey": 4469,
      "name": "Mövenpick Hotel Jumeirah Lakes Towers",
      "escalatedErrorNotificationEmailAddresses": "circlem-in-house-sales-support@clubhotel.com",
      "errorNotificationEmailAddresses": "circlem-in-house-sales-support@clubhotel.com",
      "notificationEmailAddresses": "circlem-in-house-sales-support@clubhotel.com, circlem-in-house-sales-accounting@clubhotel.com, Bryan.Dmello@moevenpick.com, Sunny.Babar@movenpick.com",
      "preAuthFailureEmailTemplate": "\r\nThis is to inform you that a failure took place while attempting to make the following purchase/renewal by User: @Model.User.UserName . <br> Credit Card Number: @Model.CreditCardRequest.CreditCardNumber failed to pre-authorize. <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br>\r\n",
      "cancelFailureEmailTemplate": "\r\nThis is to inform you that a <span style=\"color:red;font-weight: bold\">cancellation request for @Model.CreditCardRequest.CreditCardNumber has failed </span> while attempting to make the following purchase/renewal by User: @Model.User.UserName . <br> Credit Card Number: @Model.PurchaseRequest.CreditCardNumber failed to authorize. <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br> \r\n",
      "fulfillFailureEmailTemplate": "\r\nThis is to inform you that a <span style=\"color:red;font-weight: bold\">fulfilment request for @Model.CreditCardRequest.CreditCardNumber has failed </span> while attempting to make the following purchase/renewal by User: @Model.User.UserName . <br> Credit Card Number: @Model.CreditCardRequest.CreditCardNumber failed to authorize. <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br>\r\n",
      "linkageFailureEmailTemplate": "\r\nThis is to inform you that a linkage failure took place while attempting to make the following purchase/renwal by User: @Model.User.UserName . <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <b>Membership Number:</b> @Model.Membership.CardNumber <br>\r\n",
      "purchaseFailureEmailTemplate": "This is to inform you that a purchase failure took place while attempting to make the following purchase by User: @Model.User.UserName . <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <br> <b> Mosaic Payload: </b> @Model.MosaicPayload <br> <b> Mosaic Error: </b> @Model.MosaicError <br>",
      "purchaseSuccessEmailTemplate": "\r\nPURCHASE CONFIRMATION <br> \r\n\r\nThis is to inform you that \r\n@Model.User.UserName has successfully posted a purchase. <br> \r\n<b>Member Card Number - </b> \r\n@Model.Membership.CardNumber <br> \r\n<b>Package - </b> \r\n@Model.Package.Name <br>  \r\n<b>Hotel - </b> @Model.Hotel.Name <br> \r\n<b>Outlet - </b> @Model.Outlet.Name <br> <br> \r\n<b>Payment Method - </b>  \r\n\r\n@if(Model.PurchaseRequest.PaymentProcessor == 0) \r\n{ \r\n    <span>Cash</span>\r\n}\r\nelse if (Model.PurchaseRequest.PaymentProcessor == 1)\r\n{\r\n    <span>Credit Card Recorder</span>\r\n}\r\nelse if (Model.PurchaseRequest.PaymentProcessor == 2)\r\n{\r\n    <span>DataCash</span>\r\n}\r\nelse if(Model.PurchaseRequest.PaymentProcessor == 3)\r\n{\r\n    <span>GlobalCollect</span>\r\n}\r\nelse\r\n{\r\n    <span>AliPay</span>\r\n} \r\n<br />\r\n\r\n<b>Receipt Number - </b> @Model.Membership.ActivationCode <br> \r\n<b>Amount - </b> @(Model.Package.Price + Model.Package.Shipping) @Model.Package.Currency <br> <br> \r\n\r\nMEMBER INFO <br> @Model.PurchaseRequest.Salutation @Model.Membership.FirstName @Model.Membership.LastName <br> \r\n<b>Address Line 1 - </b> @(Model.PurchaseRequest.Address1 == null ? \"N/A\" : Model.PurchaseRequest.Address1) <br> \r\n<b>Address Line 2 - </b> @(Model.PurchaseRequest.Address2 == null ? \"N/A\" : Model.PurchaseRequest.Address2) <br> \r\n<b>City - </b> @(Model.PurchaseRequest.City == null ? \"N/A\" : Model.PurchaseRequest.City) <br> \r\n<b>State - </b> @(Model.PurchaseRequest.State == null ? \"N/A\" : Model.PurchaseRequest.State) <br> \r\n<b>Postal Code - </b> @(Model.PurchaseRequest.Postal == null ? \"N/A\" : Model.PurchaseRequest.Postal) <br> \r\n<b>Country - </b> @(Model.PurchaseRequest.Country == null ? \"N/A\" : Model.PurchaseRequest.Country) <br> \r\n<b>Email - </b> @Model.PurchaseRequest.Email <br>\r\n",
      "renewalFailureEmailTemplate": "\r\nThis is to inform you that a renewal failure took place while attempting to make the following renewal by User: @Model.User.UserName . <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <br> <b> Mosaic Payload: </b> @Model.MosaicPayload <br> <b> Mosaic Error: </b> @Model.MosaicError <br>\r\n",
      "renewalSuccessEmailTemplate": "\r\nRENEWAL CONFIRMATION <br> \r\n\r\nThis is to inform you that \r\n@Model.User.UserName has successfully posted a purchase. <br> \r\n<b>Member Card Number - </b> \r\n@Model.Membership.CardNumber <br> \r\n<b>Package - </b> \r\n@Model.RenewalRequest.RenewalPackageItem <br>  \r\n<b>Payment Method - </b>  \r\n\r\n@if(Model.RenewalRequest.PaymentProcessor == 0) \r\n{ \r\n    <span>Cash</span>\r\n}\r\nelse if (Model.RenewalRequest.PaymentProcessor == 1)\r\n{\r\n    <span>Credit Card Recorder</span>\r\n}\r\nelse if (Model.RenewalRequest.PaymentProcessor == 2)\r\n{\r\n    <span>DataCash</span>\r\n}\r\nelse if(Model.RenewalRequest.PaymentProcessor == 3)\r\n{\r\n    <span>GlobalCollect</span>\r\n}\r\nelse\r\n{\r\n    <span>AliPay</span>\r\n} \r\n<br />\r\n\r\n<b>Amount - </b> @(Model.RenewalRequest.RenewalPrice + Model.RenewalRequest.RenewalShipping) @Model.RenewalRequest.RenewalCurrency <br> <br> \r\n\r\nMEMBER INFO <br> @Model.RenewalRequest.Salutation @Model.Membership.FirstName @Model.Membership.LastName <br> \r\n<b>Address Line 1 - </b> @(Model.RenewalRequest.ShippingAddress1 == null ? \"N/A\" : Model.RenewalRequest.ShippingAddress1) <br> \r\n<b>Address Line 2 - </b> @(Model.RenewalRequest.ShippingAddress2 == null ? \"N/A\" : Model.RenewalRequest.ShippingAddress2) <br> \r\n<b>City - </b> @(Model.RenewalRequest.ShippingCity == null ? \"N/A\" : Model.RenewalRequest.ShippingCity) <br> \r\n<b>State - </b> @(Model.RenewalRequest.ShippingState == null ? \"N/A\" : Model.RenewalRequest.ShippingState) <br> \r\n<b>Postal Code - </b> @(Model.RenewalRequest.ShippingPostal == null ? \"N/A\" : Model.RenewalRequest.ShippingPostal) <br> \r\n<b>Country - </b> @(Model.RenewalRequest.ShippingCountry == null ? \"N/A\" : Model.RenewalRequest.ShippingCountry) <br> \r\n<b>Email - </b> @Model.RenewalRequest.Email <br>\r\n",
      "country": "UAE",
      "sortOrder": 1,
      "outlets": [
        {
          "businessKey": 1000,
          "name": "Front Office",
          "sortOrder": 1,
          "isDisplay": true
        },
        {
          "businessKey": 1001,
          "name": "Guest Relations",
          "sortOrder": 2,
          "isDisplay": true
        },
        {
          "businessKey": 1002,
          "name": "Nosh Restaurant",
          "sortOrder": 3,
          "isDisplay": true
        },
        {
          "businessKey": 1003,
          "name": "Urban Bar & Kitchen",
          "sortOrder": 4,
          "isDisplay": true
        },
        {
          "businessKey": 1004,
          "name": "Crema",
          "sortOrder": 5,
          "isDisplay": true
        }
      ]
    },
    {
      "businessKey": 1208,
      "name": "Mövenpick Hotel Bahrain",
      "escalatedErrorNotificationEmailAddresses": "circlem-in-house-sales-support@clubhotel.com",
      "errorNotificationEmailAddresses": "circlem-in-house-sales-support@clubhotel.com",
      "notificationEmailAddresses": "circlem-in-house-sales-support@clubhotel.com, circlem-in-house-sales-accounting@clubhotel.com, ainsley.demel@moevenpick.com, Ainsley.demel@movenpick.com",
      "preAuthFailureEmailTemplate": "\r\nThis is to inform you that a failure took place while attempting to make the following purchase/renewal by User: @Model.User.UserName . <br> Credit Card Number: @Model.CreditCardRequest.CreditCardNumber failed to pre-authorize. <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br>\r\n",
      "cancelFailureEmailTemplate": "\r\nThis is to inform you that a <span style=\"color:red;font-weight: bold\">cancellation request for @Model.CreditCardRequest.CreditCardNumber has failed </span> while attempting to make the following purchase/renewal by User: @Model.User.UserName . <br> Credit Card Number: @Model.PurchaseRequest.CreditCardNumber failed to authorize. <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br> \r\n",
      "fulfillFailureEmailTemplate": "\r\nThis is to inform you that a <span style=\"color:red;font-weight: bold\">fulfilment request for @Model.CreditCardRequest.CreditCardNumber has failed </span> while attempting to make the following purchase/renewal by User: @Model.User.UserName . <br> Credit Card Number: @Model.CreditCardRequest.CreditCardNumber failed to authorize. <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br>\r\n",
      "linkageFailureEmailTemplate": "\r\nThis is to inform you that a linkage failure took place while attempting to make the following purchase/renwal by User: @Model.User.UserName . <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <b>Membership Number:</b> @Model.Membership.CardNumber <br>\r\n",
      "purchaseFailureEmailTemplate": "This is to inform you that a purchase failure took place while attempting to make the following purchase by User: @Model.User.UserName . <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <br> <b> Mosaic Payload: </b> @Model.MosaicPayload <br> <b> Mosaic Error: </b> @Model.MosaicError <br>",
      "purchaseSuccessEmailTemplate": "\r\nPURCHASE CONFIRMATION <br> \r\n\r\nThis is to inform you that \r\n@Model.User.UserName has successfully posted a purchase. <br> \r\n<b>Member Card Number - </b> \r\n@Model.Membership.CardNumber <br> \r\n<b>Package - </b> \r\n@Model.Package.Name <br>  \r\n<b>Hotel - </b> @Model.Hotel.Name <br> \r\n<b>Outlet - </b> @Model.Outlet.Name <br> <br> \r\n<b>Payment Method - </b>  \r\n\r\n@if(Model.PurchaseRequest.PaymentProcessor == 0) \r\n{ \r\n    <span>Cash</span>\r\n}\r\nelse if (Model.PurchaseRequest.PaymentProcessor == 1)\r\n{\r\n    <span>Credit Card Recorder</span>\r\n}\r\nelse if (Model.PurchaseRequest.PaymentProcessor == 2)\r\n{\r\n    <span>DataCash</span>\r\n}\r\nelse if(Model.PurchaseRequest.PaymentProcessor == 3)\r\n{\r\n    <span>GlobalCollect</span>\r\n}\r\nelse\r\n{\r\n    <span>AliPay</span>\r\n} \r\n<br />\r\n\r\n<b>Receipt Number - </b> @Model.Membership.ActivationCode <br> \r\n<b>Amount - </b> @(Model.Package.Price + Model.Package.Shipping) @Model.Package.Currency <br> <br> \r\n\r\nMEMBER INFO <br> @Model.PurchaseRequest.Salutation @Model.Membership.FirstName @Model.Membership.LastName <br> \r\n<b>Address Line 1 - </b> @(Model.PurchaseRequest.Address1 == null ? \"N/A\" : Model.PurchaseRequest.Address1) <br> \r\n<b>Address Line 2 - </b> @(Model.PurchaseRequest.Address2 == null ? \"N/A\" : Model.PurchaseRequest.Address2) <br> \r\n<b>City - </b> @(Model.PurchaseRequest.City == null ? \"N/A\" : Model.PurchaseRequest.City) <br> \r\n<b>State - </b> @(Model.PurchaseRequest.State == null ? \"N/A\" : Model.PurchaseRequest.State) <br> \r\n<b>Postal Code - </b> @(Model.PurchaseRequest.Postal == null ? \"N/A\" : Model.PurchaseRequest.Postal) <br> \r\n<b>Country - </b> @(Model.PurchaseRequest.Country == null ? \"N/A\" : Model.PurchaseRequest.Country) <br> \r\n<b>Email - </b> @Model.PurchaseRequest.Email <br>\r\n",
      "renewalFailureEmailTemplate": "\r\nThis is to inform you that a renewal failure took place while attempting to make the following renewal by User: @Model.User.UserName . <br> <b>Hotel:</b> @Model.Hotel.Name <br> <b>Outlet:</b> @Model.Outlet.Name <br> <b>Package:</b> @Model.Package.Name <br> <br> <b> Mosaic Payload: </b> @Model.MosaicPayload <br> <b> Mosaic Error: </b> @Model.MosaicError <br>\r\n",
      "renewalSuccessEmailTemplate": "\r\nRENEWAL CONFIRMATION <br> \r\n\r\nThis is to inform you that \r\n@Model.User.UserName has successfully posted a purchase. <br> \r\n<b>Member Card Number - </b> \r\n@Model.Membership.CardNumber <br> \r\n<b>Package - </b> \r\n@Model.RenewalRequest.RenewalPackageItem <br>  \r\n<b>Payment Method - </b>  \r\n\r\n@if(Model.RenewalRequest.PaymentProcessor == 0) \r\n{ \r\n    <span>Cash</span>\r\n}\r\nelse if (Model.RenewalRequest.PaymentProcessor == 1)\r\n{\r\n    <span>Credit Card Recorder</span>\r\n}\r\nelse if (Model.RenewalRequest.PaymentProcessor == 2)\r\n{\r\n    <span>DataCash</span>\r\n}\r\nelse if(Model.RenewalRequest.PaymentProcessor == 3)\r\n{\r\n    <span>GlobalCollect</span>\r\n}\r\nelse\r\n{\r\n    <span>AliPay</span>\r\n} \r\n<br />\r\n\r\n<b>Amount - </b> @(Model.RenewalRequest.RenewalPrice + Model.RenewalRequest.RenewalShipping) @Model.RenewalRequest.RenewalCurrency <br> <br> \r\n\r\nMEMBER INFO <br> @Model.RenewalRequest.Salutation @Model.Membership.FirstName @Model.Membership.LastName <br> \r\n<b>Address Line 1 - </b> @(Model.RenewalRequest.ShippingAddress1 == null ? \"N/A\" : Model.RenewalRequest.ShippingAddress1) <br> \r\n<b>Address Line 2 - </b> @(Model.RenewalRequest.ShippingAddress2 == null ? \"N/A\" : Model.RenewalRequest.ShippingAddress2) <br> \r\n<b>City - </b> @(Model.RenewalRequest.ShippingCity == null ? \"N/A\" : Model.RenewalRequest.ShippingCity) <br> \r\n<b>State - </b> @(Model.RenewalRequest.ShippingState == null ? \"N/A\" : Model.RenewalRequest.ShippingState) <br> \r\n<b>Postal Code - </b> @(Model.RenewalRequest.ShippingPostal == null ? \"N/A\" : Model.RenewalRequest.ShippingPostal) <br> \r\n<b>Country - </b> @(Model.RenewalRequest.ShippingCountry == null ? \"N/A\" : Model.RenewalRequest.ShippingCountry) <br> \r\n<b>Email - </b> @Model.RenewalRequest.Email <br>\r\n",
      "country": "BHR",
      "sortOrder": 1,
      "outlets": [
        {
          "businessKey": 1000,
          "name": "Front Office",
          "sortOrder": 1,
          "isDisplay": true
        },
        {
          "businessKey": 1001,
          "name": "Guest Relations",
          "sortOrder": 2,
          "isDisplay": true
        },
        {
          "businessKey": 1002,
          "name": "Silk's Restaurant",
          "sortOrder": 3,
          "isDisplay": true
        },
        {
          "businessKey": 1003,
          "name": "The Gallery Lobby Lounge",
          "sortOrder": 4,
          "isDisplay": true
        },
        {
          "businessKey": 1004,
          "name": "Flamingo Bar",
          "sortOrder": 5,
          "isDisplay": true
        },
        {
          "businessKey": 1005,
          "name": "The Palms Bar",
          "sortOrder": 6,
          "isDisplay": true
        }
      ]
    }
```

### Users

The Users content requires the following properties:

#### JSON sample

```json
  "users": [
    {
      "userName": "MPBRN@movenpick.com",
      "name": "MPBRN",
      "isActive": true,
      "isNewAllowed": true,
      "isRenewAllowed": false,
      "permittedHotels": [
        1208
      ]
    },
    {
      "userName": "MPCPH@movenpick.com",
      "name": "MPCPH",
      "isActive": true,
      "isNewAllowed": true,
      "isRenewAllowed": false,
      "permittedHotels": [
        4290
      ]
    },
    {
      "userName": "mpazd@movenpick.com",
      "name": "MPAZD",
      "isActive": true,
      "isNewAllowed": true,
      "isRenewAllowed": false,
      "permittedHotels": [
        6136
      ]
    },
    {
      "userName": "mpcsj@movenpick.com",
      "name": "MPCSJ",
      "isActive": true,
      "isNewAllowed": true,
      "isRenewAllowed": false,
      "permittedHotels": [
        6196
      ]
    }
  ]
```

## Content Management

There are two ways to retrieve, update and manage the content:

### Using an Email Bot:

In order to make things easy for folks to retrieve and update mobile apps content, we created a content Email bot which listens on emails arriving to `mosaic-inhouse-content@clubhotel.com` inbox. The bot uses the email's subject as a command to either retrieve or update content. Since communicating over Emails is a very familiar work process, we feel this method will be quite helpful as it mimics this very familiar process!

Here is a block diagram:

![Block Diagram](http://i.imgur.com/U2mVfHx.png)

Simply, you create a new email to `mosaic-inhouse-content@clubhotel.com` with a subject that commands the bot to do things on your behalf. Currently the bot responds to the following form of commands:

`VERB-PROGRAM-SLOT`

Where **VERB** is:

- `get`- to retrieve
- `save`- to store

**PROGRAM** is the name of the program i.e. `circlem`

**SLOT** is the slot that you wish this content to apply to. This is an optional parameter. If omitted, the engine defaults to `staging`:

- `staging`- staging slot
- `production`- production slot

#### Retrieve

Here are some **Retrieve Examples**:

- `get-circlem` => Retrieve CircleM JSON

When you issue a `get` request, the content Email bot responds with an Email with an attachment. The attachment is a JSON file that has the desired content. 
 
#### Store

Here are some **Store Examples**:

- `save-circlem` => Store CircleM JSON

When you issue a `save` request, the content Email bot responds with a confirmation Email whether the operation succeeds or not. All `save` commands require that an attachment be added to the email. For example, if you want to update the JSON for a specific program, you will send n email with subject `save-circlem` and attached `circlem.json`, for example. 

**Please note** that when you send a `save` command to the bot, make sure the email body is empty (i.e. no signature). If there is a signature, the email client might attach it which will confuse the parser.

#### Notes

The following are general aspects (not in any specific order) about the process:

- The subject is the command! The bot will analyze the subject line to know what to do
- There could be only one attachment at a time
- The bot will notify the sender by email on failure.
- If the `slot` is missing from the command, `staging` is assumed.
- Currently the bot checks the inbox every 5 minutes so don't expect an immediate return.
- There is one drawback to this approach which is that the content is driven by emails! In other words, to get the latest version of the content, all you have to do is to issue a command to get the content. Similarly to update the content, all you to do is to send a list of hotels. While convenient, it does remove our (i.e. IT) ability to control the content from source control because it gives the ability to someone to send a blank list of hotels which will erase the content. For this purpose, we backup the content (with a time stamp and user id) prior to any save.
- The bot only accepts emails from `.clubhotel.com` domain! This prevents external people to command the bot. We can also add more restrictions to only allow a handful of email addresses to manage content.  
- At every save request, the bot will backup the current content before making any changes. The changes are marked with a time stamp so content can be easily restored in case there is a need.

### Using a content editor:

This is still work in progress! The idea is to provide a content editor that should be available in the Mosaic Back office:

![Content Editor](http://i.imgur.com/uFEeHgo.png)

We will update the document when it becomes available.



