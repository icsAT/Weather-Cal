// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-purple; icon-glyph: calendar;
/*

~

Base Script from mzeryck https://github.com/mzeryck/Weather-Cal
Custom functions from icsAT https://github.com/icsAT/Weather-Cal

Version 0.89 from 08/16/2023

~

Welcome to Weather Cal. Run this script to set up your widget.

Add or remove items from the widget in the layout section below.

You can duplicate this script to create multiple widgets. Make sure to change the name of the script each time.

Happy scripting!

~

*/

// Specify the layout of the widget items.
const layout = `
  
row
column
  space
  date
  battery
  tmobile
  c19de
  c19rki
  space

column(90)
  center
  space
  current
  future
  sunrise
  space
       
`

/*
 * CODE
 * Be more careful editing this section. 
 * =====================================
 */

// Names of Weather Cal elements.
const codeFilename = "weather-cal-code"
const gitHubUrl = "https://raw.githubusercontent.com/mzeryck/Weather-Cal/main/weather-cal-code.js"

// Determine if the user is using iCloud.
let files = FileManager.local()
const iCloudInUse = files.isFileStoredIniCloud(module.filename)

// If so, use an iCloud file manager.
files = iCloudInUse ? FileManager.iCloud() : files

// Determine if the Weather Cal code exists and download if needed.
const pathToCode = files.joinPath(files.documentsDirectory(), codeFilename + ".js")
if (!files.fileExists(pathToCode)) {
  const req = new Request(gitHubUrl)
  const codeString = await req.loadString()
  files.writeString(pathToCode, codeString)
}

// Import the code.
if (iCloudInUse) { await files.downloadFileFromiCloud(pathToCode) }
const code = importModule(codeFilename)

