const { existsSync, writeFileSync, mkdirSync } = require('fs')

const logFolder = './log'

const logFile = 'deploy.log'

const logPath = `${logFolder}/${logFile}`

const init = () => {
  !existsSync(logFolder) && mkdirSync(logFolder)
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
