---
layout: post
author: "Khaled A"
title:  "Mobile Apps Flow"
date:   2017-04-24 10:12:45
summary: "Mobile Apps Flow"
categories: HMC Mosaic
tags: Mosaic API
featured_image: /images/cover.jpg
---

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

## Enqueued Oracle Requests

In certain key of the application, we are using eventual consistency against Oracle as opposed to immediate consistency. So voucher redemption and tracking recording and others are usually queued up to Oracle for eventual processing. There are several benefits:
- Still works even if Oracle is not available for some reason.
- All requests are sent to Oracle are visible and can be examined
- Since we only have a single database for production and test, changes to the database will not happen because the Oracle requests periodic firer doe snot run in test environments! 

# Product Pillars
**Explain about digital membership and program Blob storage**
**Explain about sessions**
**Explain about layers**
**Explain about digital membership membership refreshes**
**Explain about digital membership membership imports**
**Explain about digital membership discount codes**
**Explain about digital membership redemptions**
**Explain about digital membership communication**
**Explain about digital membership shadows**
**Explain about digital program refreshes**

 

 



