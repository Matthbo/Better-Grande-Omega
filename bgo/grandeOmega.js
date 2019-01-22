//module.exports = {}
const electronPath = require('electron'),
  childProcess = require('child_process')

exports.run = function(){
  args = process.argv.slice(2)
  args.unshift(__dirname + '/../')

  console.log("Starting GrandeOmega")
  childProcess.spawn(electronPath, args, { stdio: 'inherit' })
}