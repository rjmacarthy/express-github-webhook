const { readFileSync } = require('fs')
const { exec } = require('child_process')
const { EXEC_SCRIPT, BRANCH } = process.env
const { writeErr, writeHash, writeStdout } = require('./logger')

const deploy = (req, res) => {
  const { ref, after: hash } = req.body
  const isTargetBranch = ref === BRANCH

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
  const hash = readFileSync('./log/hash.log', 'utf-8') || ''
  const error = readFileSync('./log/error.log', 'utf-8') || ''
  const stdout = readFileSync('./log/stdout.log', 'utf-8') || ''
  res.json({
    hash,
    error,
    stdout
  })
}

module.exports = {
  deploy,
  index
}
