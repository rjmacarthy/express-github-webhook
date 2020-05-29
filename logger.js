const { existsSync, writeFileSync, mkdirSync } = require('fs')

const logPath = './log/deploy.log'

const init = () => {
  !existsSync('./log') && mkdirSync('./log')
  !existsSync(logPath) && writeFileSync(logPath, '')
}

const log = log => {
  writeFileSync('./log/deploy.log', log)
}

module.exports = {
  log,
  init,
  logPath
}
