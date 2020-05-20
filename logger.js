const { writeFileSync } = require('fs')

const writeErr = err => {
  writeFileSync('error.txt', err)
}

const writeHash = hash => {
  writeFileSync('hash.txt', hash)
}

module.exports = {
  writeErr,
  writeHash,
}
