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

- Mosaic Mobile Apps
- Mosaic POS Agents
- Mosaic Bookings
- Mosaic Backoffice
- Mosaic Ecommerce
- Mosaic In-House
- Mosaic Push

I created a client UWP app that is capable of launching multiple threads at the same time to run a specific test scenario. The app will reports its test results to a DocDB database that we can then find out best runs and averages and other significant indicators: 

![UWP Test App]({{ site.url }}/images/uwp-test-client.png)

All the test results are stored in DocDB in a database called `TestCases` and a collection called `TestCaseThreadRuns`! In order to determine the last run, use this query to filter:

```
SELECT * FROM c
WHERE c.name = 'Mosaic Mobile Apps'
ORDER BY c.startTime DESC
```

The UWP app reads the test case meta data from a DocDB. The meta data sits in the same DocDB database i.e. `TestCases` but in a collection called `TestCaseMetaData`. To retrieve the Meta Data associated with the Mosaic Mobile Apps:

```
SELECT * FROM c
WHERE c.name = 'Mosaic Mobile Apps'
```

Please note that the backend for test cases is an Azure Function which accepts POST commands to create/update test cases meta data or create test case runs.  I usually use `Postman` to create test case meta data:

- POST Url: `https://miscfunctionsapp.azurewebsites.net/api/ProcessTestCaseMetaData?code=wDuy2lYKsK86RqiWMy8otV/I3CfpyJbXCr5kkLd8HqlwVHv03ik6Sg==`
- POST Data:
```
{
	"id": "Mosaic Mobile Apps",
	"name": "Mosaic Mobile Apps",
	"type": 1,
	"threads": [
		{
			"iterations": 1,
			"program": "PCASIA",
			"activationCode": "97ZZN",
			"lastMobileNumberDigits": "9998888",
			"profileEmail": "ios@clubhotel.com",
			"profileFirstName": "Joe",
			"profileLastName": "Pcasia",
			"profilemobileCountryCode": "85",
			"profilemobileAreaCode": "76",
			"profilemobilePhone": "9998888",
			"voucherRedemptionPin": "75",
			"deviceId": "e450e665-c953-495a-9455-d019afe2de10",
			"delayInSeconds": 0,
			"isDeleteMembershipFirst": false
		},
		{
			"iterations": 1,
			"program": "PCASIA",
			"activationCode": "Q9CJF",
			"lastMobileNumberDigits": "9998888",
			"profileEmail": "ios@clubhotel.com",
			"profileFirstName": "Joe",
			"profileLastName": "Pcasia",
			"profilemobileCountryCode": "85",
			"profilemobileAreaCode": "76",
			"profilemobilePhone": "9998888",
			"voucherRedemptionPin": "75",
			"deviceId": "e450e665-c953-495a-9455-d019afe2de10",
			"delayInSeconds": 0,
			"isDeleteMembershipFirst": false
		},
		{
			"iterations": 1,
			"program": "PCASIA",
			"activationCode": "VV9WV",
			"lastMobileNumberDigits": "9998888",
			"profileEmail": "ios@clubhotel.com",
			"profileFirstName": "Joe",
			"profileLastName": "Pcasia",
			"profilemobileCountryCode": "85",
			"profilemobileAreaCode": "76",
			"profilemobilePhone": "9998888",
			"voucherRedemptionPin": "75",
			"deviceId": "e450e665-c953-495a-9455-d019afe2de10",
			"delayInSeconds": 0,
			"isDeleteMembershipFirst": false
		},
		{
			"iterations": 1,
			"program": "PCASIA",
			"activationCode": "GR8NU",
			"lastMobileNumberDigits": "9998888",
			"profileEmail": "ios@clubhotel.com",
			"profileFirstName": "Joe",
			"profileLastName": "Pcasia",
			"profilemobileCountryCode": "85",
			"profilemobileAreaCode": "76",
			"profilemobilePhone": "9998888",
			"voucherRedemptionPin": "75",
			"deviceId": "e450e665-c953-495a-9455-d019afe2de10",
			"delayInSeconds": 0,
			"isDeleteMembershipFirst": false
		},
		{
			"iterations": 1,
			"program": "PCASIA",
			"activationCode": "RPC8S",
			"lastMobileNumberDigits": "9998888",
			"profileEmail": "ios@clubhotel.com",
			"profileFirstName": "Joe",
			"profileLastName": "Pcasia",
			"profilemobileCountryCode": "85",
			"profilemobileAreaCode": "76",
			"profilemobilePhone": "9998888",
			"voucherRedemptionPin": "75",
			"deviceId": "e450e665-c953-495a-9455-d019afe2de10",
			"delayInSeconds": 0,
			"isDeleteMembershipFirst": false
		}
	]
}
```

