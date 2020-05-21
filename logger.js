const { writeFileSync } = require('fs')

const writeErr = err => {
  err && writeFileSync('./log/error.log', err)
}

const writeHash = hash => {
  hash && writeFileSync('./log/hash.log', hash)
}

const writeStdout = stdout => {
  stdout && writeFileSync('./log/stdout.log', stdout)
}

module.exports = {
  writeErr,
  writeHash,
  writeStdout
}
