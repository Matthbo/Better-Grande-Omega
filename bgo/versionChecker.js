const http = require('http'),
  https = require('https'),
  url = require('url').URL,
  fs = require('fs'),
  stdin = require('process').stdin,
  onlineVersionUrl = 'https://www.grandeomega.com/api/v1/CustomAssignmentLogic/version',
  localVersionPath = __dirname + "/../version.txt",
  versionChecker = {}

versionChecker.getBGOOnlineVersion = function(){}

versionChecker.getBGOLocalVersion = function(){}

versionChecker.getOnlineVersion = function(){
  return new Promise((resolve, reject) => {
    const request = new url(onlineVersionUrl).protocol == "https:" ? https : http

    request.get(onlineVersionUrl, res => {
      const { statusCode } = res

      if(statusCode < 300){
        let data = ""
        res.on('data', chunk => {data += chunk})
        res.on('end', () => {
          resolve(data)
        })
      } else {
        reject(new Error("Wrong status code for online version - " + statusCode))
      }
    })
  })
  
}

versionChecker.getLocalVersion = function(){
  return new Promise((resolve, reject) => {
    fs.readFile(localVersionPath, (err, data) => {
      if(err) reject(new Error("Couldn't get local version (Ignore this if you started Better GrandeOmega for the first time!)"))

      resolve(data)
    })
  })
}

versionChecker.run = function(){
  return new Promise(async (resolve, reject) => {
    try {
      const onlineVersion = await this.getOnlineVersion().catch(err => {throw err}),
        localVersion = await this.getLocalVersion().catch(err => {throw err}),
        isOutdated = onlineVersion > localVersion

        if(isOutdated) {
          console.warn("\x1b[30m\x1b[103mGrandeOmega needs to be updated! download the new GrandeOmega zip and replace wwwroot with the wwwroot from the zip\x1b[0m")
          console.log("Press enter to continue")
          stdin.resume()
          stdin.once("data", input => {
            fs.unlink(localVersionPath, err => {if(err) throw new Error("Couldn't remove version file")})
            stdin.pause()
            resolve()
          })
        }
        else {
          console.log("GrandeOmega is up-to-date")
          resolve()
        }

    } catch(err){
      console.error("\x1b[30m\x1b[101mVersion check error:", err.message + "\x1b[0m")
      reject()
    }
  })
}

module.exports = versionChecker