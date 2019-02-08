const electronInstaller = require('electron-winstaller');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: 'app/Better-GrandeOmega-win32-x64',
    outputDirectory: 'dist/win',
    authors: 'Matthbo',
    exe: 'Better-GrandeOmega.exe'
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));