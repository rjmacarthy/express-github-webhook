const { exec } = require('child_process')
const { EXEC_SCRIPT, BRANCH: TARGET_BRANCH } = process.env
const { writeErr, writeStdout, getLog } = require('./logger')

const deploy = (req, res) => {
  const { ref } = req.body
  const isTargetBranch = ref === TARGET_BRANCH

  if (!isTargetBranch) {
    return res.end()
  }

  writeErr('')
  writeStdout('')

  exec(`sh ${EXEC_SCRIPT}`, (err, stdout, stderr) => {
    if (err && stderr) {
      writeErr(stderr)
    } else {
      writeStdout(stdout)
    }
  })

  res.end()
}

const index = (_, res) => {
  res.json({
    error: getLog('error'),
    stdout: getLog('stdout')
  })
}

module.exports = {
  deploy,
  index
}
