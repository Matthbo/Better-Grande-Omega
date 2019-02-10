const cp = require('child_process'),
  { platform } = require('os'),
  { join } = require('path')

var npxCmd = platform().startsWith('win') ? 'npx.cmd' : 'npx'
cp.spawn(npxCmd, ['electron', '.'], { cwd: join(process.cwd(), 'src/'), stdio: 'inherit' })