const http = require('http'),
  https = require('https'),
  url = require('url').URL,
  fs = require('fs'),
  stdin = require('process').stdin,
  onlineVersionUrl = 'https://www.grandeomega.com/api/v1/CustomAssignmentLogic/version',
  localVersionPath = __dirname + "/../version.txt"

// CONVERT THIS FILE TO MODULE, INCLUDE THIS IN AN BGO MAIN FILE

function getBGOOnlineVersion(){}

function getBGOLocalVersion(){}

function getOnlineVersion(){
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

function getLocalVersion(){
  return new Promise((resolve, reject) => {
    fs.readFile(localVersionPath, (err, data) => {
      if(err) reject(new Error("Couldn't get local version (Ignore this if you started Better GrandeOmega for the first time!)"))

      resolve(data)
    })
  })
}

async function main(){
  try {
    const onlineVersion = await getOnlineVersion().catch(err => {throw err}),
      localVersion = await getLocalVersion().catch(err => {throw err}),
      isOutdated = onlineVersion > localVersion

      if(isOutdated) {
        console.warn("GrandeOmega needs to be updated! download the new GrandeOmega zip and replace wwwroot with the wwwroot from the zip")
        console.log("Press enter to continue")
        stdin.resume()
        stdin.once("data", input => {
          fs.unlink(localVersionPath, err => {if(err) throw new Error("Couldn't remove version file")})
          stdin.pause()
        })
        
      }
      else console.log("GrandeOmega is up-to-date")
  } catch(err){
    console.error("Version check error:", err.message)
  }
}

main()
