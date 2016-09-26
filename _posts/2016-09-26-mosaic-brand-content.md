---
layout: post
author: "Khaled A"
title:  "Mosaic Brand Content Management"
date:   2016-09-26 10:12:45
summary: "A description of the new content management aspects of Brand"
categories: mosaic Brand
tags: Brand Content Management
featured_image: /images/cover.jpg
---

This article discusses the content management aspects of the Mosaic Brand Sites:   

- [Motivation](#motivation)
- [Content Types](#content-types)
- [Content Management](#content-management)

## Motivation

## Content Types

The site content is described in [JSON](https://en.wikipedia.org/wiki/JSON). A complete content file sample can be downloaded from [here](https://www.dropbox.com/s/p1lbjetndsh1m07/mosaic-brand-circlem.json?dl=0).

In this section, we will discuss the specification for each content type. The content is made up of the following sections or types:

- [Program](#program)
- [Notification Email Addresses](#notification-email-addresses)
- [Notification Email Templates](#notification-email-templates)
- [Discounts](#discounts)
- [Tiers](#tiers)
- [Packages](#packages)

### Program

#### JSON sample

```json
{
  "name": "CIRCLEM",
  "mosaicHotelGroupIds": "4669,4709,4304,4549,1315,4550,1285,4551,4552,1329,1286,4324,1297,5510,4204,4553",
  "isTempCardSupported": false,
  "contactUsEmailAddress": "circlem-support@clubhotel.com",
  "isRenewal": false,
  "renewalMonthRange": 0
}
```

### Notification Email Addresses

The Notification Email Addresses content requires the following properties:

#### JSON sample

```json
"notificationEmailAddresses": {
	"normal": "generic-ecommerce-support@clubhotel.com",
	"error": "generic-ecommerce-support@clubhotel.com",
	"escalatedError": "generic-ecommerce-support@clubhotel.com"
}
```

### Notification Email Templates

The Notification Email Addresses content requires the following properties:

#### JSON sample

```json
"notificationEmailTemplates": {
	"preAuthFailure": "This is to inform you that a failure took place while attempting to make the following purchase. <br> Credit Card Number: @Model.CreditCardRequest.CreditCardNumber failed to pre-authorize. <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br>",
	"cancelFailure": "This is to inform you that a <span style=\"color:red;font-weight: bold\">cancellation request for @Model.CreditCardRequest.CreditCardNumber has failed </span> while attempting to make the following purchase. <br> Credit Card Number: @Model.CreditCardRequest.CreditCardNumber failed to authorize. <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br>",
	"fulfillFailure": "This is to inform you that a <span style=\"color:red;font-weight: bold\">fulfilment request for @Model.CreditCardRequest.CreditCardNumber has failed </span> while attempting to make the following purchase. <br> Credit Card Number: @Model.CreditCardRequest.CreditCardNumber failed to authorize. <br> <b>Package:</b> @Model.Package.Name <br> <b> Provider Error: </b> @Model.ProviderError <br>",
	"refundFailure": "",
	"purchaseFailure": "This is to inform you that a purchase failure took place: <br> <b>Package:</b> @Model.Package.Name <br> <b> Mosaic Error: </b> @Model.MosaicError <br> <b> Mosaic Payload: </b> @Model.MosaicPayload <br> <b> Provider Error: </b> @Model.ProviderError <br>",
	"purchaseSuccess": "PURCHASE CONFIRMATION <br> This is to inform you that a purchase has been successfully posted. <br> <b>Membership Number:</b> @Model.Membership.CardNumber <br> <b>Package:</b> @Model.Package.Name <br> <b>Payment Method - </b> @if(Model.PurchaseRequest.PaymentMethod == 0)   {       <span>Cash</span>  }  else if (Model.PurchaseRequest.PaymentMethod == 1)  {      <span>Credit Card Recorder</span>  }  else if (Model.PurchaseRequest.PaymentMethod == 2)  {      <span>DataCash</span>  }  else if(Model.PurchaseRequest.PaymentMethod == 3)  {      <span>GlobalCollect</span>  }  else  {      <span>AliPay</span>  }   <br />  <b>Activation Code - </b> @Model.Membership.ActivationCode <br>  <b> Amount - </b> @(Model.Package.Price + Model.Package.Shipping) @Model.Package.Currency <br> <br>     MEMBER INFO <br> @Model.PurchaseRequest.Salutation @Model.Membership.FirstName @Model.Membership.LastName <br> <b>Address Line 1 - </b> @(Model.PurchaseRequest.ShippingAddress1 == null ? \"N/A\" : Model.PurchaseRequest.ShippingAddress1) <br>   <b>Address Line 2 - </b> @(Model.PurchaseRequest.ShippingAddress2 == null ? \"N/A\" : Model.PurchaseRequest.ShippingAddress2) <br>   <b>City - </b> @(Model.PurchaseRequest.ShippingCity == null ? \"N/A\" : Model.PurchaseRequest.ShippingCity) <br>   <b>State - </b> @(Model.PurchaseRequest.ShippingState == null ? \"N/A\" : Model.PurchaseRequest.ShippingState) <br>   <b>Postal Code - </b> @(Model.PurchaseRequest.ShippingPostal == null ? \"N/A\" : Model.PurchaseRequest.ShippingPostal) <br>   <b>Country - </b> @(Model.PurchaseRequest.ShippingCountryId == null ? \"N/A\" : Model.PurchaseRequest.ShippingCountryId) <br>   <b>Email - </b> @Model.PurchaseRequest.Email <br>",
	"renewalFailure": "This is to inform you that a renewal failure took place: <br> <b>Package:</b> @Model.Package.Name <br> <b> Mosaic Error: </b> @Model.MosaicError <br> <b> Mosaic Payload: </b> @Model.MosaicPayload <br> <b> Provider Error: </b> @Model.ProviderError <br> ",
	"renewalSuccess": "RENEWAL CONFIRMATION <br> This is to inform you that a renewal has been successfully posted. <br> <b>Membership Number:</b> @Model.Membership.CardNumber <br> <b>Package:</b> @Model.Package.Name <br> <b>Payment Method - </b> @if(Model.RenewalRequest.PaymentMethod == 0)   {       <span>Cash</span>  }  else if (Model.RenewalRequest.PaymentMethod == 1)  {      <span>Credit Card Recorder</span>  }  else if (Model.RenewalRequest.PaymentMethod == 2)  {      <span>DataCash</span>  }  else if(Model.RenewalRequest.PaymentMethod == 3)  {      <span>GlobalCollect</span>  }  else  {      <span>AliPay</span>  }   <br />  <b>Activation Code - </b> @Model.Membership.ActivationCode <br>  <b> Amount - </b> @(Model.Package.Price + Model.Package.Shipping) @Model.Package.Currency <br> <br>     MEMBER INFO <br> @Model.RenewalRequest.Salutation @Model.Membership.FirstName @Model.Membership.LastName <br> <b>Address Line 1 - </b> @(Model.RenewalRequest.ShippingAddress1 == null ? \"N/A\" : Model.RenewalRequest.ShippingAddress1) <br>   <b>Address Line 2 - </b> @(Model.RenewalRequest.ShippingAddress2 == null ? \"N/A\" : Model.RenewalRequest.ShippingAddress2) <br>   <b>City - </b> @(Model.RenewalRequest.ShippingCity == null ? \"N/A\" : Model.RenewalRequest.ShippingCity) <br>   <b>State - </b> @(Model.RenewalRequest.ShippingState == null ? \"N/A\" : Model.RenewalRequest.ShippingState) <br>   <b>Postal Code - </b> @(Model.RenewalRequest.ShippingPostal == null ? \"N/A\" : Model.RenewalRequest.ShippingPostal) <br>   <b>Country - </b> @(Model.RenewalRequest.ShippingCountryId == null ? \"N/A\" : Model.RenewalRequest.ShippingCountryId) <br>   <b>Email - </b> @Model.RenewalRequest.Email <br> "
}
```

### Discounts

The discounts content requires the following properties:

#### JSON sample

```json
"discounts": [
	{
	  "code": "TR656Y",
	  "name": "15% Discount",
	  "description": "To celebrate our great new site, we are offering a 15% discount on this purchase",
	  "createDate": "2015-06-07T09:29:54.31",
	  "startDate": "2015-06-07T09:29:54.31",
	  "endDate": "2015-07-07T09:29:54.31",
	  "amount": 15.0,
	  "isPercentage": true,
	  "isRenewal": false,
	  "restrictions": {
	    "currency": "",
	    "country": "",
	    "package": "",
	    "hotel": ""
	  }
	}
]
```

### Tiers

The discounts content requires the following properties:

#### JSON sample

```json
"tiers": [
	{
	  "name": "Circle-M Classic",
	  "level": 0,
	  "fromAmount": 0.0,
	  "toAmount": 9999.0,
	  "infoUrl": "http://www.cnn.com",
	  "imageUrl": "http://www.cnn.com/images/image1.jpg"
	},
	{
	  "name": "Circle-M Elite",
	  "level": 1,
	  "fromAmount": 10000.0,
	  "toAmount": 9999999999999.0,
	  "infoUrl": "http://www.cnn.com",
	  "imageUrl": "http://www.cnn.com/images/image2.jpg"
	}
]
```

### Packages

The packages content requires the following properties:

#### JSON sample

```json
"packages": [
	{
	  "id": 95,
	  "name": "Circle M India",
	  "hotel": "",
	  "country": "IND",
	  "price": 7879.0,
	  "shipping": 200.0,
	  "currency": "INR",
	  "tempCardPrefix": "",
	  "sortOrder": 0,
	  "isDisplay": true,
	  "isRenewal": false,
	  "isMembershipNumberRequired": false,
	  "membershipNumberGenerationQuery": "SELECT MIN(card_number) FROM mos_preprint_memberships WHERE membership_id IS null AND batch_id IN (SELECT batch_id FROM mos_preprint_batches WHERE revenue_unit_id={0} AND package_item_id={1})",
	  "metaData": {
	    "mosaicId": -1,
	    "mosaicItemId": 9028,
	    "mosaicRevenueUnitId": 9975,
	    "mosaicCallCenterId": 744
	  },
	  "renewalInfo": {
	    "source": 0,
	    "discountPercentage": 0.0,
	    "duration": 0,
	    "members": 0
	  },
	  "languages": [
	    {
	      "language": "EN",
	      "summary": "Circle M India",
	      "description": ""
	    }
	  ],
	  "paymentProcessors": [
	    {
	      "type": 5,
	      "host": "host",
	      "account": "Payment:stripe-circlem-account",
	      "password": "Payment:stripe-circlem-password",
	      "isWidget": true,
	      "isAlipay": false
	    }
	  ]
	},
	{
	  "id": 96,
	  "name": "Circle M Jordan",
	  "hotel": "",
	  "country": "JOR",
	  "price": 244.0,
	  "shipping": 12.0,
	  "currency": "USD",
	  "tempCardPrefix": "",
	  "sortOrder": 0,
	  "isDisplay": true,
	  "isRenewal": false,
	  "isMembershipNumberRequired": false,
	  "membershipNumberGenerationQuery": "SELECT MIN(card_number) FROM mos_preprint_memberships WHERE membership_id IS null AND batch_id IN (SELECT batch_id FROM mos_preprint_batches WHERE revenue_unit_id={0} AND package_item_id={1})",
	  "metaData": {
	    "mosaicId": -1,
	    "mosaicItemId": 4044,
	    "mosaicRevenueUnitId": 2254,
	    "mosaicCallCenterId": 744
	  },
	  "renewalInfo": {
	    "source": 0,
	    "discountPercentage": 0.0,
	    "duration": 0,
	    "members": 0
	  },
	  "languages": [
	    {
	      "language": "EN",
	      "summary": "Circle M Jordan",
	      "description": ""
	    }
	  ],
	  "paymentProcessors": [
	    {
	      "type": 5,
	      "host": "host",
	      "account": "Payment:stripe-circlem-account",
	      "password": "Payment:stripe-circlem-password",
	      "isWidget": true,
	      "isAlipay": false
	    }
	  ]
	},
	{
	  "id": 101,
	  "name": "Circle M Kuwait",
	  "hotel": "",
	  "country": "KWT",
	  "price": 244.0,
	  "shipping": 12.0,
	  "currency": "USD",
	  "tempCardPrefix": "",
	  "sortOrder": 0,
	  "isDisplay": true,
	  "isRenewal": false,
	  "isMembershipNumberRequired": false,
	  "membershipNumberGenerationQuery": "SELECT MIN(card_number) FROM mos_preprint_memberships WHERE membership_id IS null AND batch_id IN (SELECT batch_id FROM mos_preprint_batches WHERE revenue_unit_id={0} AND package_item_id={1})",
	  "metaData": {
	    "mosaicId": -1,
	    "mosaicItemId": 4111,
	    "mosaicRevenueUnitId": 2251,
	    "mosaicCallCenterId": 744
	  },
	  "renewalInfo": {
	    "source": 0,
	    "discountPercentage": 0.0,
	    "duration": 0,
	    "members": 0
	  },
	  "languages": [
	    {
	      "language": "EN",
	      "summary": "Circle M Kuwait",
	      "description": ""
	    }
	  ],
	  "paymentProcessors": [
	    {
	      "type": 5,
	      "host": "host",
	      "account": "Payment:stripe-circlem-account",
	      "password": "Payment:stripe-circlem-password",
	      "isWidget": true,
	      "isAlipay": false
	    }
	  ]
	},
	{
	  "id": 103,
	  "name": "Circle M Saudi Arabia",
	  "hotel": "",
	  "country": "SAU",
	  "price": 990.0,
	  "shipping": 45.0,
	  "currency": "SAR",
	  "tempCardPrefix": "",
	  "sortOrder": 0,
	  "isDisplay": true,
	  "isRenewal": false,
	  "isMembershipNumberRequired": false,
	  "membershipNumberGenerationQuery": "SELECT MIN(card_number) FROM mos_preprint_memberships WHERE membership_id IS null AND batch_id IN (SELECT batch_id FROM mos_preprint_batches WHERE revenue_unit_id={0} AND package_item_id={1})",
	  "metaData": {
	    "mosaicId": -1,
	    "mosaicItemId": 4070,
	    "mosaicRevenueUnitId": 2252,
	    "mosaicCallCenterId": 744
	  },
	  "renewalInfo": {
	    "source": 0,
	    "discountPercentage": 0.0,
	    "duration": 0,
	    "members": 0
	  },
	  "languages": [
	    {
	      "language": "EN",
	      "summary": "Circle M Saudi Arabia",
	      "description": ""
	    }
	  ],
	  "paymentProcessors": [
	    {
	      "type": 5,
	      "host": "host",
	      "account": "Payment:stripe-circlem-account",
	      "password": "Payment:stripe-circlem-password",
	      "isWidget": true,
	      "isAlipay": false
	    }
	  ]
	},
	{
	  "id": 112,
	  "name": "Circle M Uae",
	  "hotel": "",
	  "country": "UAE",
	  "price": 896.0,
	  "shipping": 45.0,
	  "currency": "AED",
	  "tempCardPrefix": "",
	  "sortOrder": 0,
	  "isDisplay": true,
	  "isRenewal": false,
	  "isMembershipNumberRequired": false,
	  "membershipNumberGenerationQuery": "SELECT MIN(card_number) FROM mos_preprint_memberships WHERE membership_id IS null AND batch_id IN (SELECT batch_id FROM mos_preprint_batches WHERE revenue_unit_id={0} AND package_item_id={1})",
	  "metaData": {
	    "mosaicId": -1,
	    "mosaicItemId": 4106,
	    "mosaicRevenueUnitId": 2253,
	    "mosaicCallCenterId": 744
	  },
	  "renewalInfo": {
	    "source": 0,
	    "discountPercentage": 0.0,
	    "duration": 0,
	    "members": 0
	  },
	  "languages": [
	    {
	      "language": "EN",
	      "summary": "Circle M Uae",
	      "description": ""
	    }
	  ],
	  "paymentProcessors": [
	    {
	      "type": 5,
	      "host": "host",
	      "account": "Payment:stripe-circlem-account",
	      "password": "Payment:stripe-circlem-password",
	      "isWidget": true,
	      "isAlipay": false
	    }
	  ]
	},
	{
	  "id": 119,
	  "name": "Circle M Bahrain",
	  "hotel": "",
	  "country": "BHR",
	  "price": 244.0,
	  "shipping": 12.0,
	  "currency": "USD",
	  "tempCardPrefix": "",
	  "sortOrder": 0,
	  "isDisplay": true,
	  "isRenewal": false,
	  "isMembershipNumberRequired": false,
	  "membershipNumberGenerationQuery": "SELECT MIN(card_number) FROM mos_preprint_memberships WHERE membership_id IS null AND batch_id IN (SELECT batch_id FROM mos_preprint_batches WHERE revenue_unit_id={0} AND package_item_id={1})",
	  "metaData": {
	    "mosaicId": -1,
	    "mosaicItemId": 11846,
	    "mosaicRevenueUnitId": 12863,
	    "mosaicCallCenterId": 744
	  },
	  "renewalInfo": {
	    "source": 0,
	    "discountPercentage": 0.0,
	    "duration": 0,
	    "members": 0
	  },
	  "languages": [
	    {
	      "language": "EN",
	      "summary": "Circle M Bahrain",
	      "description": ""
	    }
	  ],
	  "paymentProcessors": [
	    {
	      "type": 5,
	      "host": "host",
	      "account": "Payment:stripe-circlem-account",
	      "password": "Payment:stripe-circlem-password",
	      "isWidget": true,
	      "isAlipay": false
	    }
	  ]
	},
	{
	  "id": 120,
	  "name": "Circle M Doha",
	  "hotel": "",
	  "country": "QAT",
	  "price": 888.0,
	  "shipping": 45.0,
	  "currency": "QAR",
	  "tempCardPrefix": "",
	  "sortOrder": 0,
	  "isDisplay": true,
	  "isRenewal": false,
	  "isMembershipNumberRequired": false,
	  "membershipNumberGenerationQuery": "SELECT MIN(card_number) FROM mos_preprint_memberships WHERE membership_id IS null AND batch_id IN (SELECT batch_id FROM mos_preprint_batches WHERE revenue_unit_id={0} AND package_item_id={1})",
	  "metaData": {
	    "mosaicId": -1,
	    "mosaicItemId": 8926,
	    "mosaicRevenueUnitId": 9729,
	    "mosaicCallCenterId": 744
	  },
	  "renewalInfo": {
	    "source": 0,
	    "discountPercentage": 0.0,
	    "duration": 0,
	    "members": 0
	  },
	  "languages": [
	    {
	      "language": "EN",
	      "summary": "Circle M Doha",
	      "description": ""
	    }
	  ],
	  "paymentProcessors": [
	    {
	      "type": 5,
	      "host": "host",
	      "account": "Payment:stripe-circlem-account",
	      "password": "Payment:stripe-circlem-password",
	      "isWidget": true,
	      "isAlipay": false
	    }
	  ]
	}
]
```

## Content Management

There are two ways to retrieve, update and manage the content:

### Using an Email Bot:

In order to make things easy for folks to retrieve and update mobile apps content, we created a content Email bot which listens on emails arriving to `mosaic-brand-content@clubhotel.com` inbox. The bot uses the email's subject as a command to either retrieve or update content. Since communicating over Emails is a very familiar work process, we feel this method will be quite helpful as it mimics this very familiar process!

Here is a block diagram:

![Block Diagram](http://i.imgur.com/U2mVfHx.png)

Simply, you create a new email to `mosaic-brand-content@clubhotel.com` with a subject that commands the bot to do things on your behalf. Currently the bot responds to the following form of commands:

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



