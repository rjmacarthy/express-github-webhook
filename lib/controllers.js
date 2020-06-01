const cp = require('child_process')
const { EXEC_SCRIPT, BRANCH: TARGET_BRANCH } = process.env
const { handler } = require('./utils')
const { join } = require('path')
const logger = require('./logger')

const deploy = (req, res) => {
  const { ref } = req.body
  const isTargetBranch = ref === TARGET_BRANCH

  if (!isTargetBranch) {
    return res.end()
  }

  cp.exec(`sh ${EXEC_SCRIPT}`, handler)

  res.status(200).end()
}

const index = (_, res) => {
  res.sendFile(join(__dirname, logger.logPath))
}

module.exports = {
  deploy,
  index
}
