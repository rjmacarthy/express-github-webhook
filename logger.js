const { existsSync, writeFileSync, mkdirSync, readFileSync } = require('fs')

const logPaths = [
  'error.log',
  'stdout.log'
]

const init = () => {
  !existsSync('./log') && mkdirSync('./log')
  logPaths.map((p) => {
    const path = `./log/${p}`
    !existsSync() && writeFileSync(path, '')
  })
}

const writeErr = err => {
  writeFileSync('./log/error.log', err)
}

const writeStdout = stdout => {
  writeFileSync('./log/stdout.log', stdout)
}

const getLog = name => readFileSync(`./log/${name}.log`, 'utf-8') || ''

module.exports = {
  writeErr,
  writeStdout,
  init,
  getLog
}
