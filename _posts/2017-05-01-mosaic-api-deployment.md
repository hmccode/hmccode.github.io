---
layout: post
author: "Khaled A"
title:  "Mobile API Deployment"
date:   2017-05-01 10:12:45
summary: "Mobile API Deployment"
categories: HMC Mosaic API
tags: Mosaic API Deployment
featured_image: /images/cover.jpg Client Testing
---

## Release Notes

- Please note that the `UpsertMembership` in `DigitalService` is called from:
	- `RefreshMembership`
	- `PersistMembership`
	- `Invite` (this will change as I will remove the dependency on digital membership). `Invite` requires another look as it does not currently scale well.  
	- `Award` (this will also change as I will remove the dependency on digital membership)
- Given that `UpsertMembership` is only called from a background process such as `Refresh`, we will re-merge `PersistMembership` back into it and remove the queue.
- The non-digital memberships are not subjected to black lists
- Switching among programs for the same membership is no longer allowed
- Impersonation mode does not affect the device
- The device ID is checked and does not allow device ID switching
- The server is scaled up to 7 GB and 2 cores
- The default hotel group no longer works
- Device ID conflict is now detected
- 

The following resources are needed in the Mosaic API deployment.

## Build and Source Control System

Mosaic API uses [Team Services](https://azure.microsoft.com/en-us/services/visual-studio-team-services/) for source control and build. Mosaic API lives in the `Mosaic` [project](https://hospitalitymarketingconcepts.visualstudio.com/Mosaic) in its own `Api` repository. The Mosaic API build definitions are:

- PRODUCTION API Deployment
- STAGING API Deployment
- DEV API Deployment
  
## Web App

This is where the Mosaic API lives. It is deployed via Team services as described above to an Azure Web App instance. 

### Slots

It supports 3 slots for different environments:

- `mosaic-web-api` - the source is the `master` branch
- `mosaic-web-api-staging` - the source is the `staging` branch
- `mosaic-web-api-dev` - the source is the `dev` branch

### Web Jobs

The WebApp also hosts a single continuous web job called `Mosaic Queue Processor`. It is responsible for processing all the queues employed by Mosaic API. 

### SSL Binding

`api.hmcmosaic.com`

### Service Plan

The Web App's service plan has been running on an S2 (2 core and 2.5 GB) instance. For this release, we will scale up the app service plan to 4 cores 7 GB. 

## Telemetry

### Macro Architecture

![Mosaic API Telemtry Architecture](http://i.imgur.com/baRJ3fe.png)

### Stats

Mosaic API Stats are exposed via an API to allow external entities like Azure Function to pick up the status data sets and perhaps send them over to PowerBI:

![Externalized Data Sets](http://i.imgur.com/yu8WdBP.png)

### Application Insights

The Mosaic Web API sends telemetry information to an [Application Insights](https://azure.microsoft.com/en-us/services/application-insights/) ingestor. The data can be further analyzed using the insights analytic. There are 3 instances of the application insights:

- `MosaicApiWebApp` - Production
- `MosaicApiWebAppStaging` - Staging
- `MosaicApiWebAppDev` - dev

The Mosaic Web API settings file keys that control whether the application insights is active or not are:

- `InsightsInstrumentationKey`

If this setting contains a value, the Mosaic API will send telemetry data to the app insights ingestor. In addition to the built-in telemetry that the Application Insights sends automatically from an ASP.NET application, the following are being also sent as events as well:

- Analytic Handler 
- Externalized Events (please see below)

The `Analytic Handler` is a special handler included in some key methods to profile the method and store the values in application insights as a `Metric`. Here is a sample:

```
private async Task UpsertMembership(DigitalMembership digitalMembership, bool isPersist = false)
{
    var error = "";
    var handler = HandlersFactory.GetProfilerHandler(_loggerService, _settingService);
    handler.Start(LOG_TAG, "UpsertMembership");
    var analyticHandler = HandlersFactory.GetAnalyticHandler(_analyticService, _loggerService, _settingService);
    analyticHandler.Start();

    try
    {
.... code omitted for brevity
    }
    catch (Exception ex)
    {
        error = ex.Message;
        throw new Exception(error);
    }
    finally
    {
        analyticHandler.Track(handler.GetMethod(), handler.GetCurrentDuration(), null);
        analyticHandler.Stop();
        handler.Stop(error);
    }
}
```

So im summary, in the Application Insights, we store 4 different things:

- Requests - automatically added by Application Insights
- Traces - automatically added by Application Insights
- Custom Events - custom events are sent to the Application Insights whenever the Externalization service receives a non-failure event.
- Metrics - metrics are sent to the Application Insights whenever the analytic handler tracks a method as shown in the code above. Currently there are the following sources of metrics:
	- `DigitalService.UpsertMembership`
	- `DigitalService.UpsertProgram`
	- `DigitalMonitorService.RetrieveCacheStats` 
	- `DigitalMonitorService.RetrieveAgingStats` 
	- `DigitalMonitorService.RetrieveVitalStats` 
	- `DigitalMonitorService.RetrieveQueueStats` 
- Exceptions - exceptions are sent to Application Insights whenever the Externalization Service receives a `Failure` event. `Failure' events are queued to the Externalization service from the profiler hanlder.

### Externalized Events

These are specific events that are sprinkled out throughout the code to track certain key events. Currently we are tracking the following:

```
public enum ExternalizationEventTypes
{
    OfferViewed,
    PushMessageInvoked,

    StaticVoucherRedeemed,
    DynamicVoucherRedeemed,
    StaticVoucherUnredeemed,
    DynamicVoucherUnredeemed,

    PosAgentsActivated,
    PosAgentPulsed,
    PosAgentsVoucherValidated,
    PosAgentsMembershipValidated,
    PosAgentsTrackingSubmitted,
    PosAgentsTrackingAmountsProcessed,

    EcommercePurchase,
    EcommercePurchaseFailure,
    EcommerceRenew,
    EcommerceRenewFailure,

    InHousePurchase,
    InHousePurchaseFailure,
    InHouseRenew,
    InHouseRenewFailure,

    BackofficeLogin,
    BackofficeMembershipActivationRequested,
    BackofficeVoucherRedeemed,

    MobileAppsActivationCodeRequested,
    MobileAppsDeviceActivated,
    MobileAppsDeviceRegistered,
    MobileAppsDeviceMembershipRetrieved,
    MobileAppsDiscCodeGenerated,
    MobileAppsSupportContacted,
    MobileAppsVoucherRedeemed,
    MobileAppsContentDownload,
    MobileAppsJoinRequested,
    MobileAppsInviteeJoinRequested,
    MobileAppsInviteRequested,

    DigitalSearchRequested,
    DigitalExportRequested,
    DigitalPermissionsRequested,
    DigitalMobileAppsStatsRequested,
    DigitalEcommerceSitesStatsRequested,
    DigitalTrackingItemsRequested,
    DigitalReservationsRequested,
    DigitalStaticVoucherRedemptionsRequested,
    DigitalDynamicVoucherRedemptionsRequested,
    DigitalSaleItemsRequested,
    DigitalEcommerceSaleItemsRequested,
    DigitalInHouseSaleItemsRequested,
    DigitalEmailStatsRequested,
    DigitalRenewalRatiosRequested,
    DigitalSmsStatsRequested,
    DigitalActivityStatsRequested,
    DigitalDashboardStatsRequested,
    DigitalCannedReportsRequested,
    DigitalCannedReportCreated,
    DigitalCannedReportRunCreated,
    DigitalHotelsRequested,
    DigitalOutletsRequested,
    DigitalMembershipDetailRequested,
    DigitalMembershipImportFinished,

    BookingMembershipRetrieved,
    BookingCreated,
    BookingRequested,
    BookingApproved,
    BookingConfirmed,
    BookingActioned,

    Failure
}

```

The `Failure` externalized event is any exception that is thrown from an function. 

Externalized Events are sent to several destinations via a special `ExternalizedService`:

- DocDB collection - the collection is time constrained....so aged entries are automaticall deleted.
- Application Insights Ingestor if configured in the app

### App Events

The Mosaic Web API sends the app events received from mobile apps to an [event hub](https://docs.microsoft.com/en-us/azure/event-hubs/) called `mosaic-apps-analytic-events` so they can be further processed. The event hub is part of a namespace called `misc-ehubs` in the misc subscription. This will change in a future release. The hub has the following properties:

- 3 consumer groups: `$Default`, `AzureFunction` and `StreamAnalytic`. 
- 8 Partitions Count
- 1 Day Retention

The event hub ingests all the app events and runs it through a [stream analytic](https://docs.microsoft.com/en-us/azure/stream-analytics/stream-analytics-introduction) that will aggregate the data by day and stores it in a SQL database table.

The stream analytic is called `MosaicAppEvents`. It belongs in the Misc subscription for now. This will change in a future release. It has the following properties:

- A single input being the event hub mentioned above
- A query that aggregates the event hub events into days and hours
- 3 outputs: 
	- Aggregated Day Events SQL Database table i.e. `Core.DayAggregatedAppAnalyticEvent`
	- Aggregated Hour Events SQL Database table i.e. `Core.HourAggregatedAppAnalyticEvent`
	- Events Power BI data set i.e `MinuteEvents` data set in `MosaicAppEvents` table using the `powerbi@clubhotel.com` account

**Please note that the Event Hub and the Stream Analytic are only available in production.**

#### The Stream Analytic Query

```
/* Simple Day Analytic (SQL Database) */
/* Please note the CAST as the types have to match the table types */
SELECT
    System.TimeStamp AS Time,
    [collection] as Collection,
    [Category] as Category,
    [Method] as Method,
    [Language] as Language,
    [Platform] as Platform,
    [Program] as Program,
    Cast(COUNT(*) as bigint) AS Events
INTO
    DayEventsSqlAnalytic
FROM
    Input TIMESTAMP BY EventDate
GROUP BY
    Collection,
    Category,
    Method,
    Language,
    Platform,
    Program,
    TumblingWindow(day, 1)

/* Simple Hour Analytic (SQL Database) */
/* Please note the CAST as the types have to match the table types */
SELECT
    System.TimeStamp AS Time,
    [collection] as Collection,
    [Category] as Category,
    [Method] as Method,
    [Language] as Language,
    [Platform] as Platform,
    [Program] as Program,
    Cast(COUNT(*) as bigint) AS Events
INTO
    HourEventsSqlAnalytic
FROM
    Input TIMESTAMP BY EventDate
GROUP BY
    Collection,
    Category,
    Method,
    Language,
    Platform,
    Program,
    TumblingWindow(hour, 1)

/* Simple Analytic (PowerBI) */
/* Please note the CAST as the types have to match the table types */
/* This is manily for demo purposes */
SELECT
    System.TimeStamp AS Time,
    [collection] as Collection,
    [Category] as Category,
    [Method] as Method,
    [Language] as Language,
    [Platform] as Platform,
    [Program] as Program,
    Cast(COUNT(*) as bigint) AS Events
INTO
    EventsPowerBIAnalytic
FROM
    Input TIMESTAMP BY EventDate
GROUP BY
    Collection,
    Category,
    Method,
    Language,
    Platform,
    Program,
    TumblingWindow(minute, 1)
```

#### The Stream Analytic Tables Definitions

```
USE [MosaicApi]
GO

/****** Object:  Table [Core].[HourAggregatedAppAnalyticEvent]    Script Date: 8/31/2016 1:30:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [Core].[HourAggregatedAppAnalyticEvent](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Time] [datetime] NOT NULL,
	[Collection] [nvarchar](max) NULL,
	[Category] [nvarchar](max) NULL,
	[Method] [nvarchar](max) NULL,
	[Language] [nvarchar](max) NULL,
	[Platform] [nvarchar](max) NULL,
	[Program] [nvarchar](max) NULL,
	[Events] [int] NULL
 CONSTRAINT [PK_Core.HourAggregatedAppAnalyticEvent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
```

```
CREATE INDEX IX_Time ON Core.HourAggregatedAppAnalyticEvent (Time)
```

```
USE [MosaicApi]
GO

/****** Object:  Table [Core].[DayAggregatedAppAnalyticEvent]    Script Date: 8/31/2016 1:30:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [Core].[DayAggregatedAppAnalyticEvent](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Time] [datetime] NOT NULL,
	[Collection] [nvarchar](max) NULL,
	[Category] [nvarchar](max) NULL,
	[Method] [nvarchar](max) NULL,
	[Language] [nvarchar](max) NULL,
	[Platform] [nvarchar](max) NULL,
	[Program] [nvarchar](max) NULL,
	[Events] [int] NULL
 CONSTRAINT [PK_Core.DayAggregatedAppAnalyticEvent] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
```

```
CREATE INDEX IX_Time ON Core.DayAggregatedAppAnalyticEvent (Time)
```

## Storage Accounts

There are three storage accounts that Mosaic API makes use of:

- `mosaicapi` (classic) - holds most of the storage needs of the application for all slots:
	- Azure Web Jobs Dashboard
	- Blobs - support all slots
		- SQL Exports
		- Exports
		- Images
		- Canned Reports
		- Slim content
	- Queues - support all slots such as:
		- device-registrations => Device Registrations Queue
		- device-registrations-dev => Device Registrations Queue for the dev slot
		- app-analytic-events => App Analytic Events Queue
		- app-analytic-events-dev => App Analytic Events Queue for the dev slot
		- digital-memberships-refresh-requests => Digital Membership Refresh Requests Queue
		- digital-memberships-refresh-requests-dev => Digital Membership Refresh Requests Queue for the dev slot
		- digital-memberships-import-requests => Digital Membership Import Requests Queue
		- digital-memberships-import-requests-dev => Digital Membership Import Requests Queue for the dev slot
		- Etc
- `functionsstorage` - mainly used for the Mosaic Azure Functions App
- `digitalmanagerdev` - special storage using hot blobs. Mainly used to store the digital programs and memberships for all slots. All contains are private and they are named (I hate it...I called it `digitalmanagerdev` as opposed to `digitalmanager`....now I am stuck with it):
	- `digitalprograms-dev`
	- `digitalmemberships-dev`
	- `digitalprograms-staging`
	- `digitalmemberships-staging`
	- `digitalprograms-production`
	- `digitalmemberships-production`

## Databases

Mosaic API has access to the following databases:

| Name  | Type | Purpose |
| :------------ |:---------------:| :-----:|
| MosaicApi | Azure SQL Server | Main backend for Mosaic API. It has 3 copies: production, staging and dev |
| MosaicOracle | Oracle | Main legacy backend for Mosaic Rules |
| MosaicAPI | DocDB | Because provisioning an account in DocDB is not easy nor cheap. I am using `hmc` as an umbrella account for all DocDB needs. In this case, we have a database `MosaicApi` under the `hmc` account which has 3 collections `ExternalEvents`, `SearchRequests` and `DigitalMonitorPeriods`. These collections are auto-created in code for each slot. The `ExternalEvents` and `SearchRequests` collections are configured to auto-delete the old entries after 10 days|
| Redis | NoSQL| Used primarily to manage the cache associated with digital programs and memberships. It also emits store and retrieve events to subscribers. Because there are different price structures, I have different caches provisioned for each slot: `mosaicapi-dev`, `mosaicapi-staging` and `mosaicapi` |

## Search Service

Mosaic API makes a heavy use of [Azure Search Service](https://azure.microsoft.com/en-us/services/search/) to allow us to retrieve digital memberships quite fast. Mosaic API creates its own service `mosaicapi` which has different indexes....one for each slot:

- `devdigitalmemberships` (basic)
- `stagingdigitalmemberships` (basic)
- `digitalmemberships` (standard)

## Logic Apps

Mosaic API uses several logic apps:

| Name  | Purpose |
| :------------ | :-----:|
| `ApproveCampaign` | Used to send approval emails for campaigns (email, SMS and Push) generated by nNgage for the Mosaic product |
| `ApproveTransactionalRequest` | Used to send approval emails for transactional requests generated by nNgage for the Mosaic product |
| `ProcessBrandContent` | Used to process (receive or store) the brand content for Mosaic. It is one of the Mosaic content bots. |
| `ProcessInHouseContent` | Used to process (receive or store) the in-house content for Mosaic. It is one of the Mosaic content bots. |
| `ProcessEcommerceSitesContent` | Used to process (receive or store) the ecommerce sites content for Mosaic. It is one of the Mosaic content bots. |
| `ProcessMobileAppsContent` | Used to process (receive or store) the mobile apps content for Mosaic. It is one of the Mosaic content bots. |
| `ProcessInviteeRequest` | Used to process Invitee requests from the Mosaic mobile apps. |
| `ProcessJoinRequest` | Used to process Join requests from the Mosaic mobile apps. |
| `ProcessReferralRequest` | Used to process referral requests from the Mosaic mobile apps. |
| `ProcessContactSupportRequest` | Used to process contact support requests from the Mosaic mobile apps. |
| `SendActivationCodeAsSms` | Used to process SMS requests for activation codes from the Mosaic mobile apps or from Mosaic Legacy. |
| `RemindActivationCodeAsSms` | Used to remind members to activate. It has a sophisticated work flow which pauses 3 times for 2 days and re-check |

The logic apps are completely stateless and they work for all slots by accepting the `postUrl` in the trigger so we can use it to call back on if there is a need. This way the logic app is not cognizant of the tier and does not maintain the URLs. The exceptions to this is the `RemindActivationCodeAsSms` as it only works against the production server for obvious reasons.

Also...please note that the SQL tables that the logic apps use are only created in the MosaicAPI production database. This is to avoid switching connections in the logic apps or create a different set for different slots. Some logic apps trigger requests accept a `slot` which distinguishes the different triggers.

### SQL tables required by Logic Apps:

#### SmS Notifications

Used by `SendActivationCodeAsSms`. Please note that this table is created in the MosaicAPI database ...not in dev or staging.

```
USE [MosaicApi]
GO

/****** Object:  Table [Core].[SmsNotification]    Script Date: 8/31/2016 1:30:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [Core].[SmsNotification](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NotificationDate] [datetime] NOT NULL,
	[Program] [nvarchar](max) NULL,
	[MobileNumber] [nvarchar](max) NULL,
	[ActivationCode] [nvarchar](max) NULL,
	[StoreUrl] [nvarchar](max) NULL,
	[StoreBy] [nvarchar](max) NULL,
	[StoreName] [nvarchar](max) NULL,
	[SmsFromNumber] [nvarchar](max) NULL,
	[Slot] [nvarchar](max) NULL
 CONSTRAINT [PK_Core.SmsNotification] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
```

```
ALTER TABLE core.SmsNotification ADD Slot NVARCHAR(20) NULL
CREATE INDEX IX_NotificationDate ON Core.SmsNotification (NotificationDate)
```

#### Activation Declines

Used by `RemindActivationCodeAsSms`. Please note that this table is created in the MosaicAPI database ...not in dev or staging.

```
USE [MosaicApi]
GO

/****** Object:  Table [Core].[ActivationDecline]    Script Date: 8/31/2016 1:30:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [Core].ActivationDecline(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[DeclineDate] [datetime] NOT NULL,
	[ProcessedDate] [datetime] NULL,
	[Comment] [nvarchar](max) NULL,
	[Program] [nvarchar](max) NULL,
	[MobileNumber] [nvarchar](max) NULL,
	[ActivationCode] [nvarchar](max) NULL,
	[StoreUrl] [nvarchar](max) NULL,
	[StoreBy] [nvarchar](max) NULL,
	[StoreName] [nvarchar](max) NULL,
	[SmsFromNumber] [nvarchar](max) NULL
 CONSTRAINT [PK_Core.ActivationDecline] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
```

```
CREATE INDEX IX_DeclineDate ON Core.ActivationDecline (DeclineDate)
```

## Azure Functions

Azure Functions are in the same project as Mosaic API but have a different repository called `Functions`. They are configured for continuous integration so every time the code is pushed in, the functions get re-compiled. 

The following are the Azure Functions:

- `ProcessMobileAppContentCommand` - Used to process Mobile App content from Emails. It uses a companion Function `ParseMobileAppContentCommand`
- `ProcessSiteContentCommand` - Used to process Site content from Emails. It uses a companion Function `ParseSiteContentCommand`
- `ProcessBrandContentCommand` - Used to process Brand content from Emails. It uses a companion Function `ParseBrandContentCommand`
- `ProcessInHouseContentCommand` - Used to process In-House content from Emails. It uses a companion Function `ParseInHouseContentCommand`

The following are the `TriggerXXXXHouseKeeping` trigger points:

- 5 Minute Triggers:
	- `TriggerMonitorStatDataSets` - Used to query the digital monitor stats. B doing so, the Mosaic API will send its metric telemetry to the Application Insights ingestor. Also...it allows the Azure Function to provide a layer to detect anomalies and perhaps send a notification.
- 15 Minute Triggers
	- `TriggerHealthSystemUpdate` - Used to update the health system mainly Oracle
- 30 Minute Triggers
	- `TriggerQueuedOracleRequests` - Used to process Oracle requests queued up by the digital service.
- 45 Minute Triggers
	- `TriggerQueuedMosaicRequests` - Used to process Mosaic requests queued up by the ecommerce, in-house and WeChat sales.
- 1 Hour Triggers
	- `TriggerDigitalMonitorRefresh`
	- `TriggerConsumingLegacyEvents` - Used to process legacy events stored in Oracle database by the Rules server.
- 1 Day Triggers
	- `TriggerDeleteAgingLogMessages` >= 3 days
	- `TriggerDeleteAgingPosActivationPulses` >= 3 days
	- `TriggerImportStaleMemberships` >= 3 days
	- `TriggerImportMemberships` >= 3 days - already imported will be skipped
	- `TriggerDigitalProgramsRefresh` force all programs refreshes
- Canned reports 
	- `TriggerCannedReportXxxx` - each canned report implement its own trigger. Canned reports are used to process eNgage canned reports. These commands use the `Shared` folder to either invoke a Generic or an SSRS based report.

### Tables required by Azure Functions

Used by `ProcessXxxxContentCommand` to store content updates. Please note that this table is created in the MosaicAPI database ...not in dev or staging.

```
USE [MosaicApi]
GO

/****** Object:  Table [Core].[ContentUpdate]    Script Date: 8/31/2016 1:30:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [Core].ContentUpdate(
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[UpdateDate] [datetime] NOT NULL,
	[Type] [nvarchar](max) NULL,
	[Program] [nvarchar](max) NULL,
	[Slot] [nvarchar](max) NULL,
	[RequestedBy] [nvarchar](max) NULL
 CONSTRAINT [PK_Core.ContentUpdate] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
```

Used by `shared/InvokeGeneric` to store report runs for archving purposes. Please note that this table is created in the MosaicAPI database ...not in dev or staging.

```
/****** Object:  Table [Core].[CannedReportRun]    Script Date: 8/31/2016 1:30:23 PM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [Core].[CannedReportRun](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[RunDate] [datetime] NOT NULL,
	[Program] [nvarchar](max) NULL,
	[ReportId] [nvarchar](max) NULL,
	[ReportName] [nvarchar](max) NULL,
	[ReportSimpleName] [nvarchar](max) NULL,
	[RenderFormat] [nvarchar](max) NULL,
	[Processor] [nvarchar](max) NULL,
	[TargetUrl] [nvarchar](max) NULL,
	[Period] [nvarchar](max) NULL,
	[ReportLink] [nvarchar](max) NULL,
	[Duration] [float] NULL,
	[Error] [nvarchar](max) NULL
 CONSTRAINT [PK_Core.CannedReportRun] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
)

GO
```
## External Interfaces

Mosaic API interfaces externally with:

- Mosaic Legacy
- eNgage
- Vault

## Monitoring

We refresh hourly for the past 24 hour period and we store the last 24 periods. For example, if the last refresh is at 8:00 PM, then the data looks like this:

- 08:00 PM - period is from 07:00 PM (the previous day) until 08:00 PM
- 07:00 PM - period is from 06:00 PM (the previous day) until 07:00 PM
- 06:00 PM - period is from 05:00 PM (the previous day) until 06:00 PM
- 05:00 PM - period is from 04:00 PM (the previous day) until 05:00 PM
- 04:00 PM - period is from 03:00 PM (the previous day) until 04:00 PM
- 03:00 PM - period is from 02:00 PM (the previous day) until 03:00 PM
- 02:00 PM - period is from 01:00 PM (the previous day) until 02:00 PM
- 01:00 PM - period is from 12:00 AM (the previous day) until 01:00 PM
- 12:00 PM - period is from 11:00 AM (the previous day) until 12:00 PM
- 11:00 AM - period is from 10:00 AM (the previous day) until 11:00 AM
- 10:00 AM - period is from 09:00 AM (the previous day) until 10:00 AM
- 09:00 AM - period is from 08:00 AM (the previous day) until 09:00 AM

Several measures can be monitored for activity in each period:

- Log Messages
	- Avg Duration
	- Normal
	- Failure
	- Last 10 failures
- Digital Programs
	- Added
	- Updated
	- Last 10 refreshes
- Digital Memberships
	- Added
	- Updated
	- Last 10 refreshes
- Discount Codes 
	- Revealed
	- Consumed
	- Last 10 Discount Codes
- Communication Messages
	- Emails
	- Sms
	- Push
	- Last 10 Messages
- Oracle Request
	- Redemption
	- Tracking
	- Switch Vouchers
	- Errors
	- Last 10 Requests
- Mosaic Requests
	- Queued
	- Validated
	- Processed
	- Errored
	- Last 10 Requests
- In House Sales
	- New 
	- Renew
	- Last 10 Transactions
- Ecommerce Sales
	- New 
	- Renew
	- Last 10 Transactions
- Device Sessions
	- Initial
	- Recurring
	- Top 10 Members
- POS Agents
	- Active with pulses
	- Active 
	- Top 10 Agents
- Booking Requests
	- In Network
	- Out Network
	- With Vouchers
	- Without Vouchers
	- Last 10 Transactions
- Tracking Requests
	- Without vouchers
	- with vouchers
	- Last 10 Transactions
- Voucher Requests
	- Validations
	- Redemptions
		- Backoffice
		- POS
		- Apps
	- Last 10 Redemptions
- App Analytic Events
	- Pre-login Views
	- Post-login Views
- Legacy 
	- Events
	- Exchanges
	- Exchanges with failures
	- Last 10 Events
	- Last 10 Exchanges
- External Events
	- Failures
	- Others
	- Last 10 Failures
	- Last 10 Events
- Cache
	- Stores
	- Retrievals
- App Interactions
	- Contact Us
	- Referrals
	- Join Requests
	- Invite Requests
	- SMS Requests
- Searches
	- Last 10 Searches

## Future Trend

The Azure Resources that we have must be bundled in Resource Groups. Each Resource Group is actually a solution or an app. For example, we will have one resource group called MosaicWebApi with the all the resources outlined in this document. Via PowerShell and ARM, we can deploy and tear down deployments by instantiating resource groups and tearing them down.

This will give us a great opportunity to allow us to stand up different instances for the same app quickly for test purposes but also for situations where we need to physically separate deployments. For example, we an create a PCASIA deployment in its own resource group which has totally isolated environment than others. This can also help in billing and charging the client for his own resource group. 

The only concern is the source code…so we link the source code so that the code is actually deployed to them all at once? Or each resource group has its own deployment in VSTS…we can also create a macro-level deployment that does all of them at the same time.

Another possible future trend is to move Mosaic API to [Service Fabric](https://azure.microsoft.com/en-us/services/service-fabric/) where we will similar benefits and can also create multi-tenant environment scaled and upgraded independently. In addition, Service Fabric provides us with better options to manage the digital program and memberships as actors.




