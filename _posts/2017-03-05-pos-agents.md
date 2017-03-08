---
layout: post
author: "Khaled A"
title:  "POS Agents V3 Update"
date:   2017-03-05 10:12:45
summary: "A description of what is planned for V3 of POS Agents"
categories: mosaic POS agents
tags: Mosaic POS Agents
featured_image: /images/cover.jpg
---

This article discusses the features planned for V3 of the POS Agents.   

## Telemetry Information

System Information and Product Version are now being sent with the activation calls. This allows us to determine all the POS agents that are currently active and their last activation date. In addition, we will know that version number of each POS agent in the field.

## Built-in Offline Manager

The new POS agents implement an offline manager that auto-switches the POS agent to offline or online mode based communication status. It employs two techniques:

- HTTP error detection 
- Pulse mechanism failures 

HTTP errors happen when there is a problem with Internet connections from the POS agents to the back-end server. Pulse is a new signal we are sending from the POS agents to the back-end system to report status and to determine the back-end health, specifically whether Oracle is down or up.

If a POS Agent is switched to offline mode, all transactions are honored! However, the tracking transactions are stored locally so they can be auto-uploaded at certain interval (see below). The POS agent will switch back to Online mode when a new Pulse signal determines that the back-end system is healthy again.

## Auto-upload offline transaction records

As mentioned, in offline mode, all transactions are honored! However, the tracking transactions are stored locally in the POS agents. The POS agents employ a new scheduler that auto-uploads all locally-stored tracking transactions to the server. This relieves IT managers from having to do this step manually. Please note, however, that the POS Agents user interface still allows a manual invocation of the upload process if desired. 

## User Interface changes to reflect online and offline modes

When POS Agents switch to offline mode, the user interface reflects this new status in the lower right hand corner by stating that the agent is in offline mode (appears in RED). When in online mode, the mode appears either in black or GREEN.

## More fine-grained settings

New settings were added to better control the above new features:

- Program - pre-populated upon activation from the server. But it can be overridden if need be. This refers to the Mosaic program (i.e. CircleM) in which the POS agent is part of.
- Pulse Timer In Minutes - the number of minutes between successive pule signals. 
- Offline Process In Minutes - the number of minutes between successive offline process which will upload locally-stored tracking transactions to the server in a background thread. 

Here is a settings file sample:

```
{
  "PosActivationCode": "your-own",
  "PosType": 1,
  "Program": "TEST",
  "Hotel": "Default Hotel",
  "HotelId": 1,
  "NativeCurrency": "",
  "EmailAddress": "",
  "Port": 5002,
  "ScenarioIterations": 1,
  "ScenarioCommandsFilePath": "settings/scenarios.txt",
  "ScenarioMembershipsFilePath": "settings/memberships.txt",
  "ScenarioVouchersFilePath": "settings/vouchers.txt",
  "AgentType": 0,
  "TaxType": 1,
  "TaxPercentage": 0.0,
  "IsTaxAfterDiscount": true,
  "ServiceChargePercentage": 0.0,
  "Outlets": [],
  "MaxCovers": 12,
  "ApiUrl": "https://mosaic-web-api-dev.azurewebsites.net",
  "ApiVersionHeader": "X-API-VERSION",
  "ApiVersion": "2",
  "NetworkRetryCounter": 3,
  "NetworkRetryIntervalInSeconds": 1,
  "LoggerRollOverSize": 50000,
  "MaxLocalTransactions": 100,
  "PulseTimerInMinutes": 5,
  "OfflineProcessorInMinutes": 60
}
```

To try out the new features, please use this bits [here](https://www.dropbox.com/s/x3z434i06d8m1c8/POSAgentsV3.zip?dl=0) and make sure you are pointing our test agent to [https://mosaic-web-api-dev.azurewebsites.net](https://mosaic-web-api-dev.azurewebsites.net). Let us know if any problem.

