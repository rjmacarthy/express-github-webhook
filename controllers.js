const cp = require('child_process')
const fs = require('fs')
const { EXEC_SCRIPT, BRANCH: TARGET_BRANCH } = process.env
const logger = require('./logger')
const { join } = require('path')

const deploy = (req, res) => {
  const { ref } = req.body
  const isTargetBranch = ref === TARGET_BRANCH

  if (!isTargetBranch) {
    return res.end()
  }

  cp.exec(`sh ${EXEC_SCRIPT}`, (_, stdout, stderr) => {
    fs.writeFileSync(logger.logPath, stdout || stderr)
  })

  res.status(200).end()
}

const index = (_, res) => {
  res.sendFile(join(__dirname, logger.logPath))
}

module.exports = {
  deploy,
  index
}
