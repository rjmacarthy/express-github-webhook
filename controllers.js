const { exec } = require('child_process')
const { EXEC_SCRIPT, BRANCH: TARGET_BRANCH } = process.env
const { log, logPath } = require('./logger')
const { join } = require('path')

const deploy = (req, res) => {
  const { ref } = req.body
  const isTargetBranch = ref === TARGET_BRANCH

  if (!isTargetBranch) {
    return res.end()
  }

  exec(`sh ${EXEC_SCRIPT}`, (_, stdout, stderr) => {
    log(stdout || stderr)
  })

  res.end()
}

const index = (_, res) => {
  res.sendFile(join(__dirname, logPath))
}

module.exports = {
  deploy,
  index
}
