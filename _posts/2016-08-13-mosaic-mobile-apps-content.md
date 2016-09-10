---
layout: post
author: "Khaled A"
title:  "Mosaic Mobile Apps Content Management"
date:   2016-08-13 10:12:45
summary: "A description of the new content management aspects of Mobile Apps"
categories: mosaic mobile-app
tags: Mobile-Apps Content Management
featured_image: /images/cover.jpg
---

This article discusses the content management aspects of the Mosaic Mobile Apps. If you would like to get a PDF version of this article, it can be downloaded from [here](https://www.dropbox.com/s/h4pkz829x113xrj/mobile-apps-content-management.pdf?dl=0).   


## Motivation

In our Mobile Apps development, the content management phase is the number one resource consumer because:

- Both IT and marketing resources are involved as there is a lot of effort to gather the content and even more effort to make it fit for the app.
- The content is placed in Asana, Dropbox and WeTransfer!! It takes significant effort from IT to pull it all together and make it suitable for the app. 
- Usually the images and assets do not match our required dimensions or resolution!! So IT ends up having to re-size or change the image resolution to match what the app requires

In addition to the above (which adds a significant overhead to the development process), we see the following issues with the current app content:

- It is an attempt to match the what the hotels already have on their sites or mobile apps. Hence IT and marketing resources are constantly consumed trying to make our mobile apps compliant with the hotels content. Needless to mention, this usually ends up being a huge process that involves exhausting communication with the hotels.
- Given that we place hotel content in our app, this actually ends up being a liability for us. In fact, we have seen some cases of this where the hotel requested an Excel sheet of all the content that we have in the app so they can review it to make sure it matches theirs.

The above issues, of course, will not allow us to scale well and will diminish our ability to deliver apps faster as our resources are spent on the wrong thing as opposed to make the apps faster, better and more beautiful. We need a new approach to the mobile app content management.....hence this proposal.

Here is how we feel about content:

- Although hotels and outlet listings can be useful in our app, they add little value to the app value proposition. Members are more interested in the offers, the vouchers and the discount that the membership buys for them rather than checking out hotel or outlet listings. 
- We recently launched a new initiative we are referring to as *Membership-centric App* as opposed to *Brochure-centric App*. We actually have already mocked some screens to show off new app designs that surface the membership. You can try it on your Android device using this [link](http://hmccode.github.io/2016-07-23/mobile-apps#member-centric-app) if you like. This new approach makes the content a second class citizen by providing only a slim version of the content. 
- Since the new *Membership-centric* design is not approved yet and may require several iterations to get an agreement on, it is probably a good idea to use the slim-down content on the new apps that we are now building with the existing design. This will help us scale better at delivering the new apps.

Hence the new content manager has three main objectives:

- Reduce the amount of resources required to manage the mobile apps content by organizing the process better and make it easier for marketing to own the process and submit content changes without involving IT. 
- Use a much slimmer content version which allows marketing to assemble content much faster and reduce app content liability.  
- Use a simpler method to retrieve and update mobile app content. 

Hence this document specifies the fields & formats necessary for each content type required by the app and provides two ways to manage this content.    

## File Formats & Samples

The mobile apps content is described in [JSON](https://en.wikipedia.org/wiki/JSON). A complete content file sample can be downloaded from [here](https://www.dropbox.com/s/sxb9f9p3wpkvna9/oroverde-json.json?dl=0)

In this section, we will discuss the file format for each content type.

### Program

The program content requires the following properties:

- Name: The program name i.e. circlem, pcme, pcasia, etc
- Support Email Addresses: The support email addresses where inbound requests arrive i.e support@test.com
- Supported Languages: The languages that must be supported by this app (separated by a comma) i.e EN,ES
- Is Voucher Redeemable: if true, this makes the app support the in-app redemption as required by the `My Mazaya` app for example
- Is Show Offer Notification: if true, this makes the app pop up a dialog to prompt the user when an offer notification arrives when a push notification arrives while the app is active
- Hotel Group Ids: The hotel group ids (separated by a comma) i.e 1,1999
- Generic1: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic2: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic3: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic4: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific program title
	- Support Phone Numbers: an HTML fragment in the specific language
	- Members Benefits URL: a URL to point to the language-specific member benefits page usually on the eCommerce sites
	- Terms URL: a URL to point to the language-specific terms page usually on the eCommerce sites
	- Privacy Policy URL: a URL to point to the language-specific privacy policy page usually on the eCommerce sites
	- Cookie Statement URL: a URL to point to the language-specific cookie statement page usually on the eCommerce sites
	- Generic1: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic2: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic3: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic4: A generic field that can be used in case it is needed for some apps. By default this should be empty.

#### JSON sample

```json
{
  "name": "Test",
  "supportEmailAddresses": "support@test.com",
  "supportedLanguages": "en,es",
  "isVoucherRedeemable": false,
  "isShowOfferNotification": false,
  "hotelGroupIds": "1,1999",
  "generic1": "",
  "generic2": "",
  "generic3": "",
  "generic4": "",
  "languages": {
    "en": {
      "title": "Test-en",
      "supportPhoneNumbers": "some html fragment",
      "memberBenefitsUrl": "https://site.com/benefits",
      "termsUrl": "https://site.com/terms",
      "privacyPolicyUrl": "https://site.com/privacy",
      "cookieStatementUrl": "https://site.com/cookies",
	  "generic1": "",
	  "generic2": "",
	  "generic3": "",
	  "generic4": ""
    },
    "es": {
      "title": "Test-es",
      "supportPhoneNumbers": "some html fragment",
      "memberBenefitsUrl": "https://site.com/benefits",
      "termsUrl": "https://site.com/terms",
      "privacyPolicyUrl": "https://site.com/privacy",
      "cookieStatementUrl": "https://site.com/cookies"
	  "generic1": "",
	  "generic2": "",
	  "generic3": "",
	  "generic4": ""
    }
  }
}
```

### Art

The art content requires the following properties:

- Text Color: The theme text color. Please see below for how it should be specified.
- Background Color: The theme background color. Please see below for how it should be specified.
- Links Color: The theme URL links color. Please see below for how it should be specified.
- Accent Color: The theme accent color. Please see below for how it should be specified.
- Icon Background Image Url: PNG 1024x1024
- Logo Background Image Url: PNG 1024x1024
- Card Image Url: PNG 560x355
- Home Image1 Url: PNG 640x258
- Home Image2 Url: PNG 640x258
- Home Image3 Url: PNG 640x258
- Home Image4 Url: PNG 640x258
- Splash Image4 Url: PNG 1242x2208

*Color must be specified using a hexadecimal value in the form: `#RRGGBB`, where `RR` (red), `GG` (green) and `BB` (blue) are hexadecimal values between `00` and `FF` (same as decimal 0-255)*

#### JSON sample

```json
{
  "art": {
    "textColor": "#ee4433",
    "backgroundColor": "#ee4466",
    "linksColor": "#eeeeee",
    "accentColor": "#222222",
    "iconBackgroundImageUrl": "https://images.com/icon",
    "logoBackgroundImageUrl": "https://images.com/logo",
    "cardImageUrl": "https://images.com/card",
    "homeImage1Url": "https://images.com/home1",
    "homeImage2Url": "https://images.com/home2",
    "homeImage3Url": "https://images.com/home3",
    "homeImage4Url": "https://images.com/home4",
    "splashImageUrl": "https://images.com/splash"
  }
}
```

### Store

The store content requires the following properties:

- Banner Image Url: PNG 1000x800
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Summary: a language specific summary
	- Description: a language specific summary
	- Privacy Policy URL: a URL to point to the language-specific privacy policy page usually on the eCommerce sites
	- Support URL: a URL to point to the language-specific support page usually on the eCommerce sites
	- Site URL: a URL to point to the language-specific site main page usually on the eCommerce sites
	- Upgrade Text: a language-specific upgrade text used when we deploy new versions

#### JSON sample

```json
{
  "store": {
    "bannerImageUrl": "http://images.com/banner",
    "languages": {
      "en": {
        "summary": "some summary",
        "description": "some description",
        "privacyUrl": "http://site.com/privacy",
        "supportUrl": "http://site.com/support",
        "siteUrl": "http://site.com",
        "upgradeText": "some upgrade en text"
      },
      "es": {
        "summary": "some summary",
        "description": "some description",
        "privacyUrl": "http://site.com/privacy",
        "supportUrl": "http://site.com/support",
        "siteUrl": "http://site.com",
        "upgradeText": "some upgrade es text"
      }
    }
  }
}
```

### Hotels

The hotel content requires the following properties:

- Code: The hotel code which serves as the main identifier. Must be unique within a program. This will not be displayed...the title in specific language will be displayed instead.
- Phone: The hotel phone number to call from the app
- Image Url: PNG 620x258
- Site Url: Usually the hotel own site where they can provide more information
- Reservation Url: Usually the hotel own reservation site
- Country Code: the 3-digit ISO standard for where the hotel is located i.e. UAE
- Latitude: the hotel location information to calculate distance
- Longitude: the hotel location information to calculate distance
- Star Rating: the hotel rating in number i.e. 5
- Generic1: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic2: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic3: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic4: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific hotel title
	- Image Url: PNG 620x258
	- Site Url: Usually the hotel own site where they can provide more information
	- Reservation Url: Usually the hotel own reservation site
	- Address: the hotel address
	- City: a language specific hotel city
	- Country: a language specific hotel country
	- Postal: the hotel postal
	- Image Galleries: a collection of images to be displayed in the hotel detail. Each gallery image has a url, a tag line and an order. The tag line is used to identify the gallery images. The app will display the tag lines if available in the order specified. 
	- Description: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that describes the hotel. If the description is not available, the app will not display a hotel detail.
	- Generic1: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic2: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic3: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic4: A generic field that can be used in case it is needed for some apps. By default this should be empty.

Please note that hotel images (whether listing or gallery) must comply with the following:

* Size - 200 KB max
* Resolution - 72 DPI. DPI stands for Dots Per Inch which technically means printer dots per inch. Today it is a term often misused, usually to mean PPI, which stands for Pixels Per Inch. So when someone says they want a photo that is 300 dpi they really mean that they want 300 ppi. 
* Orientation - Landscape ....not portrait 
* Dimensions - the bigger the better. 

#### JSON sample

```json
{
  "hotels": [
    {
      "code": "MPJBR",
      "phone": "P971043901708",
      "countryCode": "UAE",
      "latitude": 54.34,
      "longitude": 34.1,
	  "starRating": "5",
	  "generic1": "",
	  "generic2": "",
	  "generic3": "",
	  "generic4": "",
      "languages": {
        "en": {
          "title": "Movenpick Jumeira Beach Resort (en)",
	      "image": "https://images.url",
	      "siteUrl": "https://www.movenpick.com",
	      "resUrl": "https://www.movenpick.com",
          "address": "address",
          "city": "Dubai",
          "country": "United Arab Emirates",
		  "postal": "postal",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/208665ac-5296-4790-825c-448c2b970a67.jpg",
              "tagLine": "tagline1",
              "order": 0
            }
          ],
		  "description": "some descripion without commas",
		  "generic1": "",
		  "generic2": "",
		  "generic3": "",
		  "generic4": "",
        },
        "es": {
          "title": "Movenpick Jumeira Beach Resort (en)",
	      "image": "https://images.url",
	      "siteUrl": "https://www.movenpick.com",
	      "resUrl": "https://www.movenpick.com",
          "address": "address",
          "city": "Dubai",
          "country": "United Arab Emirates",
		  "postal": "postal",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/208665ac-5296-4790-825c-448c2b970a67.jpg",
              "tagLine": "tagline1",
              "order": 0
            }
          ],
		  "description": "some descripion without commas",
		  "generic1": "",
		  "generic2": "",
		  "generic3": "",
		  "generic4": "",
        }
      }
    }
  ]
}
```

### Outlets

The outlet content requires the following properties:

- Code: The outlet name which serves as the main identifier. Must be unique within a program. This will not be displayed....the title in specific language will be displayed instead.
- HotelCode: The associated hotel code where the outlet is located. In other words, this code is what links outlets to hotels.
- Phone: The outlet phone number to call from the app
- Country Code: the 3-digit ISO standard for where the outlet is located i.e. UAE
- Generic1: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic2: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic3: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic4: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific hotel title
	- Image Url: PNG 620x258
	- Site Url: Usually the hotel own site where they can provide more information
	- City: a language specific hotel city
	- Country: a language specific hotel country
	- Cuisine: a language specific cuisine
	- Attire: a language specific attire
	- Image Galleries: a collection of images to be displayed in the outlet detail. Each gallery image has a url, a tag line and an order. The tag line is used to identify the gallery images. The app will display the tag lines if available in the order specified. 
	- Description: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that describes the hotel. If the description is not available, the app will not display a hotel detail.
	- Operating Hours: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that shows the outlet operating hours. Make it as brief as possible.
	- Generic1: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic2: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic3: A generic field that can be used in case it is needed for some apps. By default this should be empty.
	- Generic4: A generic field that can be used in case it is needed for some apps. By default this should be empty.

Please note that outlet images (whether listing or gallery) must comply with the following:

* Size - 200 KB max
* Resolution - 72 DPI. DPI stands for Dots Per Inch which technically means printer dots per inch. Today it is a term often misused, usually to mean PPI, which stands for Pixels Per Inch. So when someone says they want a photo that is 300 dpi they really mean that they want 300 ppi. 
* Orientation - Landscape ....not portrait 
* Dimensions - the bigger the better. 

#### JSON sample

```json
{
  "outlets": [
      "code": "OVMTA5",
      "hotelCode": "OVMTA",
      "phone": "+59352629200",
      "countryCode": "ECU",
      "generic1": "",
      "generic2": "",
      "generic3": "",
      "generic4": "",
      "languages": {
        "en": {
          "title": "Bar Murciélago",
          "image": "https://mosaicapi.blob.core.windows.net/images/8cbb1b57-89c0-4455-81cf-fcd4bfad0362.jpg",
          "siteUrl": "",
          "city": "Manta",
          "country": "Ecuador",
          "cuisine": "Snacks & Drinks",
          "attire": "Casual",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/8cbb1b57-89c0-4455-81cf-fcd4bfad0362.jpg",
              "tagLine": "tagline1",
              "order": 0
            }
          ],
          "description": "Ven y disfruta en Bar Murcielago de los mejores coctels y piqueos de Manta, en el sector de la piscina de nuestro hotel, con una increible vista al mar.",
          "operatingHours": "some en hours",
          "generic1": "",
          "generic2": "",
          "generic3": "",
          "generic4": ""
        },
        "es": {
          "title": "Bar Murciélago",
          "image": "https://mosaicapi.blob.core.windows.net/images/8cbb1b57-89c0-4455-81cf-fcd4bfad0362.jpg",
          "siteUrl": "",
          "city": "Manta",
          "country": "Ecuador",
          "cuisine": "Bebidas y cocktails",
          "attire": "Casual",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/8cbb1b57-89c0-4455-81cf-fcd4bfad0362.jpg",
              "tagLine": "tagline1",
              "order": 0
            }
          ],
          "description": "Ven y disfruta en Bar Murcielago de los mejores coctels y piqueos de Manta, en el sector de la piscina de nuestro hotel, con una increible vista al mar.",
          "operatingHours": "some es hours",
          "generic1": "",
          "generic2": "",
          "generic3": "",
          "generic4": ""
        }
      }
    }
  ]
}
```

### Strings

Every string in the app is tagged with a special key so it can be identified and re-purposed for different languages. The `key` therefore is an identifier to each app string and the value is language-specific actual string to be used in the app for the specific language.

#### JSON sample

```json
"strings": {
	"en": {
	  "app_title": "Pasaporte Gourmet Oro Verde",
	  "lang_title": "English",
	  "speed_dial_show": "true",
	  "speed_dial_color": "#85754E",
	  "button_ok": "OK",
	  "button_send": "Send",
	  "button_cancel": "Cancel",
	  "button_update": "Update",
	  "button_call_now": "Call Now",
	  "button_activate": "Activate",
	  "button_reset": "Reset Activation",
	  "button_try_again": "Try Again",
	  "button_call_us": "Call Us",
	  "button_email_send": "Send Email"
	},
	"es": {
	  "app_title": "Pasaporte Gourmet Oro Verde",
	  "lang_title": "Spanish",
	  "speed_dial_show": "true",
	  "speed_dial_color": "#85754E",
	  "button_ok": "Listo",
	  "button_send": "Enviar",
	  "button_cancel": "Cancelar",
	  "button_update": "Actualizar",
	  "button_call_now": "Llamar ahora",
	  "button_activate": "Activar",
	  "button_reset": "Reiniciar activación",
	  "button_try_again": "Intentar de nuevo",
	  "button_call_us": "Llámenos",
	  "button_email_send": "Enviar Correo Electrónico"
	}
}
```

## Content Management

There are two ways to retrieve, update and manage the content:

### Using an Email Bot:

In order to make things easy for folks to retrieve and update mobile apps content, we created a content Email bot which listens on emails arriving to `mosaic-app-content@clubhotel.com` inbox. The bot uses the email's subject as a command to either retrieve or update content. Since communicating over Emails is a very familiar work process, we feel this method will be quite helpful as it mimics this very familiar process!

Here is a block diagram:

![Block Diagram](http://i.imgur.com/gPoGjmr.png)

Simply, you create a new email to `mosaic-app-content@clubhotel.com` with a subject that commands the bot to do things on your behalf. Currently the bot responds to the following form of commands:

`VERB-PROGRAM-TYPE-SLOT`

Where **VERB** is:

- `get`- to retrieve
- `save`- to store

**PROGRAM** is the name of the program i.e. `circlem`

**TYPE** is the content type that you wish to either retrieve or store. For now, JSON is the only one supported:

- `json` - refers to the JSON representation of the entire content. *This is mainly used by IT*.

**SLOT** is the slot that you wish this content to apply to. This is an optional parameter. If omitted, the engine defaults to `staging`:

- `staging`- staging slot
- `production`- production slot

#### Retrieve

Here are some **Retrieve Examples**:

- `get-circlem-json` => Retrieve CircleM JSON

When you issue a `get` request, the content Email bot responds with an Email with an attachment. The attachment is a JSON file that has the desired content. 
 
#### Store

Here are some **Store Examples**:

- `save-circlem-json` => Store CircleM JSON

When you issue a `save` request, the content Email bot responds with a confirmation Email whether the operation succeeds or not. All `save` commands require that an attachment be added to the email. For example, if you want to update the JSON for a specific program, you will send n email with subject `save-circlem-json` and attached `cirvlem-json.json`, for example. 

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



