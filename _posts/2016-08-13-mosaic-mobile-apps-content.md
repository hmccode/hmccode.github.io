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

This article discusses the content management aspects of the Mosaic Mobile Apps. I think you should start by watching this [screen cast ](https://www.dropbox.com/s/y3t27u0uc49mbrw/mosaic-app-content-management.MP4?dl=0) which explains how the content manager works in principle. Once you finish watching the screen cast, you can refer back to this article for details. Also...if you would like to get a PDF version of this article, it can be downloaded from [here](https://www.dropbox.com/s/ny5q0r5fxkbhc1b/content-management.pdf?dl=0).   


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

## How it works

In order to make things easy for folks to retrieve and update mobile apps content, we created a content Email bot which listens on emails arriving to `mosaic-app-content@clubhotel.com` inbox. The bot uses the email's subject as a command to either retrieve or update content. Since communicating over Emails is a very familiar work process, we feel this method will be quite helpful as it mimics this very familiar process!

Here is a block diagram:

![Block Diagram](http://i.imgur.com/843qcJq.png)

Simply, you create a new email to `mosaic-app-content@clubhotel.com` with a subject that commands the bot to do things on your behalf. Currently the bot responds to the following form of commands:

`VERB-PROGRAM-TYPE-SLOT`

Where **VERB** is:

- `get`- to retrieve
- `save`- to store

**PROGRAM** is the name of the program i.e. `circlem`

**TYPE** is the content type that you wish to either retrieve or store. Currently there are the following content types:

- `program` - refers to general information about the program 
- `hotels` - a list of all hotels (in multiple languages) supported by the program
- `outlets` - a list of all outlets (in multiple languages) supported by the program
- `strings` - a list of all app strings (in multiple languages) supported by the program
- `art` - refers to art information required for this program
- `store` - refers to store i.e. Android and iOS information required to place the program app in stores
- `json` - refers to the JSON representation of the entire content. *This is mainly used by IT*.

**SLOT** is the slot that you wish this content to apply to. This is an optional parameter. If omitted, the engine defaults to `staging`:

- `staging`- staging slot
- `production`- production slot

### Retrieve

Here are some **Retrieve Examples**:

- `get-circlem-program` => Retrieve CircleM program 
- `get-circlem-hotels` => Retrieve CircleM hotels 
- `get-circlem-outlets` => Retrieve CircleM outlets 
- `get-circlem-art` => Retrieve CircleM art 
- `get-circlem-strings-production` => Retrieve CircleM app strings in production

When you issue a `get` request, the content Email bot responds with an Email with an attachment. The attachment is a CSV file that has the desired content. For example, if you request `hotels` for a specific program, you will get a `hotels.csv` attachment which contains all the program hotels. 

*The `json` content type is an exception where the attachment is not a `.csv` but `.json`. But, as mentioned, the `json` content type is for IT use only.*
 
### Store

Here are some **Store Examples**:

- `save-circlem-program` => Store CircleM program 
- `save-circlem-hotels` => Store CircleM hotels 
- `save-circlem-outlets` => Store CircleM outlets 
- `save-circlem-art` => Store CircleM art 
- `save-circlem-strings-production` => Store CircleM app strings in production

When you issue a `save` request, the content Email bot responds with a confirmation Email whether the operation succeeds or not. All `save` commands require that an attachment be added to the email. For example, if you want to update `hotels` for a specific program, you will send n email with subject `save-circlem-hotels` and attached `hotels.csv`. 

*The `json` content type is an exception where the attachment is not a `.csv` but `.json`. But, as mentioned, the `json` content type is for IT use only.* 

### Notes

The following are general aspects (not in any specific order) about the process:

- The subject is the command! The bot will analyze the subject line to know what to do
- There could be only one attachment at a time
- CSV is used to consume and update content. CSV a simple file format used to store tabular data, such as a spreadsheet or database. Files in the CSV format can be imported to and exported from programs that store data in tables, such as Microsoft Excel or OpenOffice Calc. CSV stands for `comma-separated values`.    
- Since we are using CSV, a special care needs to be taken not to include extra commas in the content as this will break the content
- if you use Excel to edit CSV, please make sure you save it as `CSV`...not `XLSX`. Generally speaking, it is faster and easier to edit the files using Notepad++, for example. 
- All fields must be exactly as specified below and as shown in the sample CSV files. If you need to add more languages, add the exact same number of columns as English. Please note that the language-bound columns must end with `-lang` where the `lang` is the 2-digit language identifier i.e. en, es, etc.
- The bot will notify the sender by email on failure.
- If the `slot` is missing from the command, `staging` is assumed.
- When a content type is language bound i.e. Hotels and outlets, English is mandatory.
- Currently the bot checks the inbox every 5 minutes so don't expect an immediate return.
- There is one drawback to this approach which is that the content is driven by emails! In other words, to get the latest version of the content, all you have to do is to issue a command to get the content. Similarly to update the content, all you to do is to send a list of hotels. While convenient, it does remove our (i.e. IT) ability to control the content from source control because it gives the ability to someone to send a blank list of hotels which will erase the content. We will employ some measures to prevent this or add more restrictions.
- The bot only accepts emails from `.clubhotel.com` domain! This prevents external people to command the bot. We can also add more restrictions to only allow a handful of email addresses to manage content.  

## File Formats & Samples

In this section, we will discuss the file format for each content type and provide samples to download.

### Program

The program content requires the following properties:

- Name: The program name i.e. circlem, pcme, pcasia, etc
- Support Email Addresses: The support email addresses where inbound requests arrive i.e support@test.com
- Is Voucher Redeemable: if true, this makes the app support the in-app redemption as required by the `My Mazaya` app for example
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific program title
	- Support Phone Numbers: an HTML fragment in the specific language
	- Members Benefits URL: a URL to point to the language-specific member benefits page usually on the eCommerce sites
	- Terms URL: a URL to point to the language-specific terms page usually on the eCommerce sites
	- Privacy Policy URL: a URL to point to the language-specific privacy policy page usually on the eCommerce sites
	- Cookie Statement URL: a URL to point to the language-specific cookie statement page usually on the eCommerce sites

#### JSON sample

```json
{
  "name": "Test",
  "supportEmailAddresses": "support@test.com",
  "isVoucherRedeemable": false,
  "languages": {
    "en": {
      "title": "Test-en",
      "supportPhoneNumbers": "some html fragment",
      "memberBenefitsUrl": "https://site.com/benefits",
      "termsUrl": "https://site.com/terms",
      "privacyPolicyUrl": "https://site.com/privacy",
      "cookieStatementUrl": "https://site.com/cookies"
    },
    "es": {
      "title": "Test-es",
      "supportPhoneNumbers": "some html fragment",
      "memberBenefitsUrl": "https://site.com/benefits",
      "termsUrl": "https://site.com/terms",
      "privacyPolicyUrl": "https://site.com/privacy",
      "cookieStatementUrl": "https://site.com/cookies"
    }
  }
}
```

#### CSV sample

```
name,supportemailaddresses,isvoucherredeemable,title-en,supportphonenumbers-en,memberbenefitsurl-en,termsurl-en,privacypolicyurl-en,cookiestatementurl-en,title-es,supportphonenumbers-es,memberbenefitsurl-es,termsurl-es,privacypolicyurl-es,cookiesstatementurl-es
Test,support@test.com,false,Test-en,some html fragment,https://site.com/benefits,https://site.com/terms,https://site.com/privacy,https://site.com/cookies,Test-es,some html fragment,https://site.com/benefits,https://site.com/terms,https://site.com/privacy,https://site.com/cookies
```

#### Download Sample

You can **download** the CSV sample from [here](https://www.dropbox.com/s/85yj7czg0jaf1xx/program.csv?dl=0)

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

#### CSV Sample

```
textcolor,bgndcolor,linkscolor,accentcolor,iconbgndimageurl,logobgndimageurl,cardimageurl,homepageimage1url,homepageimage2url,homepageimage3url,homepageimage4url,splashimageurl
#ee4433,#ee4466,#eeeeee,#222222,https://images.com/icon,https://images.com/logo,https://images.com/card,https://images.com/home1,https://images.com/home2,https://images.com/home3,https://images.com/home4,https://images.com/splash
```

#### Download Sample

You can **download** the CSV sample from [here](https://www.dropbox.com/s/4tx5ytszhyl9ny8/art.csv?dl=0)

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

#### CSV sample

```
bannerimageurl,summary-en,description-en,privacyurl-en,supporturl-en,siteurl-en,upgade-en,summary-es,description-es,privacyurl-es,supporturl-es,siteurl-es,upgade-es
http://images.com/banner,some summary,some description,http://site.com/privacy,http://site.com/support,http://site.com,some upgrade en text,some summary,some description,http://site.com/privacy,http://site.com/support,http://site.com,some upgrade es text
```

#### Download Sample

You can **download** the CSV sample from [here](https://www.dropbox.com/s/adu465e4cxahz4c/store.csv?dl=0)

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
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific hotel title
	- City: a language specific hotel city
	- Country: a language specific hotel country

#### JSON sample

```json
{
  "hotels": [
    {
      "code": "MPJBR",
      "phone": "P971043901708",
      "image": "https://images.url",
      "siteUrl": "https://www.movenpick.com",
      "resUrl": "https://www.movenpick.com",
      "countryCode": "UAE",
      "latitude": 54.34,
      "longitude": 34.1,
      "languages": {
        "en": {
          "title": "Movenpick Jumeira Beach Resort (en)",
          "city": "Dubai",
          "country": "United Arab Emirates"
        },
        "es": {
          "title": "Movenpick Jumeira Beach Resort (es)",
          "city": "Dubai",
          "country": "United Arab Emirates"
        }
      }
    }
  ]
}
```

#### CSV sample

```
code,phone,image,siteurl,resurl,countrycode,latitude,longitude,title-en,city-en,country-en,title-es,city-es,country-es
MPJBR,P971043901708,https://images.url,https://www.movenpick.com,https://www.movenpick.com,UAE,54.34,34.10,Movenpick Jumeira Beach Resort (en),Dubai,United Arab Emirates,Movenpick Jumeira Beach Resort (es),Dubai,United Arab Emirates
```

*We opted to show the hotel phone number preceeded with a `P` instead of `+`. The reason is to force Excel to consider the field as text. Otherwise, Excel would format the number as exponential which looks rather odd.*

#### Download Sample

You can **download** the CSV sample from [here](https://www.dropbox.com/s/tk44lqotdaapkse/hotels.csv?dl=0)

### Outlets

The outlet content requires the following properties:

- Code: The outlet name which serves as the main identifier. Must be unique within a program. This will not be displayed....the title in specific language will be displayed instead.
- HotelCode: The associated hotel code where the outlet is located. In other words, this code is what links outlets to hotels.
- Phone: The outlet phone number to call from the app
- Image Url: PNG 620x258
- Site Url: Usually the hotel own site where they can provide more information
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific hotel title
	- City: a language specific hotel city
	- Country: a language specific hotel country
	- Cuisine: a language specific cuisine

#### JSON sample

```json
{
  "outlets": [
    {
      "code": "outlet1",
      "hotelCode": "Jumeira Beach Resort",
      "phone": "P971048889099",
      "image": "https://images.com",
      "siteUrl": "https://www.mvc.com",
      "languages": {
        "en": {
          "title": "outlet1-en",
          "city": "Dubai-en",
          "country": "UAE-en",
          "cuisine": "Lebanese-en"
        },
        "es": {
          "title": "outlet1-es",
          "city": "Dubai-es",
          "country": "UAE-es",
          "cuisine": "Lebanese-es"
        }
      }
    }
  ]
}
```

#### CSV sample

```
code,hotelcode,phone,image,siteurl,title-en,city-en,country-en,cuisine-en,title-es,city-es,country-es,cuisine-es
outlet1,MPJBR,P971048889099,https://images.com,https://www.mvc.com,outlet1-en,Dubai-en,UAE-en,Lebanese-en,outlet1-es,Dubai-es,UAE-es,Lebanese-es
```

*We opted to show the outlet phone number preceeded with a `P` instead of `+`. The reason is to force Excel to consider the field as text. Otherwise, Excel would format the number as exponential which looks rather odd.*

#### Download Sample

You can **download** the CSV sample from [here](https://www.dropbox.com/s/bwervd3axyeq62n/outlets.csv?dl=0)

### Strings

Every string in the app is tagged with a special key so it can be identified and re-purposed for different languages. The `key` therefore is an identifier to each app string and the value is language-specific actual string to be used in the app for the specific language.

#### JSON sample

```json
{
  "strings": {
    "en": {
      "some_key": "some_value_en"
    },
    "es": {
      "some_key": "some_value_es"
    }
  }
}
```

#### CSV sample

```
key,value-en,value-es
some_key,some_value_en,some_value_es
```

#### Download Sample

You can **download** the CSV sample from [here](https://www.dropbox.com/s/s3inovwy8mx8s6m/strings.csv?dl=0)

### Json

The JSON content provides the full content as JSON. We expect that this be used by IT only although it is not restricted. This allows you to convenuently send all content in one shot to be updated.

#### JSON sample

```json
{
  "name": "Test",
  "supportEmailAddresses": "support@test.com",
  "isVoucherRedeemable": false,
  "languages": {
    "en": {
      "title": "Test-en",
      "supportPhoneNumbers": "some html fragment",
      "memberBenefitsUrl": "https://site.com/benefits",
      "termsUrl": "https://site.com/terms",
      "privacyPolicyUrl": "https://site.com/privacy",
      "cookieStatementUrl": "https://site.com/cookies"
    },
    "es": {
      "title": "Test-es",
      "supportPhoneNumbers": "some html fragment",
      "memberBenefitsUrl": "https://site.com/benefits",
      "termsUrl": "https://site.com/terms",
      "privacyPolicyUrl": "https://site.com/privacy",
      "cookieStatementUrl": "https://site.com/cookies"
    }
  },
  "hotels": [
    {
      "name": "Movenpick Jumeira Beach Resort",
      "phone": "P971043901708",
      "image": "https://images.url",
      "siteUrl": "https://www.movenpick.com",
      "resUrl": "https://www.movenpick.com",
      "countryCode": "UAE",
      "latitude": 54.34,
      "longitude": 34.1,
      "languages": {
        "en": {
          "title": "Movenpick Jumeira Beach Resort (en)",
          "city": "Dubai",
          "country": "United Arab Emirates"
        },
        "es": {
          "title": "Movenpick Jumeira Beach Resort (es)",
          "city": "Dubai",
          "country": "United Arab Emirates"
        }
      }
    }
  ],
  "outlets": [
    {
      "name": "outlet1",
      "hotel": "Jumeira Beach Resort",
      "phone": "P971048889099",
      "image": "https://images.com",
      "siteUrl": "https://www.mvc.com",
      "languages": {
        "en": {
          "title": "outlet1-en",
          "city": "Dubai-en",
          "country": "UAE-en",
          "cuisine": "Lebanese-en"
        },
        "es": {
          "title": "outlet1-es",
          "city": "Dubai-es",
          "country": "UAE-es",
          "cuisine": "Lebanese-es"
        }
      }
    }
  ],
  "strings": {
    "en": {
      "some_key": "some_value_en"
    },
    "es": {
      "some_key": "some_value_es"
    }
  },
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
  },
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

#### Download Sample

You can **download** the JSON sample from [here](https://www.dropbox.com/s/kjlcd2ork2mwi08/test-json.json?dl=0)

