const { writeFileSync, readFileSync } = require('fs')
const { exec } = require('child_process')
const { EXEC_SCRIPT, BRANCH } = process.env
const { writeErr, writeHash } = require('./logger')

const deploy = (req, res) => {
  const { ref, after: hash } = req.body
  const isTargetBranch = ref === BRANCH

  if (!isTargetBranch) {
    return res.end()
  }

  exec(`sh ${EXEC_SCRIPT}`, (err, stdout, stderr) => {
    if (err) {
      writeErr(stderr)
    } else {
      writeErr('')
      writeHash(hash)
    }
  })

  res.end()
}

const index = (_, res) => {
  const hash = readFileSync('hash.txt', 'utf-8')
  const error = readFileSync('error.txt', 'utf-8')
  res.json({
    hash,
    error,
  })
}

module.exports = {
  deploy,
  index,
}
