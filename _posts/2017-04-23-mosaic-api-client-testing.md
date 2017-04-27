---
layout: post
author: "Khaled A"
title:  "Mobile API Client Testing"
date:   2017-04-24 10:12:45
summary: "Mobile API Client Testing"
categories: HMC Mosaic API
tags: Mosaic API Client Testing
featured_image: /images/cover.jpg Client Testing
---

The new version of Mosaic API will have substantial [changes]({{ site.url }}/2017-03-04/introducing-digital-transformation)! They new changes are mainly to support dynamic vouchers, member makes member and digital memberships. Because the API surface got exponentially bigger and more complicated, I wanted to subject the Mosaic API layer to substantial testing. There is also a web version to this [testing]({{ site.url }}/2017-03-13/mosaic-api-web-testing) that you can check out. 

I divided the product API Surface to 4 sections:

- Mobile Apps
- POS Agents
- Backoffice
- Ecommerce
- In-House

I created a client UWP app that is capable of launching multiple threads at the same time to run a specific test scenario. The app will reports its test results to a database that we can then find out best runs and averages and other significant indicators: 


# Mobile Apps

## Prior to Login

### Legacy APIs

#### Validate Build

- Authentication: Basic
- Method: `GET`
- API: `api/mobileapps/programs/{program}/validateslim/{build}`
- Notes: It is used to get the time stamp of the latest content update. 
	- If it changed, the mobile app will prompt the user to update the content.

#### Download the app strings

- Authentication: Basic
- Method: `GET`
- API: `api/mobileapps/programs/slimstrings/{program}`
- Notes: It is used to download the app strings. 
	- The program content must be available. 
  
#### Download the app content

- Authentication: Basic
- Method: `GET`
- API: `api/mobileapps/programs/slimcontent/{program}`
- Notes: It is used to download the app content. 
	- The program content must be available. 

### New APIs

#### Validate Build

- Authentication: Basic
- Method: `GET`
- API: `api/mobileapps/programs/{program}/content/validate/{build}`
- Notes: It is used to get the time stamp of the latest content update. 
	- If it changed, the mobile app will prompt the user to update the content.

#### Download the app content & strings

- Authentication: Basic
- Method: `GET`
- API: `api/mobileapps/programs/{program}/content/download`
- Notes: It is used to download the app content & strings. 
	- The program content must be available. 
  
### Request Re-activation

- Authentication: Basic
- Method: `GET`
- API: `api/mobileapps/memberships/requestreactivation/{code}/{program}`
- Notes: It is used to request a re-activation. 
	- A re-activation request is added to `Core.MembershipReactivationRequest` to notify customer support that there are pending requests. 

### Request an SMS for activation code

- Authentication: Basic
- Method: `POST`
- API: `api/mobileapps/sms`
- Notes: It is used to request an SMS message with activation code to be sent to the member. 
	- The input model is phone number. 
	- If the request is for an impersonation phone number, the request is ignored. 
	- The code uses the digital program to determine the store info. 
	- No more SYM_PROGRAMS.

## Login

- Authentication: Basic
- Method: `POST`
- API: `api/mobileapps/login`
- Notes: It is used to request a login against the mobile apps. 
	- Retrieves the digital membership if available and checks the expiration date
	- If the digital membership does not exist:
		- It goes against Oracle using the stored procedure `GET_MEMBERSHIP_BY_CODE`. 
		- The phone number is included in case it does not match the impersonation number. Otherwise, it checks against the program and activation code only.
		- Requests that the membership be refreshed to make sure that it is evetually available
	- If digital, it applies a phone number check if the mode is not impersonation (i.e. phone = 5551414). So the phone number check happens in code as an added layer. 
	- The login mode i.e. `impersonated or not` is stored in `Core.digitalmembershipcode` for fast access. This will be used in device registration to check or not check for device ID conflict
	- Eventually login returns an OK with the following JSON payload:
```
{
    "membership": "",
    "issueDate": "",
    "expirationDate": "",
    "token": "",
    "validity": ""
}

Where validity is one of:
* 0 => OK
* 3 => Auth Failed
* 5 => Phone number validation failed
* 10 => Expired
* 20 => Invalid
* 100 => Exception in the database
```

## Post Login

## Device Registration

