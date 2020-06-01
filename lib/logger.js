const { existsSync, writeFileSync, mkdirSync } = require('fs')
const { join } = require('path')

const logFolder = join(__dirname, '../log')
const logFile = 'deploy.log'
const logPath = `${logFolder}/${logFile}`

const init = () => {
  !existsSync(logFolder) && mkdirSync(logFolder)
  !existsSync(logPath) && writeFileSync(logPath, '')
}

module.exports = {
  init,
  logFolder,
  logFile,
  logPath
}
