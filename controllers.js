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
      writeFileSync('log.txt', stderr)
      res.json({
        error: stderr,
      })
    } else {
      writeFileSync('log.txt', ref)
      res.json(stdout)
    }
  })
}

const index = (_, res) => {
  const lastSha = readFileSync('log.txt', 'utf-8')
  res.json({
    last: lastSha,
  })
}

module.exports = {
  deploy,
  index,
}
