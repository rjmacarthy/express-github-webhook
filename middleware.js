const crypto = require('crypto')
const { SECRET, BASIC_AUTH_PASSWORD } = process.env
const { writeErr } = require('./logger')
const basicAuth = require('express-basic-auth')

const verify = (req, _, next) => {
  try {
    if (!req.body) {
      return next('Request body empty')
    }
    const payload = JSON.stringify(req.body)
    const signature = req.get('x-hub-signature') || ''
    const hmac = crypto.createHmac('sha1', SECRET)
    const digest = Buffer.from(
    `sha1=${hmac.update(payload).digest('hex')}`,
    'utf8'
    )
    const checksum = Buffer.from(signature, 'utf8')
    if (
      checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
    ) {
      return next(
        'Request body digest did not match x-hub-signature'
      )
    }
    return next()
  } catch (e) {
    writeErr(e.message)
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
