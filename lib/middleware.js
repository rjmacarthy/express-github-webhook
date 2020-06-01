const crypto = require('crypto')
const fs = require('fs')
const basicAuth = require('express-basic-auth')

const { SECRET, BASIC_AUTH_PASSWORD } = process.env
const logger = require('./logger')

const verify = (req, _, next) => {
  try {
    const { body } = req
    if (!body) {
      return next('ERR: Request body empty')
    }
    const signature = req.get('x-hub-signature') || ''
    const hmac = crypto.createHmac('sha1', SECRET)
    const digest = Buffer.from(
      `sha1=${hmac.update(JSON.stringify(body)).digest('hex')}`,
      'utf8'
    )
    const checksum = Buffer.from(signature, 'utf8') || ''
    const valid = checksum.length === digest.length &&
      crypto.timingSafeEqual(digest, checksum)
    if (!valid) {
      return next('ERR: Request body digest did not match x-hub-signature')
    }
    return next()
  } catch (e) {
    fs.writeFileSync(logger.logPath, log)
  }
}

const auth = basicAuth({
  challenge: true,
  users: { admin: BASIC_AUTH_PASSWORD }
})

module.exports = {
  verify,
  auth
}
