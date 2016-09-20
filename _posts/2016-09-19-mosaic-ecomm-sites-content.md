---
layout: post
author: "Khaled A"
title:  "Mosaic Ecommerce Sites Content Management"
date:   2016-09-19 10:12:45
summary: "A description of the new content management aspects of Ecommerce Sites"
categories: mosaic Ecommerce Sites
tags: Sites Content Management
featured_image: /images/cover.jpg
---

This article discusses the content management aspects of the Mosaic Ecommerce Sites:   

- [Motivation](#motivation)
- [Content Types](#content-types)
- [Content Management](#content-management)

## Motivation

Please refer to the [Mosaic Mobile App Content Management](http://hmccode.github.io/2016-08-13/mosaic-mobile-apps-content#motivation).

## Content Types

The site content is described in [JSON](https://en.wikipedia.org/wiki/JSON). A complete content file sample can be downloaded from [here](https://www.dropbox.com/s/d5bkg1rxem2fmvl/mpelite.json?dl=0).

In this section, we will discuss the specification for each content type. The content is made up of the following sections or types:

- [Program](#program)
- [Hotels](#hotels)
- [Outlets](#outlets)
- [Promotions](#promotions)
- [Services](#services)
- [Terms and Conditions](#terms-and-conditions)
- [Terms of Use](#terms-of-use)
- [Privacy Policy](#privacy-policy)
- [Countries](#countries)
- [Strings](#strings)
- [Pages](#pages)

### Program

The program content requires the following properties:

- Name: The program name i.e. circlem, pcme, pcasia, etc

#### JSON sample

```json
{
  "name": "PCASIA",
}
```

### Hotels

The hotel content requires the following properties:

- Code: The hotel code which serves as the main identifier. Must be unique within a program. This will not be displayed...the title in specific language will be displayed instead.
- Phone: The hotel phone number to call from the app
- Country Code: the 3-digit ISO standard for where the hotel is located i.e. UAE
- Latitude: the hotel location information to calculate distance
- Longitude: the hotel location information to calculate distance
- Star Rating: the hotel rating in number i.e. 5
- Is Featured: if true, the hotel is considered featured
- Email: reservation email
- Category: 0 or 1. 0 denotes a building where 1 denotes a resort
- Group: Hotel Grouping
- Hotel Rates: a collection of hotel rates per country. Please see an example in the sample below
- Generic1: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic2: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic3: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic4: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific hotel title
	- Image: PNG 620x258
	- Site Url: Usually the hotel own site where they can provide more information
	- Reservation Url: Usually the hotel own reservation site
	- Address: the hotel address
	- City: a language specific hotel city
	- Country: a language specific hotel country
	- Postal: the hotel postal
	- Image Galleries: a collection of images to be displayed in the hotel detail. Each gallery image has a url, a tag line and an order. The tag line is used to identify the gallery images. The app will display the tag lines if available in the order specified. 
	- Summary: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that summaries the hotel. 
	- Description: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that describes the hotel. 
	- Benefits: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that summaries the hotel benefits. 
	- Conference: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that summaries the hotel conference features. 
	- Recreation: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that summaries the hotel recreation features. 
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
      "code": "BK1000",
      "phone": "+86-23-89039999",
      "countryCode": "CHN",
      "latitude": 29.555306,
      "longitude": 106.54949,
      "starRating": "5",
      "isFeatured": false,
      "email": "chongqing@hilton.com",
      "category": 0,
      "group": "South",
      "hotelRates": {
        "chn": "PR48P1,PR48P2,PR48P3,PR48P4,PR48P5,PR48P6",
        "tha": "PR48P1",
        "mys": ""
      },
      "generic1": "",
      "generic2": "",
      "generic3": "",
      "generic4": "",
      "languages": {
        "en": {
          "title": "Hilton Chongqing",
          "image": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-CQ6.jpg",
          "siteUrl": "",
          "resUrl": "",
          "address": "Zhong Shan San Lu, Yuzhong District",
          "city": "Chongqing",
          "country": "China",
          "postal": "400015",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-CQ6.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-hiltonChongqing_6.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-hiltonChongqing_3.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-hiltonChongqing_4.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-hiltonChongqing_5.jpg",
              "tagLine": "",
              "order": 0
            }
          ],
          "summary": "Located in the vibrant CBD of Chongqing, Hilton Chongqing is ideally situated between the Yangtze and Jialing Rivers. 423 guestrooms and suites all-service international 5-star hotel is fully equipped with both Wifi and broadband internet access . Adjacent to the Liang Lu Kou subway station with 3 minutes steps away. 35 minutes ride between the hotel to the Airport, just a few kilometers away from all shopping, restaurant and entertainment areas.",
          "description": "Located in the vibrant CBD of Chongqing, Hilton Chongqing is ideally situated between the Yangtze and Jialing Rivers. 423 guestrooms and suites all-service international 5-star hotel is fully equipped with both Wifi and broadband internet access . Adjacent to the Liang Lu Kou subway station with 3 minutes steps away. 35 minutes ride between the hotel to the Airport, just a few kilometers away from all shopping, restaurant and entertainment areas.",
          "benefits": "<ul>\r\n\t<li><strong>One (1) x certificate for a Complimentary Sunday Brunch for 2 persons</strong>, valid at Café@Two in Hilton Chongqing only. Non-Transferable.Certificate is Non-Transferable. Certificate and a valid membership card must be surrendered in order to receive the benefit. Certificate is not applicable during special promotions, e.g. Valentine’s Day, Mother’s Day, Christmas and other special events as decided by the hotel. Certificate is applicable to the food portion only, not including tax, gratuity, tobacco, service charge, beverages/alcoholic beverages. Not valid for Birds’ Nest, Abalone, and Shark’s Fin, etc. Only one certificate can be used per visit per booking. Certificate is not replaceable if lost or stolen. Certificate cannot be used in conjunction with another hotel special offer, cash rebate certificate, discount or promotions. Members cannot sell certificates or memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>One (1) x certificate for a Complimentary Bottle of House Wine</strong>, valid when two or more persons dine in any participating restaurant at Hilton Chongqing with minimum expenditure of RMB 300. Non-Transferable.24 hours advance reservation is required. Certificate is Non-Transferable. Certificate and a valid membership card must be surrendered in order to receive the benefit. Member must dine in the hotel to avail of the benefit. Certificate is not replaceable if lost or stolen. Certificate is valid in conjunction with membership card dining benefit and Birthday or Anniversary Certificate, but cannot be used in conjunction with another hotel special offer, certificates, discount or promotions. Only one certificate per table/event will be accepted. Members cannot sell certificates or memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>One (1) x certificate for a Complimentary Entrance to the Fitness Centre for 2 persons</strong>, valid at Hilton Chongqing only. Transferable.Reservations must be made in advance. Certificate is Transferable and must be presented to receive the benefit. Certificate is not replaceable if lost or stolen. Certificate cannot be used in conjunction with any other hotel special offer, certificate, discount or promotion. Members cannot sell certificates or Memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>Three (3) x RMB 100 Dining Certificates</strong>, valid at China Moon Restaurant in Hilton Chongqing only. Non-Accumulation. Non-Transferable.Certificate is Non-Transferable. Certificate and a valid membership card must be surrendered in order to receive the benefit. Certificate is not applicable during special promotions, e.g. Valentine’s Day, Mother’s Day, Christmas and other special events as decided by the hotel. Certificate is applicable to the food portion only, not including tax, gratuity, tobacco, service charge, beverages/alcoholic beverages. Not valid for Birds’ Nest, Abalone, and Shark’s Fin, etc. Only one certificate can be used per visit per booking. Certificate is not replaceable if lost or stolen. Valid in conjunction with membership card dining benefit (membership card dining benefit applies after the certificate has been deducted). Certificate cannot be used in conjunction with other discount, certificates or special promotions. Members cannot sell certificates or memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>Ten (10) x RMB 100 Dining Certificates</strong>, valid when two or more persons dine at Café@Two in Hilton Chongqing, valid for dinner buffet only, not valid for a-la-carte. Non-Accumulation. Transferable.Certificate is Transferable. Certificate must be surrendered in order to receive the benefit. Certificate is not applicable during special promotions, e.g. Valentine’s Day, Mother’s Day, Christmas and other special events as decided by the hotel. Certificate is applicable to the food portion only, not including tax, gratuity, tobacco, service charge, beverages/alcoholic beverages. Only one certificate can be used per visit per table. Certificate is not replaceable if lost or stolen. Valid in conjunction with membership card dining benefit (membership card dining benefit applies after the certificate has been deducted). Certificate cannot be used in conjunction with other discount, certificates or special promotions. Members cannot sell certificates or memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>Two (2) x certificates for a Complimentary Entrance to the Fitness Centre for 2 persons</strong>, valid at Hilton Chongqing only. Transferable. Will not be entitled to free parking.Reservations must be made in advance. Certificate is Transferable and must be presented to receive the benefit. Certificate is not replaceable if lost or stolen. Certificate cannot be used in conjunction with any other hotel special offer, certificate, discount or promotion. Members cannot sell certificates or Memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n</ul>",
          "conference": "",
          "recreation": "",
          "generic1": "",
          "generic2": "",
          "generic3": "",
          "generic4": ""
        },
        "th": {
          "title": "ฮิลตัน ฉงชิ่ง",
          "image": "https://mosaicapi.blob.core.windows.net/images/pcasia-th-CQ6.jpg",
          "siteUrl": "",
          "resUrl": "",
          "address": "จง ชัน ซัน ลู่ อำเภอหยูจง",
          "city": "Chongqing",
          "country": "China",
          "postal": "400015",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-th-CQ6.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-th-hiltonChongqing_6.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-th-hiltonChongqing_3.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-th-hiltonChongqing_4.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-th-hiltonChongqing_5.jpg",
              "tagLine": "",
              "order": 0
            }
          ],
          "summary": "ผ่อนคลายตัวคุณเองไปกับโรงแรมฮิลตัน ฉงชิ่ง ด้วยรางวัลชนะเลิศด้านอาหารที่ห้องอาหารคาเฟ่แอ๊ดทู และปล่อยอารมณ์ไปกับคลาวด์ 9 สปา โดยขับรถเพียงแค่ 3 นาที จากเรนมิน สแควร์ ซึ่งสถานที่ท่องเที่ยวของฉงชิ่งนั้นมีอยู่มากมาย อีกทั้งยังมีโรงยิมและสระว่ายน้ำชั้นบนสุด",
          "description": "ผ่อนคลายตัวคุณเองไปกับโรงแรมฮิลตัน ฉงชิ่ง ด้วยรางวัลชนะเลิศด้านอาหารที่ห้องอาหารคาเฟ่แอ๊ดทู และปล่อยอารมณ์ไปกับคลาวด์ 9 สปา โดยขับรถเพียงแค่ 3 นาที จากเรนมิน สแควร์ ซึ่งสถานที่ท่องเที่ยวของฉงชิ่งนั้นมีอยู่มากมาย อีกทั้งยังมีโรงยิมและสระว่ายน้ำชั้นบนสุด",
          "benefits": "<ul>\r\n\t<li><strong>One (1) x certificate for a Complimentary Sunday Brunch for 2 persons</strong>, valid at Café@Two in Hilton Chongqing only. Non-Transferable.Certificate is Non-Transferable. Certificate and a valid membership card must be surrendered in order to receive the benefit. Certificate is not applicable during special promotions, e.g. Valentine’s Day, Mother’s Day, Christmas and other special events as decided by the hotel. Certificate is applicable to the food portion only, not including tax, gratuity, tobacco, service charge, beverages/alcoholic beverages. Not valid for Birds’ Nest, Abalone, and Shark’s Fin, etc. Only one certificate can be used per visit per booking. Certificate is not replaceable if lost or stolen. Certificate cannot be used in conjunction with another hotel special offer, cash rebate certificate, discount or promotions. Members cannot sell certificates or memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>One (1) x certificate for a Complimentary Bottle of House Wine</strong>, valid when two or more persons dine in any participating restaurant at Hilton Chongqing with minimum expenditure of RMB 300. Non-Transferable.24 hours advance reservation is required. Certificate is Non-Transferable. Certificate and a valid membership card must be surrendered in order to receive the benefit. Member must dine in the hotel to avail of the benefit. Certificate is not replaceable if lost or stolen. Certificate is valid in conjunction with membership card dining benefit and Birthday or Anniversary Certificate, but cannot be used in conjunction with another hotel special offer, certificates, discount or promotions. Only one certificate per table/event will be accepted. Members cannot sell certificates or memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>One (1) x certificate for a Complimentary Entrance to the Fitness Centre for 2 persons</strong>, valid at Hilton Chongqing only. Transferable.Reservations must be made in advance. Certificate is Transferable and must be presented to receive the benefit. Certificate is not replaceable if lost or stolen. Certificate cannot be used in conjunction with any other hotel special offer, certificate, discount or promotion. Members cannot sell certificates or Memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>Three (3) x RMB 100 Dining Certificates</strong>, valid at China Moon Restaurant in Hilton Chongqing only. Non-Accumulation. Non-Transferable.Certificate is Non-Transferable. Certificate and a valid membership card must be surrendered in order to receive the benefit. Certificate is not applicable during special promotions, e.g. Valentine’s Day, Mother’s Day, Christmas and other special events as decided by the hotel. Certificate is applicable to the food portion only, not including tax, gratuity, tobacco, service charge, beverages/alcoholic beverages. Not valid for Birds’ Nest, Abalone, and Shark’s Fin, etc. Only one certificate can be used per visit per booking. Certificate is not replaceable if lost or stolen. Valid in conjunction with membership card dining benefit (membership card dining benefit applies after the certificate has been deducted). Certificate cannot be used in conjunction with other discount, certificates or special promotions. Members cannot sell certificates or memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>Ten (10) x RMB 100 Dining Certificates</strong>, valid when two or more persons dine at Café@Two in Hilton Chongqing, valid for dinner buffet only, not valid for a-la-carte. Non-Accumulation. Transferable.Certificate is Transferable. Certificate must be surrendered in order to receive the benefit. Certificate is not applicable during special promotions, e.g. Valentine’s Day, Mother’s Day, Christmas and other special events as decided by the hotel. Certificate is applicable to the food portion only, not including tax, gratuity, tobacco, service charge, beverages/alcoholic beverages. Only one certificate can be used per visit per table. Certificate is not replaceable if lost or stolen. Valid in conjunction with membership card dining benefit (membership card dining benefit applies after the certificate has been deducted). Certificate cannot be used in conjunction with other discount, certificates or special promotions. Members cannot sell certificates or memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n\t<li><strong>Two (2) x certificates for a Complimentary Entrance to the Fitness Centre for 2 persons</strong>, valid at Hilton Chongqing only. Transferable. Will not be entitled to free parking.Reservations must be made in advance. Certificate is Transferable and must be presented to receive the benefit. Certificate is not replaceable if lost or stolen. Certificate cannot be used in conjunction with any other hotel special offer, certificate, discount or promotion. Members cannot sell certificates or Memberships via third party channels. Certificate is only valid upon Finance‘s certified stamp.</li>\r\n</ul>",
          "conference": "",
          "recreation": "",
          "generic1": "",
          "generic2": "",
          "generic3": "",
          "generic4": ""
        },
        "zh": {
          "title": "重庆希尔顿酒店",
          "image": "https://mosaicapi.blob.core.windows.net/images/pcasia-zh-CQ6.jpg",
          "siteUrl": "",
          "resUrl": "",
          "address": "中国重庆市渝中区 中山三路139号",
          "city": "Chongqing",
          "country": "China",
          "postal": "400015",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-zh-CQ6.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-zh-hiltonChongqing_6.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-zh-hiltonChongqing_3.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-zh-hiltonChongqing_4.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-zh-hiltonChongqing_5.jpg",
              "tagLine": "",
              "order": 0
            }
          ],
          "summary": "重庆希尔顿酒店是全城最具性价比和服务实力的五星级国际品酒店，坐落於交通枢纽的渝中区两路口，步行3分钟可达两路口地铁，为商务，休闲及会议客人的不二之选。",
          "description": "重庆希尔顿酒店是全城最具性价比和服务实力的五星级国际品酒店，坐落於交通枢纽的渝中区两路口，步行3分钟可达两路口地铁，为商务，休闲及会议客人的不二之选。",
          "benefits": "<ul>\r\n\t<li><strong>一(1)张免费双人周日早午餐礼券</strong>，仅限在重庆希尔顿酒店的Café@Two全日制西餐厅使用。不可转让。本礼券不可转让。出示礼券和有效会员卡方可获得优惠。不适用于由酒店定义的特殊推广期，例如：情人节，母亲节和圣诞节等。礼券仅适用于食品部分，不包含税款、小费、香烟，服务费，各类饮料及酒类。不适用于鱼翅、燕窝、鲍鱼等贵重食材。按帐面，礼券仅对一张会员卡有效。按台面，礼券亦仅对一张会员卡有效。礼券如有遗失或被盗，恕不补发。此优惠不可与酒店其他促销，现金抵用券，折扣或推广促销联合使用。会员不可通过第三方渠道出售礼券或会员资格。本礼券需加盖指定财务章方可使用。</li>\r\n\t<li><strong>一(1)张免费葡萄酒礼券</strong>，凭券两位或以上客人在重庆希尔顿酒店参与活动餐厅用餐且消费金额满300元时，可免费获赠酒店特选葡萄酒一瓶。不可转让。需提前24小时预订。本礼券不可转让。出示礼券和有效会员卡方可获得优惠。必须在酒店用餐方可获得优惠。礼券如有遗失或被盗，恕不补发。礼券可与会员卡用餐折扣优惠和生日或纪念日礼券同时使用，但不可与酒店其他促销，礼券，折扣或推广促销联合使用。每桌/每次活动限用一张礼券。会员不可通过第三方渠道出售礼券或会员资格。本礼券需加盖指定财务章方可使用。</li>\r\n\t<li><strong>一(1)张双人健身中心免费体验礼券</strong>，仅限在重庆希尔顿酒店使用。可以转让。需提前预订。本礼券可以转让，出示礼券方可获得优惠。礼券如有遗失或被盗，恕不补发。本礼券不能与其它酒店特别优惠、礼券、折扣或促销同时使用。会员不得通过第三方渠道出售礼券或会员资格。 本礼券需加盖指定财务章方可使用。</li>\r\n\t<li><strong>三(3)张各价值人民币100元的现金礼券</strong>，仅限在重庆希尔顿酒店的醉月厅中餐厅使用。不可累加使用。不可转让。本礼券不可转让。出示礼券和有效会员卡方可获得优惠。不适用于由酒店定义的特殊推广期，例如：情人节，母亲节和圣诞节等。礼券仅适用于食品部分，不包含税款、小费、香烟，服务费，各类饮料及酒类。不适用于鱼翅、燕窝、鲍鱼等贵重食材。按帐面，礼券仅对一张会员卡有效。按台面，礼券亦仅对一张会员卡有效。礼券如有遗失或被盗，恕不补发。可与会员卡用餐折扣优惠同时使用(先抵扣礼券后打折)。不可与其他折扣，礼券或特殊优惠同时使用。会员不可通过第三方渠道出售礼券或会员资格。本礼券需加盖指定财务章方可使用。</li>\r\n\t<li><strong>十(10)张各价值人民币100元的现金礼券</strong>，两人或以上在重庆希尔顿酒店的Café@Two全日制西餐厅用餐时，凭此礼券可等同于100元人民币现金使用，抵扣用餐帐单，仅适用于晚餐自助餐，不适用于零点菜单。不可累加使用。可以转让。本礼券可以转让。出示礼券方可获得优惠。不适用于由酒店定义的特殊推广期，例如：情人节，母亲节和圣诞节等。礼券仅适用于食品部分，不包含税款、小费、香烟，服务费，各类饮料及酒类。每次用餐每桌仅可使用一张礼券。礼券如有遗失或被盗，恕不补发。可与会员卡用餐折扣优惠同时使用(先抵扣礼券后打折)。不可与其他折扣，礼券或特殊优惠同时使用。会员不可通过第三方渠道出售礼券或会员资格。本礼券需加盖指定财务章方可使用。</li>\r\n\t<li><strong>两(2)张双人健身中心免费体验礼券</strong>，仅限在重庆希尔顿酒店使用。可以转让。使用本券不可同时享受免费停车服务。需提前预订。本礼券可以转让，出示礼券方可获得优惠。礼券如有遗失或被盗，恕不补发。本礼券不能与其它酒店特别优惠、礼券、折扣或促销同时使用。会员不得通过第三方渠道出售礼券或会员资格。 本礼券需加盖指定财务章方可使用。</li>\r\n</ul>",
          "conference": "",
          "recreation": "",
          "generic1": "",
          "generic2": "",
          "generic3": "",
          "generic4": ""
        },
        "tw": {
          "title": "重慶希爾頓酒店",
          "image": "https://mosaicapi.blob.core.windows.net/images/pcasia-tw-CQ6.jpg",
          "siteUrl": "",
          "resUrl": "",
          "address": "中國重慶市渝中區中山三路139號",
          "city": "Chongqing",
          "country": "China",
          "postal": "400015",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-tw-CQ6.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-tw-hiltonChongqing_6.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-tw-hiltonChongqing_3.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-tw-hiltonChongqing_4.jpg",
              "tagLine": "",
              "order": 0
            },
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-tw-hiltonChongqing_5.jpg",
              "tagLine": "",
              "order": 0
            }
          ],
          "summary": "重慶希爾頓酒店是全城最具性價比和服務實力的五星級國際品酒店，坐落於交通樞紐的渝中區兩路口，步行3分鐘可達兩路口地鐵，為商務，休閑及會議客人的不二之選。",
          "description": "重慶希爾頓酒店是全城最具性價比和服務實力的五星級國際品酒店，坐落於交通樞紐的渝中區兩路口，步行3分鐘可達兩路口地鐵，為商務，休閑及會議客人的不二之選。",
          "benefits": "<ul>\r\n\t<li><strong>一張免費雙人周日早午餐禮券</strong>，僅限在重慶希爾頓酒店的Café@Two全日制西餐廳使用。不可轉讓。本禮券不可轉讓。出示禮券和有效會員卡方可獲得優惠。不適用于由酒店定義的特殊推廣期，例如：情人節，母親節和聖誕節等。禮券僅適用于食品部分，不包含稅款、小費、香煙，服務費，各類飲料及酒類。不適用于魚翅、燕窩、鮑魚等貴重食材。按帳面，禮券僅對壹張會員卡有效。按台面，禮券亦僅對壹張會員卡有效。禮券如有遺失或被盜，恕不補發。此優惠不可與酒店其他促銷，現金抵用券，折扣或推廣促銷聯合使用。會員不可通過第三方渠道出售禮券或會員資格。本禮券需加蓋指定財務章方可使用。</li>\r\n\t<li><strong>一張免費葡萄酒禮券</strong>，憑券兩位或以上客人在重慶希爾頓酒店參與活動餐廳用餐且消費金額滿300元時，可免費獲贈酒店特選葡萄酒壹瓶。不可轉讓。需提前24小時預訂。本禮券不可轉讓。出示禮券和有效會員卡方可獲得優惠。必須在酒店用餐方可獲得優惠。禮券如有遺失或被盜，恕不補發。禮券可與會員卡用餐折扣優惠和生日或紀念日禮券同時使用，但不可與酒店其他促銷，禮券，折扣或推廣促銷聯合使用。每桌/每次活動限用壹張禮券。會員不可通過第三方渠道出售禮券或會員資格。本禮券需加蓋指定財務章方可使用。</li>\r\n\t<li><strong>一張雙人健身中心免費體驗禮券</strong>，僅限在重慶希爾頓酒店使用。可以轉讓。需提前預訂。本禮券可以轉讓，出示禮券方可獲得優惠。禮券如有遺失或被盜，恕不補發。本禮券不能與其它酒店特別優惠、禮券、折扣或促銷同時使用。會員不得通過第三方渠道出售禮券或會員資格。 本禮券需加蓋指定財務章方可使用。</li>\r\n\t<li><strong>三(3)張各價值人民幣100元的現金禮券</strong>，僅限在重慶希爾頓酒店的醉月廳中餐廳使用。不可累加使用。不可轉讓。本禮券不可轉讓。出示禮券和有效會員卡方可獲得優惠。不適用于由酒店定義的特殊推廣期，例如：情人節，母親節和聖誕節等。禮券僅適用于食品部分，不包含稅款、小費、香煙，服務費，各類飲料及酒類。不適用于魚翅、燕窩、鮑魚等貴重食材。按帳面，禮券僅對壹張會員卡有效。按台面，禮券亦僅對壹張會員卡有效。禮券如有遺失或被盜，恕不補發。可與會員卡用餐折扣優惠同時使用(先抵扣禮券後打折)。不可與其他折扣，禮券或特殊優惠同時使用。會員不可通過第三方渠道出售禮券或會員資格。本禮券需加蓋指定財務章方可使用。</li>\r\n\t<li><strong>十(10)張各價值人民幣100元的現金禮券</strong>，兩人或以上在重慶希爾頓酒店的Café@Two全日制西餐廳用餐時，憑此禮券可等同於100元人民幣現金使用，抵扣用餐帳單，僅適用​​於晚餐自助餐，不適用於零點菜單。不可累加使用。可以轉讓。\r\n\t本禮券可以轉讓。出示禮券方可獲得優惠。不適用於由酒店定義的特殊推廣期，例如：情人節，母親節和聖誕節等。禮券僅適用於食品部分，不包含稅款、小費、香煙，服務費，各類飲料及酒類。每次用餐每桌僅可使用一張禮券。禮券如有遺失或被盜，恕不補發。可與會員卡用餐折扣優惠同時使用(先抵扣禮券後打折)。不可與其他折扣，禮券或特殊優惠同時使用。會員不可通過第三方渠道出售禮券或會員資格。本禮券需加蓋指定財務章方可使用。</li>\r\n\t<li><strong>兩(2)張雙人健身中心免費體驗禮券</strong>，僅限在重慶希爾頓酒店使用。可以轉讓。使用本券不可同時享受免費停車服務。\r\n\t需提前預訂。本禮券可以轉讓，出示禮券方可獲得優惠。禮券如有遺失或被盜，恕不補發。本禮券不能與其它酒店特別優惠、禮券、折扣或促銷同時使用。會員不得通過第三方渠道出售禮券或會員資格。本禮券需加蓋指定財務章方可使用。</li>\r\n</ul>",
          "conference": "",
          "recreation": "",
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

### Outlets

The outlet content requires the following properties:

- Code: The outlet name which serves as the main identifier. Must be unique within a program. This will not be displayed....the title in specific language will be displayed instead.
- HotelCode: The associated hotel code where the outlet is located. In other words, this code is what links outlets to hotels.
- Phone: The outlet phone number to call from the app
- Country Code: the 3-digit ISO standard for where the outlet is located i.e. UAE
- Reservation Email: the outlet reservation email
- Generic1: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic2: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic3: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Generic4: A generic field that can be used in case it is needed for some apps. By default this should be empty.
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific hotel title
	- Image Url: PNG 620x258
	- Site Url: Usually the hotel own site where they can provide more information
	- Address: a language specific outlet address
	- City: a language specific hotel city
	- Country: a language specific hotel country
	- Cuisine: a language specific cuisine
	- Attire: a language specific attire
	- Image Galleries: a collection of images to be displayed in the outlet detail. Each gallery image has a url, a tag line and an order. The tag line is used to identify the gallery images. The app will display the tag lines if available in the order specified. 
	- Summary: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that summarizes the outlet.
	- Description: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that describes the outlet. 
	- Benefits: a [Markdown](https://en.wikipedia.org/wiki/Markdown) snippet that describes the outlet's benefits. 
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
    {
      "code": "BK2000",
      "hotelCode": "BK1000",
      "phone": "+86-23-89039999",
      "countryCode": "CHN",
      "reservationEmail": "",
      "generic1": "",
      "generic2": "",
      "generic3": "",
      "generic4": "",
      "languages": {
        "en": {
          "title": "Café@Two",
          "image": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-r_hiltonChongqing_1.jpg",
          "siteUrl": "",
          "address": "Zhong Shan San Lu, Yuzhong District",
          "city": "Chongqing",
          "country": "China",
          "cuisine": "International",
          "attire": "",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-r_hiltonChongqing_1.jpg",
              "tagLine": "",
              "order": 0
            }
          ],
          "summary": "",
          "description": "",
          "benefits": "",
          "operatingHours": "Monday to Sunday 6:00 AM to 11:00 PM",
          "generic1": "",
          "generic2": "",
          "generic3": "",
          "generic4": ""
        },
        "th": {
          "title": "คาเฟ่ แอ๊ดทู",
          "image": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-r_hiltonChongqing_1.jpg",
          "siteUrl": "",
          "address": "จง ชัน ซัน ลู่ อำเภอหยูจง",
          "city": "Chongqing",
          "country": "China",
          "cuisine": "อินเตอร์เนชั่นแนล",
          "attire": "",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-r_hiltonChongqing_1.jpg",
              "tagLine": "",
              "order": 0
            }
          ],
          "summary": "",
          "description": "",
          "benefits": "",
          "operatingHours": "เปิดให้บริการทุกวัน 6.00 – 23.00 น",
          "generic1": "",
          "generic2": "",
          "generic3": "",
          "generic4": ""
        },
        "zh": {
          "title": "Café@Two西餐厅",
          "image": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-r_hiltonChongqing_1.jpg",
          "siteUrl": "",
          "address": "中国重庆市渝中区 中山三路139号",
          "city": "Chongqing",
          "country": "China",
          "cuisine": "",
          "attire": "",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-r_hiltonChongqing_1.jpg",
              "tagLine": "",
              "order": 0
            }
          ],
          "summary": "",
          "description": "",
          "benefits": "",
          "operatingHours": "每日6:00至23:00",
          "generic1": "",
          "generic2": "",
          "generic3": "",
          "generic4": ""
        },
        "tw": {
          "title": "Café@Two西餐廳",
          "image": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-r_hiltonChongqing_1.jpg",
          "siteUrl": "",
          "address": "中國重慶市渝中區中山三路139號",
          "city": "Chongqing",
          "country": "China",
          "cuisine": "",
          "attire": "",
          "galleryImages": [
            {
              "url": "https://mosaicapi.blob.core.windows.net/images/pcasia-en-r_hiltonChongqing_1.jpg",
              "tagLine": "",
              "order": 0
            }
          ],
          "summary": "",
          "description": "",
          "benefits": "",
          "operatingHours": "每日6:00至23:00",
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

### Promotions

The promotion content requires the following properties:

- Name: The promotion name.
- HotelCode: The associated hotel code where the outlet is located. In other words, this code is what links outlets to hotels.
- Hotel: The associated hotel
- Start Date: the start date of the promotion
- End Date: the end date of the promotion
- Is Date Range: if true, the promotion is subjected to the date range above
- External URL: If provided, the site can make this an external link to allow members to see more details.
- Image Galleries: a collection of images to be displayed in the outlet detail. Each gallery image has a url, a tag line and an order. The tag line is used to identify the gallery images. The app will display the tag lines if available in the order specified. 
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific promotion title
	- Header: a language specific promotion header
	- Summary: a language specific promotion summary
	- Decription: a language specific promotion description
	- Disclaimer: a language specific promotion Disclaimer
	- Terms: a language specific promotion terms
	- Country: a language specific promotion applicable country

Please note that promotion images (whether listing or gallery) must comply with the following:

* Size - 200 KB max
* Resolution - 72 DPI. DPI stands for Dots Per Inch which technically means printer dots per inch. Today it is a term often misused, usually to mean PPI, which stands for Pixels Per Inch. So when someone says they want a photo that is 300 dpi they really mean that they want 300 ppi. 
* Orientation - Landscape ....not portrait 
* Dimensions - the bigger the better. 

*Please note that, most likely, promotions will be changed to read directly from the HMC Offers server. This will make them dynamic and there will be no need to input the manually here in content.*

#### JSON sample

```json
{
  "promotions": [
    {
      "name": "",
      "hotelCode": "",
      "hotel": "DoubleTree by Hilton Chongqing North ",
      "startDate": "2016-03-31T20:00:00+00:00",
      "endDate": "2016-09-29T20:00:00+00:00",
      "isDateRange": true,
      "externalUrl": "",
      "galleryImages": [
        {
          "url": "https://mosaicapi.blob.core.windows.net/images/f21d88b3-b975-45f2-af53-34e50c3659e6.jpg",
          "tagLine": "",
          "order": 0
        }
      ],
      "languages": {
        "en": {
          "title": "Hilton Premium Club Members enjoy Brazilian Food Festival <br>Dinner Buffet",
          "header": "DoubleTree by Hilton Chongqing North",
          "summary": "",
          "description": "This season, we've brought the hot flavor from Brazil to Flavors All Day Dining Restaurant.  Every night you can enjoy Brazilian food ranging from Brazilian BBQ Skewers, Brazilian Stewed Pork with Dark Beans, and Brazilian Deep-fried Cheese Dumpling to fresh seafood, supplied daily by air, along with unlimited <br>Haagen-Dazs ice cream, bottomless beverages and Chef's signature dish of Homemade Smoked Salmon.Bon Appétit!<br><br>RMB 258/per person+15% service charge<br><br>Valid: July 1, 2016 to September 30, 2016<br>Venue: Flavors All Day Dining Restaurant, 2F<br><br>Hilton Premium Club Members enjoy RMB 178net/per person<br><br>*This special offer is not conjunct used with other special offer or discount<br>*Must book one day in advance.<br><br>For more information or reservation, please call 023 6776 8356.",
          "disclaimer": "",
          "terms": "",
          "country": "chn"
        },
        "zh": {
          "title": "希尔顿卓越俱乐部会员惠享巴西美食自助之夜",
          "header": "重庆江北希尔顿逸林酒店",
          "summary": "",
          "description": "本季，品味全日制餐厅为您打造活力热辣的巴西风情，感受来自南美洲的特色美食。巴西烤串、巴西黑豆炖肉、巴西炸芝士饺，饕餮海鲜每日新鲜空运，免费无限量畅食哈根达斯冰淇淋，畅饮进口红酒、本地啤酒及软饮，更有大厨招牌自制烟熏三文鱼闪亮登场，保证令您大快朵颐。<br><br>人民币258元/每位+15%服务费<br><br>推广时间：2016年7月1日至2016年9月30日 <br>地点： 品味全日制餐厅，2F<br>希尔顿卓越俱乐部会员享178元净价/每位<br><br>*此优惠不得与其他优惠或折扣同时使用<br>*敬请提前一天预订<br><br>了解更多或预订，请致电 023 6776 8356。",
          "disclaimer": "",
          "terms": "",
          "country": "chn"
        },
        "tw": {
          "title": "希爾頓卓越俱樂部會員惠享巴西美食自助之夜",
          "header": "重慶江北希爾頓逸林酒店 ",
          "summary": "",
          "description": "本季，品味全日制餐廳為您打造活力熱辣的巴西風情，感受來自南美洲的特色美食。巴西烤串、巴西黑豆燉肉、巴西炸芝士餃，饕餮海鮮每日新鮮空運，免費無限量暢食哈根達斯霜淇淋，暢飲進口紅酒、本地啤酒及軟飲，更有大廚招牌自製煙熏三文魚閃亮登場，保證令您大快朵頤。<br><br>人民幣258元/每位元+15%服務費<br><br>推廣時間：2016年7月1日至2016年9月30日 <br>地點： 品味全日制餐廳，2F<br>希爾頓卓越俱樂部會員享178元淨價/每位<br><br>*此優惠不得與其他優惠或折扣同時使用<br>*敬請提前一天預訂<br><br>瞭解更多或預訂，請致電 023 6776 8356。",
          "disclaimer": "",
          "terms": "",
          "country": "chn"
        },
        "th": {
          "title": "Hilton Premium Club Members enjoy Brazilian Food Festival <br>Dinner Buffet",
          "header": "DoubleTree by Hilton Chongqing North",
          "summary": "",
          "description": "This season, we've brought the hot flavor from Brazil to Flavors All Day Dining Restaurant.  Every night you can enjoy Brazilian food ranging from Brazilian BBQ Skewers, Brazilian Stewed Pork with Dark Beans, and Brazilian Deep-fried Cheese Dumpling to fresh seafood, supplied daily by air, along with unlimited <br>Haagen-Dazs ice cream, bottomless beverages and Chef's signature dish of Homemade Smoked Salmon.Bon Appétit!<br><br>RMB 258/per person+15% service charge<br><br>Valid: July 1, 2016 to September 30, 2016<br>Venue: Flavors All Day Dining Restaurant, 2F<br><br>Hilton Premium Club Members enjoy RMB 178net/per person<br><br>*This special offer is not conjunct used with other special offer or discount<br>*Must book one day in advance.<br><br>For more information or reservation, please call 023 6776 8356.",
          "disclaimer": "",
          "terms": "",
          "country": "chn"
        }
      }
    }
  ]
}
```

### Services

The service content requires the following properties:

- Name: the service name.
- Phone: the service contact phone number
- Mobile Phone: the service contact mobile phone number
- Email Address: the service contact email address
- Site: Externak site to show more details about the service
- Image Galleries: a collection of images to be displayed in the outlet detail. Each gallery image has a url, a tag line and an order. The tag line is used to identify the gallery images. The app will display the tag lines if available in the order specified. 
- Language bound properties (the following properties are language specific and should be available for each desired language):
	- Title: a language specific promotion title
	- Summary: a language specific promotion summary
	- Decription: a language specific promotion description

Please note that service images (whether listing or gallery) must comply with the following:

* Size - 200 KB max
* Resolution - 72 DPI. DPI stands for Dots Per Inch which technically means printer dots per inch. Today it is a term often misused, usually to mean PPI, which stands for Pixels Per Inch. So when someone says they want a photo that is 300 dpi they really mean that they want 300 ppi. 
* Orientation - Landscape ....not portrait 
* Dimensions - the bigger the better. 

#### JSON sample

```json
{
  "services": [
    {
      "name": "",
      "phone": "",
      "mobilePhone": "",
      "email": "",
      "Site": "",
      "galleryImages": [
        {
          "url": "https://mosaicapi.blob.core.windows.net/images/f21d88b3-b975-45f2-af53-34e50c3659e6.jpg",
          "tagLine": "",
          "order": 0
        }
      ],
      "languages": {
        "en": {
          "title": "Blah",
          "summary": "Blah",
          "description": "Blah blah"
        },
        "es": {
          "title": "Blah",
          "summary": "Blah",
          "description": "Blah blah"
        }
      }
    }
  ]
}
```

### Benefits

The benefit content requires the following properties:

- Name: The benefit name.
- Country bound properties (the following properties are country specific and should be available for each desired country):
	- Language bound properties (the following properties are language specific and should be available for each desired language):
		- Title: a language specific benefit title
		- Summary: a language specific benefit summary
		- Decription: a language specific benefit description

#### JSON sample

```json
{
  "benefits": {
    "name": "some name",
    "countries": {
      "chn": {
        "en": {
          "title": "MEMBER BENEFITS",
          "description": "## HILTON PREMIUM CLUB DINING BENEFITS\r\n\r\nUpon presentation of your Hilton Premium Club membership card, you will be entitled to the following dining benefits at all participating hotels and outlets:\r\n\r\n - **Twenty five per cent (25%) discount off the total food and beverage bill for up to a maximum group size of 1 to 12 persons dining.** Taxes and service charge are not included in the discount. Valid for Private Dining. Non-Transferable. Black-out dates apply on Chinese New Year’s Eve and New Year’s Eve.",
          "summary": "Experiences that only come from Hilton Premium Club \r\n\r\n - 25% discount on the total food and beverage bill for up to a maximum group size of 12 persons dining \r\n - 15% discount on cakes and pastries \r\n - 20% discount on Flexible Rate for Direct Bookings at participating Hilton Worldwide Hotels in Greater China (Plus, a 10% discount on the Flexible Rate for an upgrade to an Executive Floor) "
        },
        "zh": {
          "title": "会员优惠",
          "description": "## 希尔顿卓越俱乐部用餐优惠\r\n出示您的希尔顿卓越俱乐部会员卡，您可在所有参与活动的酒店和餐饮场所享受以下用餐优惠：\r\n持卡者与他人共同用餐，总人数不超过12人，可享餐饮消费总额**七五折优惠**，税款和服务费除外。包房同样适用。不可转让。\r\n中国新年除夕和公历新年除夕不适用。\r\n餐饮优惠同样适用于酒廊与酒吧，但整瓶酒水和葡萄酒除外。\r\n在大中华区所有参与活动的酒店点心店购买蛋糕和糕点，可享**八五折优惠**，税款和服务费除外。不可转让。\r\n若要预订，请致电 +86 400 830 7100 联系希尔顿卓越俱乐部。\r\n* 具体用餐折扣的使用条款，请参阅《条款与条件》的“用餐”部分。\r\n\r\n##希尔顿卓越俱乐部住宿优惠",
          "summary": "**来自希尔顿卓越俱乐部的非凡体验** \r\n\r\n - **餐饮消费总额25%折扣** – 适用于持卡者与他人共同用餐，总人数不超过12人 \r\n- **蛋糕及西餅15%折扣** \r\n- **弹性房价20%折扣** 全年适用于所有大中华地区参与酒店（如需升级至行政客房，可享受弹性房价九折优惠）\r\n- 现金礼券用于支付住房和用餐 \r\n- 住房礼券在购买会籍的酒店享受一晚免费住宿 \r\n- 享有水疗及健身中心额外折扣优惠 \r\n- 您的希尔顿卓越俱乐部会员卡可在中国的30多家酒店使用 \r\n\r\n\r\n 点击[这里](MembershipBenefits?country=CHN&id=CHN)查看详细。<br>[会员条款与条件](TermsAndConditions?id=CHN) <br> [加入希尔顿荣誉客会](http://www.hhonors.com.cn/)"
        },
      },
      "mys": {
        "en": {
          "title": "MEMBER BENEFITS",
          "description": "## HILTON PREMIUM CLUB DINING BENEFITS\r\n\r\nUpon presentation of your Hilton Premium Club membership card, you will be entitled to the following dining benefits at all participating hotels and outlets:\r\n\r\n - **Twenty five per cent (25%) discount off the total food and beverage bill for up to a maximum group size of 1 to 12 persons dining.** Taxes and service charge are not included in the discount. Valid for Private Dining. Non-Transferable. Black-out dates apply on Chinese New Year’s Eve and New Year’s Eve.",
          "summary": "Experiences that only come from Hilton Premium Club \r\n\r\n - 25% discount on the total food and beverage bill for up to a maximum group size of 12 persons dining \r\n - 15% discount on cakes and pastries \r\n - 20% discount on Flexible Rate for Direct Bookings at participating Hilton Worldwide Hotels in Greater China (Plus, a 10% discount on the Flexible Rate for an upgrade to an Executive Floor) "
        },
        "zh": {
          "title": "会员优惠",
          "description": "## 希尔顿卓越俱乐部用餐优惠\r\n出示您的希尔顿卓越俱乐部会员卡，您可在所有参与活动的酒店和餐饮场所享受以下用餐优惠：\r\n持卡者与他人共同用餐，总人数不超过12人，可享餐饮消费总额**七五折优惠**，税款和服务费除外。包房同样适用。不可转让。\r\n中国新年除夕和公历新年除夕不适用。\r\n餐饮优惠同样适用于酒廊与酒吧，但整瓶酒水和葡萄酒除外。\r\n在大中华区所有参与活动的酒店点心店购买蛋糕和糕点，可享**八五折优惠**，税款和服务费除外。不可转让。\r\n若要预订，请致电 +86 400 830 7100 联系希尔顿卓越俱乐部。\r\n* 具体用餐折扣的使用条款，请参阅《条款与条件》的“用餐”部分。\r\n\r\n##希尔顿卓越俱乐部住宿优惠",
          "summary": "**来自希尔顿卓越俱乐部的非凡体验** \r\n\r\n - **餐饮消费总额25%折扣** – 适用于持卡者与他人共同用餐，总人数不超过12人 \r\n- **蛋糕及西餅15%折扣** \r\n- **弹性房价20%折扣** 全年适用于所有大中华地区参与酒店（如需升级至行政客房，可享受弹性房价九折优惠）\r\n- 现金礼券用于支付住房和用餐 \r\n- 住房礼券在购买会籍的酒店享受一晚免费住宿 \r\n- 享有水疗及健身中心额外折扣优惠 \r\n- 您的希尔顿卓越俱乐部会员卡可在中国的30多家酒店使用 \r\n\r\n\r\n 点击[这里](MembershipBenefits?country=CHN&id=CHN)查看详细。<br>[会员条款与条件](TermsAndConditions?id=CHN) <br> [加入希尔顿荣誉客会](http://www.hhonors.com.cn/)"
      }
    }
  }
}
```

### Terms and Conditions

The terms and conditions content requires similar properties to benefits.

#### JSON sample

```json
{
  "termsNConditions": {
    "name": "some name",
    "countries": {
      "chn": {
        "en": {
          "title": "TERMS AND CONDITIONS",
          "description": "<ul><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=CHN\">Hilton Premium Club Terms &amp; Conditions in China</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=THA\">Hilton Premium Club Terms &amp; Conditions in Thailand</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=MYS\"> Hilton Premium Club Terms &amp; Conditions in Malaysia</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=HKG\"> Premium Club Terms & Conditions in Hong Kong</a></li><p></p></ul><h4>Website Terms of Use</h4><p>In these terms and conditions, a reference to ‘Hospitality Marketing Concepts, (“HMC”) or ‘we’ means a reference to Hospitality Marketing Concepts LLC and any of its related bodies corporate from time to time.<br>This web site is offered to you, the User, conditioned on your acceptance without modification of the terms,....</p>",
          "summary": "<ul><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=CHN\">Hilton Premium Club Terms &amp; Conditions in China</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=THA\">Hilton Premium Club Terms &amp; Conditions in Thailand</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=MYS\"> Hilton Premium Club Terms &amp; Conditions in Malaysia</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=HKG\"> Premium Club Terms & Conditions in Hong Kong</a></li><p></p></ul><h4>Website Terms of Use</h4><p>In these terms and conditions, a reference to ‘Hospitality Marketing Concepts, (“HMC”) or ‘we’ means a reference to Hospitality Marketing Concepts LLC and any of its related bodies corporate from time to time.<br>This web site is offered to you, ...</p>"
        },
        "zh": {
          "title": "条款与条件",
          "description": "<ul><li><a href=\"TermsAndConditions?id=china\">希尔顿卓越俱乐部条款与条件(中国地区)</a></li><li><a href=\"TermsAndConditions?id=thailand\">希尔顿卓越俱乐部条款与条件(泰国地区)</a></li><li><a href=\"TermsAndConditions?id=malaysia\">希尔顿卓越俱乐部条款与条件(马来西亚地区)</a></li><li><a href=\"TermsAndConditions?id=hongkong\"> 卓越俱樂部條款與條件(香港地区)</a></li></ul><h4>网站使用条款</h4><p>在此等条款及细则中，「酒店业市场策划咨询（「HMC」）」或「我们」是指酒店业市场策划咨询（上海）有限公司及其不时更新的任何相关法人团体。 </p><p>阁下进入并使用本网站时，必须遵守相关条款、细则及通告，不得作出任何修改。使用本网站即代表阁下接受此等网站使用条款、细则及通告。 </p><p>本网站包括但不限于内容、可用时间，以及存取或使用所需的设备，且此等内容、可用时间以及存取或使用所需的设备可随时变更或终止，无需另行通知。 </p><p>此等条款及细则可随时变更，且此等更改于网站上公布后即时生效。于上述通告发布后使用网站，即代表阁下同意接受此变更。 </p><h4></p>",
          "summary": "<ul><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=china\">希尔顿卓越俱乐部条款与条件(中国地区)</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=thailand\">希尔顿卓越俱乐部条款与条件(泰国地区)</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=malaysia\">希尔顿卓越俱乐部条款与条件(马来西亚地区)</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=hongkong\"> 卓越俱乐部条款与条件(香港地区)</a></li></ul><h4>网站使用条款</h4><p>在此等条款及细则中，「酒店业市场策划咨询（「HMC」）」或「我们」是指酒店业市场策划咨询（上海）有限公司及其不时更新的任何相关法人团体。 </p><p>阁下进入并使用本网站时，必须遵守相关条款、细则及通告，不得作出任何修改。使用本网站即代表阁下接受此等网站使用条款、细则及通告。 </p><p>本网站包括但不限于内容、可用时间，以及存取或使用所需的设备，且此等内容、可用时间以及存取或使用所需的设备可随时变更或终止，无需另行通知。 </p><p>此等条款及细则可随时变更，且此等更改于网站上公布后即时生效。于上述通告发布后使用网站，即代表阁下同意接受此变更。 </p><h4>个人及非商业使用限制 </p>"
        }
      },
      "mys": {
        "en": {
          "title": "TERMS AND CONDITIONS",
          "description": "<ul><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=CHN\">Hilton Premium Club Terms &amp; Conditions in China</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=THA\">Hilton Premium Club Terms &amp; Conditions in Thailand</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=MYS\"> Hilton Premium Club Terms &amp; Conditions in Malaysia</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=HKG\"> Premium Club Terms & Conditions in Hong Kong</a></li><p></p></ul><h4>Website Terms of Use</h4><p>In these terms and conditions, a reference to ‘Hospitality Marketing Concepts, (“HMC”) or ‘we’ means a reference to Hospitality Marketing Concepts LLC and any of its related bodies corporate from time to time.<br>This web site is offered to you, the User, conditioned on your acceptance without modification of the terms,....</p>",
          "summary": "<ul><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=CHN\">Hilton Premium Club Terms &amp; Conditions in China</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=THA\">Hilton Premium Club Terms &amp; Conditions in Thailand</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=MYS\"> Hilton Premium Club Terms &amp; Conditions in Malaysia</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=HKG\"> Premium Club Terms & Conditions in Hong Kong</a></li><p></p></ul><h4>Website Terms of Use</h4><p>In these terms and conditions, a reference to ‘Hospitality Marketing Concepts, (“HMC”) or ‘we’ means a reference to Hospitality Marketing Concepts LLC and any of its related bodies corporate from time to time.<br>This web site is offered to you, ...</p>"
        },
        "zh": {
          "title": "条款与条件",
          "description": "<ul><li><a href=\"TermsAndConditions?id=china\">希尔顿卓越俱乐部条款与条件(中国地区)</a></li><li><a href=\"TermsAndConditions?id=thailand\">希尔顿卓越俱乐部条款与条件(泰国地区)</a></li><li><a href=\"TermsAndConditions?id=malaysia\">希尔顿卓越俱乐部条款与条件(马来西亚地区)</a></li><li><a href=\"TermsAndConditions?id=hongkong\"> 卓越俱樂部條款與條件(香港地区)</a></li></ul><h4>网站使用条款</h4><p>在此等条款及细则中，「酒店业市场策划咨询（「HMC」）」或「我们」是指酒店业市场策划咨询（上海）有限公司及其不时更新的任何相关法人团体。 </p><p>阁下进入并使用本网站时，必须遵守相关条款、细则及通告，不得作出任何修改。使用本网站即代表阁下接受此等网站使用条款、细则及通告。 </p><p>本网站包括但不限于内容、可用时间，以及存取或使用所需的设备，且此等内容、可用时间以及存取或使用所需的设备可随时变更或终止，无需另行通知。 </p><p>此等条款及细则可随时变更，且此等更改于网站上公布后即时生效。于上述通告发布后使用网站，即代表阁下同意接受此变更。 </p><h4></p>",
          "summary": "<ul><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=china\">希尔顿卓越俱乐部条款与条件(中国地区)</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=thailand\">希尔顿卓越俱乐部条款与条件(泰国地区)</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=malaysia\">希尔顿卓越俱乐部条款与条件(马来西亚地区)</a></li><li><a href=\"http://www.premiumclubasia.com/TermsAndConditions?id=hongkong\"> 卓越俱乐部条款与条件(香港地区)</a></li></ul><h4>网站使用条款</h4><p>在此等条款及细则中，「酒店业市场策划咨询（「HMC」）」或「我们」是指酒店业市场策划咨询（上海）有限公司及其不时更新的任何相关法人团体。 </p><p>阁下进入并使用本网站时，必须遵守相关条款、细则及通告，不得作出任何修改。使用本网站即代表阁下接受此等网站使用条款、细则及通告。 </p><p>本网站包括但不限于内容、可用时间，以及存取或使用所需的设备，且此等内容、可用时间以及存取或使用所需的设备可随时变更或终止，无需另行通知。 </p><p>此等条款及细则可随时变更，且此等更改于网站上公布后即时生效。于上述通告发布后使用网站，即代表阁下同意接受此变更。 </p><h4>个人及非商业使用限制 </p>"
        }
      }
    }
  }
}
```

### Terms of Use

The terms of use content requires similar properties to benefits.

#### JSON sample

The terms of use content has similar structure as the terms and conditions.

### Privacy Policy

The privacy policy content requires similar properties to benefits.

#### JSON sample

The privacy policy content has similar structure as the terms and conditions.

### Strings

Every string in the site is tagged with a special key so it can be identified and re-purposed for different languages. The `key` therefore is an identifier to each site string and the value is language-specific actual string to be used in the site for the specific language.

#### JSON sample

```json
  "strings": {
    "en": {
      "site-title": "Premium Club Asia",
      "menu": "Menu",
      "menu-home": "Home",
      "menu-members": "Members Benefits",
      "menu-hotels": "Participating hotels",
      "menu-promotions": "Promotions",
      "menu-services": "Services",
      "menu-contact": "Contact Us",
      "menu-login": "Login",
      "menu-abouthmc": "About HMC",
      "menu-tc": "Terms and Conditions",
      "menu-usage": "Site Usage Agreement",
      "menu-privacy": "Global Privacy Statement Updated 2015",
      "menu-cookie": "Cookie Statement Updated 2015",
      "menu-profile": "Members Profile"
	},
    "zh": {
      "site-title": "希尔顿卓越俱乐部",
      "menu": "菜单",
      "menu-home": "首页",
      "menu-members": "会员优惠",
      "menu-hotels": "参与酒店",
      "menu-promotions": "最新消息",
      "menu-services": "服务",
      "menu-contact": "联系我们",
      "menu-login": "用户登入",
      "menu-abouthmc": "关于HMC ",
      "menu-tc": "条款与条件 ",
      "menu-usage": "网站使用条款 ",
      "menu-joinnow": "立即登记",
      "menu-privacy": "全球隐私权声明 2015更新 ",
      "menu-cookie": "Cookies声明 2015更新",
      "menu-profile": "会员中心"
	}
}
```

### Pages

Instead of being hard coded, each page is tagged with a special key so it can be identified and re-purposed for different languages. The `key` therefore is an identifier to each site page and the value is language-specific actual string to be used in the site for the specific page. *Please use Markddown instead of HTML.*

#### JSON sample

```json
  "pages": {
    "en": {
      "home-page": "A Hilton Premium Club membership is the easiest way to reduce your travel expenses with guaranteed savings on selected accommodation rates, along with exclusive dining discounts. Becoming a part of this select group entitles you to exclusive benefits reserved only for our members.\r\n Whether it’s to host a conference or for a personal getaway, you will find our hotel to be the perfect location for both business and pleasure. We offer versatile settings for all types of meetings, conferences and catered events. From set-up to a delicious menu, with us, every detail matters. Create a memorable impression.",
      "cn-contact-details": "<strong> China</strong> <br>  Phone : [(86) 400-830-7100](tel:864008307100)<br> Email: [hpc-memberservices@clubhotel.com](mailto:hpc-memberservices@clubhotel.com)",
      "ms-contact-details": "",
      "th-contact-details": ""
    },
    "zh": {
      "home-page": "希尔顿卓越俱乐部让您以最低的花费换取最佳的优惠，尊享各种非一般的优惠礼遇。包括一系列精选酒店住宿及饮食优惠。 \r\n无论是商务会议还是私人消遣，我们酒店都是您最佳的选择。我们提供各种不同类型的会议及宴请的佈置以满足您不同的需求。我们对每一个细节的执著与关注，力求让您留下难忘的印象。",
      "cn-contact-details": "<strong>China</strong><br> Phone : [(86) 400-830-7100](tel:864008307100) <br>Email: [hpc-memberservices@clubhotel.com](mailto:hpc-memberservices@clubhotel.com)",
      "ms-contact-details": "",
      "th-contact-details": ""
    },
    "tw": {
      "home-page": "希爾頓卓越俱樂部讓您以最低的花費換取最佳的優惠，尊享各種非壹般的優惠禮遇。包括壹系列精選酒店住宿及飲食優惠。 \r\n 無論是商務會議還是私人消遣，我們酒店都是您最佳的選擇。我們提供各種不同類型的會議及宴請的佈置以滿足您不同的需求。我們對每壹個細節的執著與關注，力求讓您留下難忘的印象。",
      "cn-contact-details": "<strong>China</strong><br>  Phone : [(86) 400-830-7100](tel:864008307100) <br> Email: [hpc-memberservices@clubhotel.com](mailto:hpc-memberservices@clubhotel.com)",
      "ms-contact-details": "",
      "th-contact-details": ""
    },
    "th": {
      "home-page": "การเป็นสมาชิก Hilton Premium Club เป็นวิธีที่สะดวกและดีที่สุดที่จะช่วยลดค่าใช้จ่ายในการเดินทางให้กับคุณ ด้วยการรับรองอัตราราคาที่พักพร้อมทั้งส่วนลดค่าอาหารในราคาพิเศษสุด สิทธิประโยชน์พิเศษดังกล่าวนี้มอบให้แก่สมาชิกบัตรเท่านั้น ไม่ว่าคุณจะเป็นผู้ที่มาประชุมหรือพักผ่อนเป็นการส่วนตัว คุณจะพบว่าโรงแรมของเราจะเป็นสถานที่พักที่ดีเยี่ยมที่สุดให้กับคุณสำหรับทั้งงานธุรกิจและการพักผ่อนส่วนตัว เราเสนอการบริการในทุกรูปแบบไม่ว่าจะเป็นการจัดพบปะสังสรรค์ การจัดประชุม และการจัดอีเว้นท์ต่างๆ ด้วยการจัดสรรสิ่งที่ดีสุดพร้อมใส่ใจในทุกรายละเอียดเพื่อสร้างความประทับใจให้กับคุณไม่รู้ลืม",
      "cn-contact-details": "<strong>China</strong><br>  Phone : [(86) 400-830-7100](tel:864008307100)<br> Email: [hpc-memberservices@clubhotel.com](mailto:hpc-memberservices@clubhotel.com)",
      "ms-contact-details": "",
      "th-contact-details": ""
    }
  }
}
```

## Content Management

There are two ways to retrieve, update and manage the content:

### Using an Email Bot:

In order to make things easy for folks to retrieve and update mobile apps content, we created a content Email bot which listens on emails arriving to `mosaic-site-content@clubhotel.com` inbox. The bot uses the email's subject as a command to either retrieve or update content. Since communicating over Emails is a very familiar work process, we feel this method will be quite helpful as it mimics this very familiar process!

Here is a block diagram:

![Block Diagram](http://i.imgur.com/gPoGjmr.png)

Simply, you create a new email to `mosaic-site-content@clubhotel.com` with a subject that commands the bot to do things on your behalf. Currently the bot responds to the following form of commands:

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



