const { exec } = require('child_process')
const { EXEC_SCRIPT, BRANCH: TARGET_BRANCH } = process.env
const { writeErr, writeHash, writeStdout, getLog } = require('./logger')

const deploy = (req, res) => {
  const { ref, after: hash } = req.body
  const isTargetBranch = ref === TARGET_BRANCH

  if (!isTargetBranch) {
    return res.end()
  }

  exec(`sh ${EXEC_SCRIPT}`, (err, stdout, stderr) => {
    if (err && stderr) {
      writeErr(stderr)
    } else {
      writeErr('')
      writeHash(hash)
      writeStdout(stdout)
    }
  })

  res.end()
}

const index = (_, res) => {
  res.json({
    hash: getLog('hash'),
    error: getLog('error'),
    stdout: getLog('stdout')
  })
}

module.exports = {
  deploy,
  index
}