Similarly the Azure Function exposes a POST endpoint used by the UWP app to record the test cases runs:

- POST Url: `https://miscfunctionsapp.azurewebsites.net/api/ProcessTestCaseThreadRuns?code=lT/R7jJxedDXqieIqw2d450wyyE0ty6bSotbuKtWd9t9hfS3t3fW9Q==`
- POST Sample Data:
```
{
  "name": "Mosaic Mobile Apps",
  "product": "Mosaic",
  "section": "Mobile Apps",
  "type": 1,
  "threadId": 20,
  "thread": "20",
  "duration": 27118.161,
  "successes": 1,
  "failures": 0,
  "invocations": 17,
  "isCancelled": false,
  "isCompleted": true,
  "startTime": "2017-05-10T18:33:04.4613841Z",
  "endTime": "2017-05-10T18:33:31.5935434Z",
  "invocationRuns": [
    {
      "name": "Validate Slim Build",
      "duration": 1003.4332
    },
    {
      "name": "Download Slim Content",
      "duration": 2848.5847000000003
    },
    {
      "name": "Download Slim Strings",
      "duration": 920.7201
    },
    {
      "name": "Validate Build",
      "duration": 414.66319999999996
    },
    {
      "name": "Download Content",
      "duration": 2541.3577000000005
    },
    {
      "name": "Request Activation via SMS",
      "duration": 1084.4462999999996
    },
    {
      "name": "Reactivate Request",
      "duration": 368.7404999999999
    },
    {
      "name": "Login Request",
      "duration": 1060.9959
    },
    {
      "name": "Register Device",
      "duration": 2106.2067000000006
    },
    {
      "name": "Submit analytic event",
      "duration": 858.4642999999996
    },
    {
      "name": "Retrieve offers",
      "duration": 1728.2474000000002
    },
    {
      "name": "Retrieve static vouchers",
      "duration": 1382.7538000000004
    },
    {
      "name": "Retrieve transactions",
      "duration": 1729.7235999999993
    },
    {
      "name": "Generate Discount Code",
      "duration": 1105.5591999999997
    },
    {
      "name": "Update profile",
      "duration": 1594.5031000000017
    },
    {
      "name": "Refer a friend",
      "duration": 2965.3600000000006
    },
    {
      "name": "Contact us",
      "duration": 3402.3993999999984
    }
  ],
  "id": "36994ac0-a8dc-444e-8c66-c1ee92ceb949"
}
```

# Mobile Apps

Please note that testing memberships against the mobile apps APIs, it is important to distinguish between two types:  

- Memberships that are already digital meaning they either have been imported or previously logged in
- Memberships that are not digital yet because they were not initially imported or never logged in

