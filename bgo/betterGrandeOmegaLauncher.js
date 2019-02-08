#!/usr/bin/env node

const stdin = require('process').stdin,
  grandeOmega = require('./grandeOmega'),
  fs = require('fs')

BGO = {}

BGO.init = function(){
  fs.unlink('./version.txt', err => {
    if(err) console.error(`\x1b[30m\x1b[103m${err.message}\x1b[0m`)
    grandeOmega.run()
  })
}

BGO.init()