const custom = {

    // CUSTOM ITEM SETTINGS
    // Choose how each custom item is displayed
    // ========================================
  
    // COVID-19
    // --------
  
    c19Settings : {
  
      // Limits to show color of Covid-19 incidence bullet.
      c19YellowLimit:    35
      ,c19OrangeLimit:   35
      ,c19RedLimit:      50
      ,c19DarkredLimit: 100
    
      // Cut RKI area name after a number of characters. 0 means no cutting.
      ,c19rkiCutName:    12
    
      // Overrule area name with own text. Leave blank "" to take the name from RKI or state.
      ,c19ownAreaName: ""
      
      // Geodata to use a fixed location on item c19rki (f.e. "53.554,9.967"). Leave blank "" to match the device's locale.
      ,c19rkiGeodata: ""
    
      // time the values should be cached
      ,deCache:       1
      ,rkiCache:      1
  
    },
  
    // T-Mobile
    // --------
    
    tmobileSettings : {
      
      // URL to open on touch
      url:      "https://pass.telekom.de"
      
      // time the values should be cached
      ,cache:   15
    
    },
      
    // TEXT
    // Change the language and formatting of text displayed.
    // =====================================================
  
    // You can change the language or wording of any text in the widget.
    localizedText : {
    
      // The text shown after the remaining data volume of your data plan.
      dataVolumeLeftLable: "verfügbar"
      
    },
    
    // Set the font, size, and color of various text elements. Use iosfonts.com to find fonts to use. If you want to use the default iOS font, set the font name to one of the following: ultralight, light, regular, medium, semibold, bold, heavy, black, or italic.
    textFormat : {
    
      // Any blank values will use the default.
  
      // font and color for the left volume of your data plan
      tmobile:     { size: 14, color: "", font: "medium" },
      
      // font and color for the covid-19 lines
      c19de:       { size: 14, color: "", font: "medium" },
      c19rki:      { size: 14, color: "", font: "medium" },
  
    },
  
    // CUSTOM SETUP FUNCTIONS
    // These functions prepare data needed for items.
    // ==============================================
  
    async setupTmobile() {
  
      const tmobilePath = code.fm.joinPath(code.fm.libraryDirectory(), "weather-cal-tmobile")
      let tmobileData = code.getCache(tmobilePath, custom.tmobileSettings.cache)
      let tmobileApi_online = false
      
      if (!tmobileData || tmobileData.length == 0 || tmobileData.cacheExpired) {
        try {
  
          const tmobileApiUrl = "https://pass.telekom.de/api/service/generic/v1/status"
          let tmobileRequest = new Request(tmobileApiUrl)
  
          // API only answers for mobile Safari
          tmobileRequest.headers = {
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 13_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.1 Mobile/15E148 Safari/604.1"
          }
  
          // Fetch data from pass.telekom.de
          tmobileData = await tmobileRequest.loadJSON()
          if (!tmobileData || tmobileData.length == 0) { throw 0 }
  
          // Write Data to cache
          code.fm.writeString(tmobilePath, JSON.stringify(tmobileData, null, 2))
          tmobileApi_online = true
  
        } catch (err) {
  
          tmobileData = code.getCache(tmobilePath, custom.tmobile.cache)
          let tmobileApi_online = false
  
        }
  
      }
      
      return {
  
        tmobileData: tmobileData,
        tmobileApi_online: tmobileApi_online
    
      }
  
    },
  
    async setupC19de() {
  
      const c19dePath = code.fm.joinPath(code.fm.libraryDirectory(), "weather-cal-c19de")
      let c19deData = code.getCache(c19dePath, custom.c19Settings.deCache)
  
      if (!c19deData || c19deData.length == 0 || c19deData.cacheExpired) {
      
        try {
  
          const c19deApiUrl = "https://api.corona-zahlen.org/germany"
          let c19deRequest = new Request(c19deApiUrl)
          let c19deRawData = await c19deRequest.loadJSON()
          if (!c19deRawData || c19deRawData.length == 0) { throw 0 }
  
          c19deData = {
            c19deNewCases: c19deRawData.delta.cases.toLocaleString(),
            c19deIncidence: parseFloat(c19deRawData.weekIncidence.toFixed(1))

          }
          if (c19deData.c19deNewCases == null) {
            c19deData.c19deNewCases = 0
          }
  
          // Write Data to cache
          code.fm.writeString(c19dePath, JSON.stringify(c19deData, null, 2))
  
        } catch (err) {
  
          c19deData = code.getCache(c19dePath, custom.c19Settings.deCache)
  
        }
  
      }
    
      return c19deData
  
    },
  
    async setupC19rki() {
  
      // Requirements: location
      let locationData = {}
    
      if (custom.c19Settings.c19rkiGeodata.length > 5 && custom.c19Settings.c19rkiGeodata.includes(',') && custom.c19Settings.c19rkiGeodata.includes('.')) {
        const geodata = custom.c19Settings.c19rkiGeodata.split(",").map(parseFloat)
        locationData.latitude = geodata[0]
        locationData.longitude = geodata[1]
      } else {
        if (!code.data.location) { await code.setupLocation() }
        locationData = code.data.location
      }
  
      const c19rkiPath = code.fm.joinPath(code.fm.libraryDirectory(), "weather-cal-c19rki")
      let c19rkiData = code.getCache(c19rkiPath, custom.c19Settings.rkiCache)
      
      if (!c19rkiData || c19rkiData.length == 0 || c19rkiData.cacheExpired) {
  
        try {
  
          const c19rkiOutput="RS,GEN"
          const c19rkiIncidenceApiUrl = `https://services7.arcgis.com/mOBPykOjAyBO2ZKk/arcgis/rest/services/RKI_Landkreisdaten/FeatureServer/0/query?where=1%3D1&outFields=${c19rkiOutput}&geometry=${locationData.longitude.toFixed(3)}%2C${locationData.latitude.toFixed(3)}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelWithin&returnGeometry=false&outSR=4326&f=json`
    
          let c19rkiIncidenceRequest = new Request(c19rkiIncidenceApiUrl)
          let c19rkiIncidenceRawData = await c19rkiIncidenceRequest.loadJSON()

          const c19rkiIncidenceData = c19rkiIncidenceRawData.features[0].attributes

          const c19rkiNewCasesApiUrl = `https://api.corona-zahlen.org/districts/${c19rkiIncidenceData.RS}`
  
          let c19rkiNewCasesRequest = new Request(c19rkiNewCasesApiUrl)
          let c19rkiNewCasesRawData = await c19rkiNewCasesRequest.loadJSON()

          let c19rkiNewCases = c19rkiNewCasesRawData.data[c19rkiIncidenceData.RS].delta.cases
  
          if (c19rkiNewCases == null) {
            c19rkiNewCases = 0
          }
  
          c19rkiData = {
            
            c19rkiArea: c19rkiIncidenceData.GEN,
            c19rkiIncidence: parseFloat(c19rkiNewCasesRawData.data[c19rkiIncidenceData.RS].weekIncidence.toFixed(1)),
            c19rkiNewCases: c19rkiNewCases.toLocaleString()
  
          }
  
          // Write Data to cache
          code.fm.writeString(c19rkiPath, JSON.stringify(c19rkiData, null, 2))
  
        } catch (err) {
  
          c19rkiData = code.getCache(c19rkiPath, custom.c19Settings.rkiCache)
  
        }
  
      }
  
      return c19rkiData
  
    },
  
    // CUSTOM WIDGET ITEMS
    // These functions display items on the widget.
    // ============================================
  
    async tmobile(column) {
  
      // Requirements: T-Mobile
      if (!this.tmobileData) {
        tmobileData = await custom.setupTmobile()
      }
  
      // Set up the T-Mobile stack
      let tmobileStack = code.align(column)
      tmobileStack.layoutHorizontally()
      tmobileStack.centerAlignContent()
      tmobileStack.setPadding(code.padding/2, code.padding*2, code.padding/2, code.padding)
      if (custom.tmobileSettings.url) { tmobileStack.url = custom.tmobileSettings.url }
  
      // Icon
      let tmobileIcon = SFSymbol.named('antenna.radiowaves.left.and.right')
      let tmobileIconElement  = tmobileStack.addImage(tmobileIcon.image)
      tmobileIconElement.imageSize = new Size(custom.textFormat.tmobile.size, custom.textFormat.tmobile.size)
      tmobileIconElement.tintColor = Color.green()
      if (!tmobileData.tmobileApi_online) {
        tmobileIconElement.tintColor = Color.red()
      }
      tmobileStack.addSpacer(5)
  
      if (tmobileData.tmobileData) {
  
        if(tmobileData.tmobileData.initialVolume && tmobileData.tmobileData.usedVolume) {
        
          let volLeft = 0
          let byteLeft = tmobileData.tmobileData.initialVolume - tmobileData.tmobileData.usedVolume
          let kbLeft = byteLeft / 1024
          let mbLeft = kbLeft / 1024
          let gbLeft = mbLeft / 1024
  
          if (gbLeft >= 1) {
            volLeft = gbLeft.toFixed(1)
            tmobileText = volLeft + " GB"
          } else if (mbLeft >= 1) {
            volLeft = mbLeft.toFixed(1)
            tmobileText = volLeft + " MB"
          } else if (kbLeft >= 1) {
            volLeft = kbLeft.toFixed(1)
            tmobileText = volLeft + " KB"
          } else {
            volLeft = byteLeft
            tmobileText = volLeft + " Byte"
          }
  
          tmobileText = tmobileText + " " + custom.localizedText.dataVolumeLeftLable
  
        } else if (tmobileData.tmobileData.passType="102") {
  
          tmobileText = "Unbegrenzt"
  
        }
  
        const tmobileLine = code.provideText(tmobileText, tmobileStack, custom.textFormat.tmobile)
  
        tmobileStack.addSpacer(4)
  
        // Usage bullet
        let bullet = tmobileStack.addText("●")
        bullet.font = Font.heavySystemFont(custom.textFormat.tmobile.size)
        bullet.textColor = Color.green()
  
        if (tmobileData.tmobileData.usedPercentage >= 75) {
  
          bullet.textColor = Color.orange()
  
        } else if (tmobileData.tmobileData.usedPercentage >= 90) {
  
          bullet.textColor = Color.red()
  
        }
    
      } else {
  
        tmobileText = "keine Telekom Daten"
        const tmobileLine = code.provideText(tmobileText, tmobileStack, custom.textFormat.tmobile)
  
      }
  
    },
  
    async c19de(column) {
  
      // Requirements: c19de
      if (!this.c19deData) {
        c19deData = await custom.setupC19de()
      }
  
      // Set up the c19de stack
      let c19deStack = code.align(column)
      c19deStack.layoutHorizontally()
      c19deStack.centerAlignContent()
      c19deStack.setPadding(code.padding/2, code.padding, code.padding/2, code.padding)
  
      let c19deText = "🦠"
      let c19deLine = code.provideText(c19deText, c19deStack, custom.textFormat.c19de)
      c19deStack.addSpacer(1)
  
      c19deText = "DE: "

      if (c19deData.c19deIncidence) {
        c19deText = c19deText + c19deData.c19deIncidence.toLocaleString() + " "
      } else {
        c19deText = c19deText + "n/a "
      }

      if (c19deData.c19deNewCases) {
        c19deText = c19deText + "(+ " + c19deData.c19deNewCases.toLocaleString() + ")"
      } else {
        c19deText = c19deText + "(n/a)"
      }
      
      c19deLine = code.provideText(c19deText, c19deStack, custom.textFormat.c19de)
  
    },
  
    async c19rki(column) {
  
      // Requirements: c19rki
      if (!this.c19rkiData) {
        c19rkiData = await custom.setupC19rki()
      }
  
      // Set up the c19rki stack
      let c19rkiStack = code.align(column)
      c19rkiStack.layoutHorizontally()
      c19rkiStack.centerAlignContent()
      c19rkiStack.setPadding(code.padding/2, code.padding*2, code.padding/2, code.padding)
  
      // Incidence Idicator Bullet
      let bullet = c19rkiStack.addText("●")
      bullet.font = Font.heavySystemFont(custom.textFormat.c19rki.size)
      bullet.textColor = Color.green()
  
      if (c19rkiData.c19rkiIncidence >= custom.c19Settings.c19DarkredLimit) {
        bullet.textColor = new Color ('#CC0000')
      } else if (c19rkiData.c19rkiIncidence >= custom.c19Settings.c19RedLimit) {
        bullet.textColor = new Color('#FF0000')
      } else if (c19rkiData.c19rkiIncidence >= custom.c19Settings.c19OrangeLimit) {
        bullet.textColor = new Color('#FFA500')
      } else if (c19rkiData.c19rkiIncidence >= custom.c19Settings.c19YellowLimit) {
        bullet.textColor = new Color('#FFFF00')
      }
      c19rkiStack.addSpacer(5)
  
      c19rkiText = "keine Daten"
  
      if (custom.c19Settings.c19ownAreaName) {
      
        c19rkiText = custom.c19Settings.c19ownAreaName
  
      } else if (c19rkiData.c19rkiArea) {
  
        c19rkiText = c19rkiData.c19rkiArea
  
      }
  
      if (custom.c19Settings.c19rkiCutName != 0) { 
      
        c19rkiText = c19rkiText.substr(0, custom.c19Settings.c19rkiCutName)
  
      }
  
      if (c19rkiData.c19rkiIncidence) {
  
        c19rkiText = c19rkiText + ": " + c19rkiData.c19rkiIncidence.toLocaleString()
  
      } else {
  
        c19rkiText = c19rkiText + ": n/a"
  
      }
  
      if (c19rkiData.c19rkiNewCases) {
  
        c19rkiText = c19rkiText + " (+" + c19rkiData.c19rkiNewCases + ")"
  
      } else {
  
        c19rkiText = c19rkiText + " (+n/a)"
  
      }
  
      const c19rkiLine = code.provideText(c19rkiText, c19rkiStack, custom.textFormat.c19rki)
  
    },
  
}

// Run the initial setup or settings menu.
let preview
if (config.runsInApp) {
  preview = await code.runSetup(Script.name(), iCloudInUse, codeFilename, gitHubUrl)
  if (!preview) return
}

// Set up the widget.
const widget = await code.createWidget(layout, Script.name(), iCloudInUse, custom)
Script.setWidget(widget)

// If we're in app, display the preview.
if (config.runsInApp) {
  if (preview == "small") { widget.presentSmall() }
  else if (preview == "medium") { widget.presentMedium() }
  else { widget.presentLarge() }
}

Script.complete()