- Authentication: Token
- Method: `POST`
- API: `api/mobileapps/devices/register`
- Notes: It is used to register a device (or a session) for the mobile apps. 
	- Retrieves the digital membership if available 
	- If the digital membership does not exist, it does similar stuff that it used to be in previous versions which is not very scalable:
		- It goes against Oracle using the stored procedures `GET_MEMBERSHIP_VALIDITY` and `GET_MEMBERSHIP_BY_CODE`. 
		- The device ID conflict cannot be checked in this mode. I am actually externalizing this event to see how often it happens. It should not happen that much.
	- If digital, it checks for expiration and device ID conflicts. Please note that the device ID conflict is ignored of the device ID is `UNKNOWN`.
	- Enqueues device registration notification to be handled by the WebJob to:
		- Persist the `Core.Device` and `Core.DeviceSession` by incrementing the session number
		- If the device is inserted into `Core.Device`, it also calls a stored procedure to insert the activation code in Oracle's `SYS_ACTIVATIONS`. `SYS_ACTIVATIONS` is extremely imporatnant as it is relied on to determine the number of active devices. Anyway, this is the only time we need to insert into SYS_ACTIVATIONS. Hence SYS_ACTIVATIONS is no longer used the way it used to be used in the earlier version.
		- Send the device model to Engage to register the device in its own database
	- Enqueues membership refresh request to refresh the membership is need be.
	- There should be a new membership refresh record added to `Core.digitalMembershipRefresh`. The refresh could be skipped or forced.
 
## Submit an Analytic Event

- Authentication: Token
- Method: `POST`
- API: `api/mobileapps/analytic`
- Notes: It is used to submit an analytic event from the mobile apps. 

## Offers

- Authentication: Token
- Method: `GET`
- API: `api/mobileapps/offers`
- Notes: It is used to retrieve the offers from a digital membership. 
	- Please note we are retrieving from Offers in the digital membership. We are no longer hitting the Engage server.

## Static Vouchers

- Authentication: Token
- Method: `GET`
- API: `api/mobileapps/vouchers/{language}` and `api/mobileapps/staticvouchers/{language}`
- Notes: It is used to retrieve the Static vouchers from a digital membership. 
	- Please note we are retrieving from Vouchers in the digital membership. We are no longer hitting Oracle.

## Dynamic Vouchers

- Authentication: Token
- Method: `GET`
- API: `api/mobileapps/dynamicvouchers`
- Notes: It is used to retrieve the Dynamic vouchers from a digital membership. 
	- Please note we are retrieving from Vouchers in the digital membership. We are no longer the Engage server.

## Voucher Redemption

- Authentication: Token
- Method: `POST`
- API: `api/mobileapps/vouchers/redeem`
- Notes: It is used to redeem a voucher. 
	- Retrieves the digital membership if available
	- If not found, it goes to Oracle as normal
	- If digital membership, apply black list policy to block redemption if the membership's code is included in the list
	- Set the voucher redemption date is available in the shadow table (i.e. `Core.digitalmembershipVoucherCode`) and in the digital membership
	- Communicate the redemption to the member via SMS
	- If the redemption is for a static voucher, send an enqueued request to Oracle via `core.OracleRequest`. Please refer to the enqueued Oracle requests below.
	- Record the redemption in the usual place in `Core.VoucherRequest`

## Discount Code Generation

- Authentication: Token
- Method: `POST`
- API: `api/mobileapps/discountcode`
- Notes: It is used to generate a discount code. 
	- Retrieves the digital membership if available
	- If only works on digital memberships for obvious reasons
	- Generate a unique discount code and persists in the digital membership and in the shadow `Core.digitalmembershipDiscountCode`
	- Set the voucher redemption date is available in the shadow table (i.e. `Core.Core.digitalmembershipVoucherCode`) and in the digital membership
	- No Oracle is involved
	- These discount codes will persist with the membership allowing us to detect offline transactions from POS Agents

## Update Profile

- Authentication: Token
- Method: `PUT`
- API: `api/mobileapps/profile`
- Notes: It is used to update a member profile in Mosaic. 
	- Program and Activation Code are injected by the controller from the access token
	- Calls an Oracle stored procedure `MOSAIC_API.UPDATE_PROFILE` to update in Mosaic

## Refer a friend

- Authentication: Token
- Method: `POST`
- API: `api/mobileapps/refer`
- Notes: It is used to create a referrel request. 
	- Program and Activation Code are injected by the controller from the access token
	- Creates a request in Mosaic API `Core.ReferralRequest`
	- Calls an Oracle stored procedure `MOSAIC_API.REFER_FRIEND` to create a referral in Mosaic
	- Need to send this to a Logic App to continue the work flow in case there is any

## Contact Support

- Authentication: Token
- Method: `POST`
- API: `api/mobileapps/contactsupport`
- Notes: It is used to create a contact us request. 
	- Program and Activation Code are injected by the controller from the access token
	- Creates a request in Mosaic API `Core.ContactSupportRequest`
	- Need to send this to a Logic App to continue the work flow in case there is any

## Test Results

This is how the client app records its results for each run of the test:

