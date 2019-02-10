const electronInstaller = require('electron-winstaller'),
  srcPackage = require('../src/package')

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'app/BetterGrandeOmega-win32-x64',
    outputDirectory: 'dist/win',
    authors: 'Matthbo',
    exe: 'BetterGrandeOmega.exe',
    setupExe: `${srcPackage.name}Setup.exe`,
    setupMsi: `${srcPackage.name}Setup.msi`,
    name: srcPackage.name,
    description: srcPackage.description,
    version: srcPackage.version,
  })

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`))