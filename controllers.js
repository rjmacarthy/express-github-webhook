const { writeFileSync, readFileSync } = require('fs')
const { exec } = require('child_process')
const { EXEC_SCRIPT, BRANCH } = process.env

const deploy = (req, res) => {
  const { ref, after } = req.body
  const isTargetBranch = ref === BRANCH

  if (!isTargetBranch) {
    return res.json(false)
  }

  exec(`sh ${EXEC_SCRIPT}`, (err, stdout, stderr) => {
    if (err) {
      writeFileSync('error.txt', stderr)
    } else {
      writeFileSync('error.txt', '')
      writeFileSync('log.txt', after)
    }
  })

  res.end()
}

const index = (_, res) => {
  const lastSha = readFileSync('log.txt', 'utf-8')
  const lastError = readFileSync('error.txt', 'utf-8')
  res.json({
    last: lastSha,
    error: lastError,
  })
}

module.exports = {
  deploy,
  index,
}
