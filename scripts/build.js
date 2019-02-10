const packager = require('electron-packager'),
  fs = require('fs')

function toPackagePlatform(platform){
  if (platform === 'win32' || platform === 'darwin' || platform === 'linux') {
    return platform
  }
  throw new Error(`Unable to convert to platform for electron-packager: '${process.platform}`)
}

function toPackageArch(targetArch){
  if (targetArch === undefined) {
    return 'x64'
  }

  if (targetArch === 'arm64' || targetArch === 'x64') {
    return targetArch
  }

  throw new Error(
    `Building app for architecture '${targetArch}'  is not supported`
  )
}

function buildApp(platform, arch){
  const options = {
    name: "BetterGrandeOmega",
    platform: toPackagePlatform(platform || process.platform),
    arch: toPackageArch(arch || process.env.TARGET_ARCH),
    asar: false,
    out: 'app',
    dir: 'src',
    overwrite: true,
    tmpdir: false,
    derefSymlinks: true,
    prune: true
    /*
    // macOS
    appBundleId: getBundleID(),
    appCategoryType: 'public.app-category.developer-tools',
    osxSign: true,
    protocols: [
      {
        name: getBundleID(),
        schemes: [
          isPublishableBuild
            ? 'x-github-desktop-auth'
            : 'x-github-desktop-dev-auth',
          'x-github-client',
          'github-mac',
        ],
      },
    ],
    extendInfo: `${projectRoot}/script/info.plist`,

    // Windows
    win32metadata: {
      CompanyName: getCompanyName(),
      FileDescription: '',
      OriginalFilename: '',
      ProductName: getProductName(),
      InternalName: getProductName(),
    },*/
  }

  return packager(options)
}



fs.unlink('src/version.txt', err => {
  if(err) console.error(`Couldn't remove version.txt: ${err.message}`)

  buildApp().then(info => {
    console.log('Build complete')
  })
})
