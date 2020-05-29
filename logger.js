const { existsSync, writeFileSync, mkdirSync } = require('fs')

const logPath = './log/deploy.log'

const init = () => {
  !existsSync('./log') && mkdirSync('./log')
  !existsSync(logPath) && writeFileSync(logPath, '')
}

const log = text => {
  writeFileSync(logPath, text)
}

module.exports = {
  log,
  init,
  logPath
}
