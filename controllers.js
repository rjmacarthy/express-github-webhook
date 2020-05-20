const { writeFileSync, readFileSync } = require('fs')
const { exec } = require('child_process')
const { EXEC_SCRIPT } = process.env

const deploy = (req, res) => {
  const { refs, ref } = req.body
  const master = refs === 'refs/heads/master'

  if (!master) {
    return res.json(false)
  }

  exec(`sh ${EXEC_SCRIPT}`, (err, stdout, stderr) => {
    if (err) {
      writeFileSync('error.txt', stderr)
      res.json({
        error: stderr,
      })
    } else {
      writeFileSync('error.txt', '')
      writeFileSync('log.txt', ref)
      res.json(stdout)
    }
  })
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
