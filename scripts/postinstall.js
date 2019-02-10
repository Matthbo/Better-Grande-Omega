const cp = require('child_process'),
  { platform } = require('os'),
  { join } = require('path')

var npmCmd = platform().startsWith('win') ? 'npm.cmd' : 'npm'
cp.spawn(npmCmd, ['install'], { cwd: join(process.cwd(), 'src/'), stdio: 'inherit' })