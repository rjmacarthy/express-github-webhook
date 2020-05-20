const { writeFileSync, readFileSync } = require('fs')
const { exec } = require('child_process')
const { EXEC_SCRIPT, BRANCH } = process.env
const { writeErr, writeHash } = require('./logger')

const deploy = (req, res) => {
  const { ref, after: sha } = req.body
  const isTargetBranch = ref === BRANCH

  if (!isTargetBranch) {
    return res.end()
  }

  exec(`sh ${EXEC_SCRIPT}`, (err, stdout, stderr) => {
    if (err) {
      writeErr(stderr)
    } else {
      writeErr('')
      writeHash(sha)
      writeStdOut(stdout)
    }
  })

  res.end()
}

const index = (_, res) => {
  res.end()
}

const hash = (_, res) => {
  res.json(readFileSync('hash.txt', 'utf-8'))
}

const error = (_, res) => {
  res.json(readFileSync('error.txt', 'utf-8'))
}

module.exports = {
  deploy,
  index,
  hash,
  error,
}
