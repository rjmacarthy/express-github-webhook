const fs = require('fs')
const logger = require('./logger')

const handler = (_, stdout, stderr) => {
  const log = stdout || stderr
  fs.writeFileSync(logger.logPath, log)
}

module.exports = {
  handler
}
