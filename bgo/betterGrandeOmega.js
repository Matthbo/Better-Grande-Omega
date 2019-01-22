#!/usr/bin/env node

const stdin = require('process').stdin,
  versionChecker = require('./versionChecker'),
  grandeOmega = require('./grandeOmega')

BGO = {}

BGO.init = function(){
  versionChecker.run().then(() => {
    grandeOmega.run()
  }).catch(() => {
    console.log("Would you still like to start Grande Omega? [y/N]")

    stdin.once("data", data => {
      answer = data.toString().trim()

      if(answer == 'y' || answer == 'Y') grandeOmega.run()
      stdin.pause()
    })
  })
}

BGO.init()