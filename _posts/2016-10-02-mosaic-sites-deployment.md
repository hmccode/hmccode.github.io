---
layout: post
author: "Khaled A"
title:  "Mosaic Sites Deployment"
date:   2016-10-02 10:12:45
summary: "Notes about deploying Mosaic sites"
categories: mosaic sites
tags: mosaic sites deployment
featured_image: /images/cover.jpg
---

We use Team Services for source code control, build processes and deployment. This post describes how to deploy a site after the code has been pushed into either the master or staging branch. The master branch is used as a base to deploy to production while the staging branch is used as a base to deploy to staging.

In order to deploy, you must have access the `EcommerceSites` Team Services Project. The project has several sections ...but here we are concerned with `Code` and `Build`. The `Code` contains two branches: `Master` and `Staging`. The `Build` on the other hand has several build processes. You see this list by clicking on the build section, definitions and all definitions:

![Ecommerce Projects Build Definitions](http://i.imgur.com/KFHeJLi.png)

Usually for each site, there are two builds: `Staging` and `Production`. Select the site and the slot you would like to deploy and click on `Queue new build`:

![Queue New Build](http://i.imgur.com/WfTyx4x.png)

*If you do not see the site that you need to deploy, please let us know and we will add it for you.*

After the confirmation, this will request a new build. The build might be queued waiting for a host to start it or might be started right away. In either case, you will see a blue screen which shows compiling and deploying to the site:

![Build Process Running](http://i.imgur.com/rqHcY8f.png)

This might take a minute or so! Once it is done, you need to make sure that the build is successful. Please observe that the build process steps are all green and that the build ends with something like this:

![Successful Build](http://i.imgur.com/mohssxk.png)

If the build ends with a failure message, then you must re-queue the build. This is how a failure might look like:

![Bad Build](http://i.imgur.com/zg0jKuB.png)

## Mapped Sites:

| Site  | Slot| NOTES |
| :---- |:----|:----- |
| circlem.movenpick.com| ecommerce-sdda-circlem.azurewebsites.net | |
| clubhotel.eu| ecommerce-sdda-mymazaya.azurewebsites.net | |
| clubhotel.me| ecommerce-sdda-mymazaya.azurewebsites.net | |
| mymazayam.com| ecommerce-sdda-mymazaya.azurewebsites.net | |
| clubmataam.com| app-companion-me-clubmataam-production.azurewebsites.net | |
| diningplusme.com| app-companion-me-diningplus-production.azurewebsites.net | Radisson blu |
| grandprivilege.com| app-companion-me-gpdoha-production.azurewebsites.net  | Grand Hyatt Doha |
| dusitprivilege.com| app-companion-me2-dusitthani-production.azurewebsites.net  | Dusit Thani|
| pasaportegourmet.com| app-companion-la-oroverde-production.azurewebsites.net  | Oro Verde|
| premiumclubasia.com| ecommerce-sdda-pcasia.azurewebsites.net  | PC ASia |
| premiumclubme.com| ecommerce-sdda-pcme.azurewebsites.net  | PC Middle East |
| swissotelgourmetclub.com| ecommerce-sdda-gourmetclub.azurewebsites.net  |  |
| mpmdiningprivileges.com| app-companion-asia-mpmdining-production.azurewebsites.net  |  |
| marcopoloelitemanila.com| app-companion-asia2.azurewebsites.net  |  |
| goldenpalmtreepremiumclub.com| app-companion-asia2-avani-production.azurewebsites.net  | Avani  |
| qube.com| app-companion-asia2-qube-production.azurewebsites.net  | Qube  |