It is important to realize that it is possible that the second group might get an initial bad request if the digital service expects the membership to be eligible. One example is the `retrieve vouchers`. It might return no data if the user immediately hit the generate discount code and the digital membership has not been persisted yet! In fact, there is a setting in the settings to allow for this behavior or not.

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
* 20 => Invalid due to expiration or program conflict
* 100 => Exception in the database
```

Please note that we are NOW blocking logins on the same activation code from different programs! So `KEGM9` will not work for all apps!! Here is a list of test memberships for each program:

- Circle M: JLWLD
- PCME: QPO5C
- MP Elite: 8ZPCS
- Gourmet Club: D20VZ
- Oro Verde: M6IY0
- PC Asia: T7OVO
- MyMazaya: 8E3TU

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

## Login

- Authentication: Basic
- Method: `POST`
- API: `api/posagents/activate`
- Notes: It is used to request a login against the pos agents. 
	- Retrieves the POS agent associated with the post agent activation code
	- It returns all the settings and properties related to that POS Agent

## Pulse

- Authentication: Basic
- Method: `POST`
- API: `api/posagents/pulse`
- Notes: It is used to send a presence pulse to the backend. 
	- The backend stores the pulse associated with the POS Agent and can provide reports whether the agent has been active or not
	- In the pulse payload to the the server, the POS agent can include a lot of useful information such as last activity date, up time in minutes, number of validations, number of tracking posts, log data, etc
	- In the pulse response, the backend can include commands to the POS Agent so it can execute and report back to the server. Some of these commands are `send log data` and `send offline tracking transactions` for example. The backend also has an API exposed that allows admins to push commands to certain POS agents. This could become useful. 
	- Agents can be configured to send `Pulse` signals every n minutes  

## Send Log Data

- Authentication: Basic
- Method: `POST`
- API: `api/posagents/logdata/{posActivationCode}`
- Notes: It is used to send the agent's log data to the backend in response to a command included in a `Pulse` command as shown above. 
	- The backend stores the log data in storage and emails the admin a URL to download the data

![POS Agents Log Data Email]({{ site.url }}/images/pos-agents-log-data.png)

## Send Offline Transactions

- Authentication: Basic
- Method: `POST`
- API: `api/posagents/offlinedata/{posActivationCode}`
- Notes: It is used to send the agent's offline transactions to the backend in response to a command included in a `Pulse` command as shown above. 
	- The backend stores the offline transactions in storage and emails the admin a URL to download the data

![POS Agents Offline Data Email]({{ site.url }}/images/pos-agents-offline-email.png)

## Membership Validation

- Authentication: Basic
- Method: `POST`
- API: `api/posagents/membershipvalidation`
- Notes: It is used to validate a membership. This membership can be a membership card or a discount code.
	- The backend returns `isValid` in a JSON structure to indicate whether the membership is valid or not.

## Voucher Validation

- Authentication: Basic
- Method: `POST`
- API: `api/posagents/vouchervalidation`
- Notes: It is used to validate a voucher code. This code can be either for a dynamic or static voucher.
	- The backend returns `isValid` in a JSON structure to indicate whether the membership is valid or not.

## Tracking Post

- Authentication: Basic
- Method: `POST`
- API: `api/posagents/trackingrecording`
- Notes: It is used to send tracking transaction to the backend. The transaction includes the hotel, outlet and the amounts.
	- The backend returns `isValid` in a JSON structure to indicate whether the membership is valid or not.

## Tracking Discount

- Authentication: Basic
- Method: `POST`
- API: `api/posagents/trackingamounts`
- Notes: It is used to request the discount amounts for a tracking transaction. This is mainly used in POS Terminals where the discount computation must happen at the server. Currently it is not used often. But in the new release, we have added the F&B discount to the digital program so discounts can be computed centrally which is very desired

## Test Results

This is how the client app records its results for each run of the test:

```
[
  {
    "name": "Mosaic POS Agents",
    "product": "Mosaic",
    "section": "POS Agents",
    "type": 2,
    "threadId": 10,
    "thread": "10",
    "duration": 6970.9195,
    "successes": 1,
    "failures": 0,
    "invocations": 7,
    "isCancelled": false,
    "isCompleted": true,
    "startTime": "2017-04-29T11:35:16.9660313Z",
    "endTime": "2017-04-29T11:35:23.9419467Z",
    "invocationRuns": [
      {
        "name": "Login",
        "duration": 920.3715000000001
      },
      {
        "name": "Pulse",
        "duration": 582.3347
      },
      {
        "name": "Log Data",
        "duration": 533.3588
      },
      {
        "name": "Membership Validation Return= 0",
        "duration": 1508.0527000000001
      },
      {
        "name": "Voucher Validation Return= 30",
        "duration": 1673.1729
      },
      {
        "name": "Tracking Posting return = 30",
        "duration": 1183.6987
      },
      {
        "name": "Tracking Posting",
        "duration": 567.9309000000003
      }
    ],
    "id": "7650d42a-3c9a-45eb-af68-fee177d23b3e",
    "_rid": "HpVyAJZDjgE0AAAAAAAAAA==",
    "_self": "dbs/HpVyAA==/colls/HpVyAJZDjgE=/docs/HpVyAJZDjgE0AAAAAAAAAA==/",
    "_etag": "\"1000ff7d-0000-0000-0000-59047a7b0000\"",
    "_attachments": "attachments/",
    "_ts": 1493465720
  },
  {
    "name": "Mosaic POS Agents",
    "product": "Mosaic",
    "section": "POS Agents",
    "type": 2,
    "threadId": 9,
    "thread": "9",
    "duration": 6705.4471,
    "successes": 1,
    "failures": 0,
    "invocations": 7,
    "isCancelled": false,
    "isCompleted": true,
    "startTime": "2017-04-29T11:34:19.5609853Z",
    "endTime": "2017-04-29T11:34:26.2744359Z",
    "invocationRuns": [
      {
        "name": "Login",
        "duration": 1700.1664
      },
      {
        "name": "Pulse",
        "duration": 696.3488000000002
      },
      {
        "name": "Log Data",
        "duration": 703.4742999999999
      },
      {
        "name": "Membership Validation Return= 0",
        "duration": 687.1606000000002
      },
      {
        "name": "Voucher Validation Return= 30",
        "duration": 1373.8768999999997
      },
      {
        "name": "Tracking Posting return = 30",
        "duration": 998.4215000000004
      },
      {
        "name": "Tracking Posting",
        "duration": 544.0163999999995
      }
    ],
    "id": "b33fe701-a6e2-4d0c-b68e-832acabafac4",
    "_rid": "HpVyAJZDjgEzAAAAAAAAAA==",
    "_self": "dbs/HpVyAA==/colls/HpVyAJZDjgE=/docs/HpVyAJZDjgEzAAAAAAAAAA==/",
    "_etag": "\"1000e37c-0000-0000-0000-59047a400000\"",
    "_attachments": "attachments/",
    "_ts": 1493465662
  },
  {
    "name": "Mosaic POS Agents",
    "product": "Mosaic",
    "section": "POS Agents",
    "type": 2,
    "threadId": 8,
    "thread": "8",
    "duration": 10144.539200000001,
    "successes": 1,
    "failures": 0,
    "invocations": 7,
    "isCancelled": false,
    "isCompleted": true,
    "startTime": "2017-04-29T11:31:46.9437753Z",
    "endTime": "2017-04-29T11:31:57.0933027Z",
    "invocationRuns": [
      {
        "name": "Login",
        "duration": 2298.3316
      },
      {
        "name": "Pulse",
        "duration": 824.8283000000001
      },
      {
        "name": "Log Data",
        "duration": 801.6041
      },
      {
        "name": "Membership Validation Return= 0",
        "duration": 1397.6130000000002
      },
      {
        "name": "Voucher Validation Return= 30",
        "duration": 2740.3617000000004
      },
      {
        "name": "Tracking Posting return = 30",
        "duration": 1536.0042999999996
      },
      {
        "name": "Tracking Posting",
        "duration": 544.7852999999995
      }
    ],
    "id": "50f3cc03-0777-47ab-bf6a-1f58de8a3b94",
    "_rid": "HpVyAJZDjgEyAAAAAAAAAA==",
    "_self": "dbs/HpVyAA==/colls/HpVyAJZDjgE=/docs/HpVyAJZDjgEyAAAAAAAAAA==/",
    "_etag": "\"1000e979-0000-0000-0000-590479ab0000\"",
    "_attachments": "attachments/",
    "_ts": 1493465513
  }
]
```





 

 



