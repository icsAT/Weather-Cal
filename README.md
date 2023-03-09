# Weather-Cal (Scriptable App für Apple Devices)

This is a Scriptable widget is a costumized version of mzeryck's Weather-Cal widget. For German users I added functionality to display the left data volume of your T-Mobile data plan and some Covid-19 data from Robert-Koch-Institute. 
This is a Scriptable widget is a fork of the weather-cal.js from Max Zeryck (https://github.com/mzeryck/Weather-Cal). Everything about the Script is explained on his GitHub project.

What I did is to add functionality for a small group of people in the custom item section of his script. In that way I added the left data volume of your T-Mobile data plan, some Robert-Koch Institut data about Covid-19 (new Cases in Germany, the incidence value of the local or a fixed state area and the new cases in that area).

The Data form Robert-Koch Institute is used under the license of
Robert Koch-Institut (RKI), dl-de/by-2-0

# I want to say thank you to:
- Max Zeryck (mzeryck / https://github.com/mzeryck/Weather-Cal) for this awesome pice of work. He developed this great widget script and is responsible for the possibility to add custom functions (items) to his widget without losing the chance to use his improvements by opening his widget to third party functions. 
- Markus Wittmann for pointing me to Max's script and the idea to implement own or additional functions.
- olikdesign (https://gist.github.com/olikdesign) for his "Telekom Datenvolumen" Widget, wich helped me a lot to implement the T-Mobile Dataplan function.
- Kevin Kub (kevinkub / https://gist.github.com/kevinkub/46caebfebc7e26be63403a7f0587f664) for his ideas on using the RKI data in Scriptable Widgets. He was the one who got a lot attention on his widget in Germany.
- Raphael (rphl / https://github.com/rphl/corona-widget) and  tzschies (https://github.com/tzschies/incidence) for forking Kevin's widget and bringing up a lot of new ideas on how to use the RKI data.


Beispiel für ein mittleres Widget:
![IMG_1484](https://user-images.githubusercontent.com/74063738/102024184-bf5c1500-3d90-11eb-844d-2ea28af2f7c7.jpeg)
![IMG_1485](https://user-images.githubusercontent.com/74063738/102024189-c71bb980-3d90-11eb-95e6-448a17c48732.jpeg)

# Additional Functions:


tmobile:

This item shows your data left from your T-Mobile Germany data plan.
It requires data connectivity over the mobile network to get or refresh the data. A red antenna means there is no data connectivity over the mobile network (you are using wifi f.e.)  or it is read from cache since it's not outdated. A green antenna means you got fresh data over the mobile network. The green bullet means you used less than 75% of your data plan, it turns orange between 75% and  less than 90% and red if you have used 90% or more.
You can change the text after the volume left in the configuration section (see below) of the code.

<img width="574" alt="Bildschirmfoto 2020-11-29 um 00 46 39" src="https://user-images.githubusercontent.com/74063738/100528373-7034b280-31dc-11eb-8671-3849f2087bc8.png">


c19de:

This item shows yesterday's new covid-19 cases from the Robert-Koch Institute.
You can change the text after the new cases in the configuration section (see above) of the code.


c19rki:

This item shows yesterday's incidence value and new covid-19 cases from the Robert-Koch Institute.
You are able to set the limits for the color bullets, the number of letters for the area name, your own area name and geodata for a fixed place in the configurations section (see below) of the code.


# Version 

Version 0.88 (03/09/2023)
- Changes the RKI COVID-19 API call since the RKI changed the API.

Version 0.87 (02/17/2022)
- Changed the RKI COVID-19 API call since thr RKI changed the API.

Version 0.86 (11/14/2021)
- Removed not working vodafone support.
- Removed the Covid-19 values state websites since they changed and were not working anymore.

Version 0.85 (12/22/2020)
- I changed caching of the T-Mobile informations to the functions of the base script. This should not have any effect on your use, besides you are able to set after what time a refresh should be done.
- I introduced caching to the RKI and state Covid-19 data, so its not read from an extern source that often. You are able to set the refresh time in minutes for each item.
- I added support for the Vodafone Germany data plan. This is very experimental since I don't own a Vodafone Dataplan on my own and I have no idea if this works. Feel free to test it and give me feedback.

Version 0.84 (12/15/2020)
- Removed trailing comma in the layout, since they are raising errors in Max new version.

Version 0.83 (12/01/2020)
- I added Berlin to the c19state item.
  
Version 0.82 (11/29/2020)
- I added more states to the c19state item. (Hamburg, Hessen, Bayern, Schleswig-Holstein, Rheinland-Pfalz)
- There was an issue with the dark red bullets, that were never used if the incidence value was over 100.

Version 0.81 (11/29/2020)
- There was an issue (Error on using c19Settings) if you use own geodata. This is fixed now.

Version 0.80 (11/29/2020)
- Very first test version using the new custom area of Max's script.


# Here is the configuration I used for the medium widget:

![IMG_1484](https://user-images.githubusercontent.com/74063738/102024294-79ec1780-3d91-11eb-9f45-b130d72a9a55.jpeg)
![IMG_1485](https://user-images.githubusercontent.com/74063738/102024304-87090680-3d91-11eb-9f3e-b86e250d091b.jpeg)

Configuration inside the code is already done, if you use the above code.
But you have to change the configuration of the script by starting it from the scriptable app and then chose "Edit preferences". To get the above result I used the following configuration.


Overall settings:
![IMG_1648](https://user-images.githubusercontent.com/74063738/102933552-bb23ac00-44a2-11eb-9aa9-ec7170c89ee5.PNG)


Localization and text customization:
![IMG_1487](https://user-images.githubusercontent.com/74063738/102024571-1bc03400-3d93-11eb-8b1d-22767ad0678f.PNG)


Text size, colors, and fonts:
![IMG_1649](https://user-images.githubusercontent.com/74063738/102933585-ce367c00-44a2-11eb-97c8-74c0a1f6d6ef.PNG)
![IMG_1650](https://user-images.githubusercontent.com/74063738/102933604-d7274d80-44a2-11eb-9455-af602367690e.PNG)


Date:
![IMG_1490](https://user-images.githubusercontent.com/74063738/102024607-5de97580-3d93-11eb-895a-47de110d3379.PNG)


Events:
![IMG_1491](https://user-images.githubusercontent.com/74063738/102024610-6641b080-3d93-11eb-840b-53cae2da4d87.PNG)


Reminders:
![IMG_1492](https://user-images.githubusercontent.com/74063738/102024626-7b1e4400-3d93-11eb-99c5-6d4ea31f3a0a.PNG)


Sunrise and sunset:
![IMG_1493](https://user-images.githubusercontent.com/74063738/102024630-82455200-3d93-11eb-88dc-8b7887001d53.PNG)


Weather:
![IMG_1651](https://user-images.githubusercontent.com/74063738/102933659-eefed180-44a2-11eb-9843-176a91838c0f.PNG)
![IMG_1495](https://user-images.githubusercontent.com/74063738/102024639-8ec9aa80-3d93-11eb-9e9e-14f7283c2b65.PNG)


COVID data:
![IMG_1496](https://user-images.githubusercontent.com/74063738/102024651-95f0b880-3d93-11eb-97da-9fd78fa09068.PNG)


Symbols:
![IMG_1652](https://user-images.githubusercontent.com/74063738/102933690-ff16b100-44a2-11eb-8817-623524d23fe7.PNG)


News:
![IMG_1653](https://user-images.githubusercontent.com/74063738/102933716-0f2e9080-44a3-11eb-8e88-5d2b9ba1798a.PNG)


# Here is the configuration I used for the large widget:

![IMG_1476](https://user-images.githubusercontent.com/74063738/102024402-2928ee80-3d92-11eb-877c-b339d3f91364.jpeg)


The configuration inside the code has to be changed. You have to change the layout like this:
<img width="351" alt="Bildschirmfoto 2020-12-15 um 09 21 49" src="https://user-images.githubusercontent.com/74063738/102189773-6c30b200-3eb7-11eb-9e22-64b96aa33528.png">
Everything else inside the code is fine as it is to start with.


Overall settings:
![IMG_1654](https://user-images.githubusercontent.com/74063738/102934153-efe43300-44a3-11eb-92e8-109e9c826654.PNG)


Localization and text customization:
![IMG_1498](https://user-images.githubusercontent.com/74063738/102024807-87ef6780-3d94-11eb-8ab2-ed553c1d12e9.PNG)


Text size, colors, and fonts:
![IMG_1655](https://user-images.githubusercontent.com/74063738/102934208-038f9980-44a4-11eb-9a4c-7d7d56757f4a.PNG)
![IMG_1656](https://user-images.githubusercontent.com/74063738/102934232-0ab6a780-44a4-11eb-8de5-b63a653ae387.PNG)


Date:
![IMG_1501](https://user-images.githubusercontent.com/74063738/102024819-95a4ed00-3d94-11eb-8073-6c84b10d837a.PNG)


Events:
![IMG_1502](https://user-images.githubusercontent.com/74063738/102024823-9a69a100-3d94-11eb-985c-fc060d70ff94.PNG)


Reminders:
![IMG_1503](https://user-images.githubusercontent.com/74063738/102024832-a05f8200-3d94-11eb-88f8-64c55f9135e2.PNG)


Sunrise and sunset:
![IMG_1504](https://user-images.githubusercontent.com/74063738/102024835-a48b9f80-3d94-11eb-92fa-2ecdf96cf405.PNG)


Weather:
![IMG_1657](https://user-images.githubusercontent.com/74063738/102934278-173b0000-44a4-11eb-95e5-854662cae568.PNG)
![IMG_1506](https://user-images.githubusercontent.com/74063738/102024855-af463480-3d94-11eb-8f4c-ddc67fd28e4d.PNG)


COVID data:
![IMG_1507](https://user-images.githubusercontent.com/74063738/102024860-b66d4280-3d94-11eb-990a-9b8c1acac000.PNG)


Symbols:
![IMG_1658](https://user-images.githubusercontent.com/74063738/102934329-333ea180-44a4-11eb-8a76-a920a4e07853.PNG)


News:
![IMG_1659](https://user-images.githubusercontent.com/74063738/102934343-389bec00-44a4-11eb-8111-a63d3b21feb9.PNG)