```
[
	{
	  "name": "Mosaic Mobile Apps",
	  "product": "Mosaic",
	  "section": "Mobile Apps",
	  "type": 1,
	  "threadId": 1,
	  "thread": "1",
	  "duration": 21327.3583,
	  "successes": 1,
	  "failures": 0,
	  "invocations": 20,
	  "isCancelled": false,
	  "isCompleted": true,
	  "startTime": "2017-04-27T07:47:59.3268801Z",
	  "endTime": "2017-04-27T07:48:20.6715871Z",
	  "invocationRuns": [
	    {
	      "name": "Validate Slim Build",
	      "duration": 1541.6280000000001
	    },
	    {
	      "name": "Download Slim Content",
	      "duration": 2917.8804000000004
	    },
	    {
	      "name": "Download Slim Strings",
	      "duration": 751.6731999999993
	    },
	    {
	      "name": "Validate Build",
	      "duration": 422.6359000000002
	    },
	    {
	      "name": "Download Content",
	      "duration": 1669.7884000000003
	    },
	    {
	      "name": "Request Activation via SMS",
	      "duration": 2235.5507
	    },
	    {
	      "name": "Reactivate Request",
	      "duration": 457.6898999999994
	    },
	    {
	      "name": "Login Request",
	      "duration": 858.929900000001
	    },
	    {
	      "name": "Register Device",
	      "duration": 922.0594999999994
	    },
	    {
	      "name": "Submit analytic event",
	      "duration": 569.4340000000011
	    },
	    {
	      "name": "Retrieve offers",
	      "duration": 688.1891999999989
	    },
	    {
	      "name": "Retrieve static vouchers",
	      "duration": 857.8167000000012
	    },
	    {
	      "name": "Retrieve transactions",
	      "duration": 729.511199999999
	    },
	    {
	      "name": "Generate Discount Code",
	      "duration": 1068.7627000000011
	    },
	    {
	      "name": "Unredeem Voucher",
	      "duration": 1148.5445999999992
	    },
	    {
	      "name": "Retrieve static vouchers",
	      "duration": 772.6765999999989
	    },
	    {
	      "name": "Redeem voucher",
	      "duration": 1704.0325000000011
	    },
	    {
	      "name": "Update profile",
	      "duration": 533.3040000000001
	    },
	    {
	      "name": "Refer a friend",
	      "duration": 893.2145999999993
	    },
	    {
	      "name": "Contact Us",
	      "duration": 582.038700000001
	    }
	  ],
	  "id": "a4fe5581-f1e6-4400-95a6-6c0e2c8c6d46"
	},
	{
	  "name": "Mosaic Mobile Apps",
	  "product": "Mosaic",
	  "section": "Mobile Apps",
	  "type": 1,
	  "threadId": 2,
	  "thread": "2",
	  "duration": 18234.2583,
	  "successes": 1,
	  "failures": 0,
	  "invocations": 20,
	  "isCancelled": false,
	  "isCompleted": true,
	  "startTime": "2017-04-27T07:48:52.9993854Z",
	  "endTime": "2017-04-27T07:49:11.2432676Z",
	  "invocationRuns": [
	    {
	      "name": "Validate Slim Build",
	      "duration": 463.5835
	    },
	    {
	      "name": "Download Slim Content",
	      "duration": 1404.2027
	    },
	    {
	      "name": "Download Slim Strings",
	      "duration": 788.8830000000003
	    },
	    {
	      "name": "Validate Build",
	      "duration": 400.12599999999975
	    },
	    {
	      "name": "Download Content",
	      "duration": 1439.4107
	    },
	    {
	      "name": "Request Activation via SMS",
	      "duration": 1638.4400000000005
	    },
	    {
	      "name": "Reactivate Request",
	      "duration": 425.16249999999945
	    },
	    {
	      "name": "Login Request",
	      "duration": 874.1108000000004
	    },
	    {
	      "name": "Register Device",
	      "duration": 1055.5220000000008
	    },
	    {
	      "name": "Submit analytic event",
	      "duration": 600.119999999999
	    },
	    {
	      "name": "Retrieve offers",
	      "duration": 681.1486000000004
	    },
	    {
	      "name": "Retrieve static vouchers",
	      "duration": 812.4212000000007
	    },
	    {
	      "name": "Retrieve transactions",
	      "duration": 863.1482999999989
	    },
	    {
	      "name": "Generate Discount Code",
	      "duration": 1337.482100000001
	    },
	    {
	      "name": "Unredeem Voucher",
	      "duration": 1222.4844999999986
	    },
	    {
	      "name": "Retrieve static vouchers",
	      "duration": 817.1194000000014
	    },
	    {
	      "name": "Redeem voucher",
	      "duration": 1754.4588999999978
	    },
	    {
	      "name": "Update profile",
	      "duration": 507.1645000000026
	    },
	    {
	      "name": "Refer a friend",
	      "duration": 625.1369999999988
	    },
	    {
	      "name": "Contact us",
	      "duration": 523.1434000000008
	    }
	  ],
	  "id": "005fd84b-18f7-4302-99d2-ae9039a83baa"
	}
]
```

# POS Agents


 

 



