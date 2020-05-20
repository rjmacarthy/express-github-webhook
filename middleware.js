const crypto = require('crypto')
const { SECRET } = process.env

const verify = (req, _, next) => {
  const payload = JSON.stringify(req.body)
  if (!payload) {
    return next('Request body empty')
  }

  const sig = req.get('x-hub-signature') || ''
  const hmac = crypto.createHmac('sha1', SECRET)
  const digest = Buffer.from(
    'sha1=' + hmac.update(payload).digest('hex'),
    'utf8',
  )
  const checksum = Buffer.from(sig, 'utf8')
  if (
    checksum.length !== digest.length ||
    !crypto.timingSafeEqual(digest, checksum)
  ) {
    return next(
      `Request body digest (${digest}) did not match x-hub-signature (${checksum})`,
    )
  }
  return next()
}

module.exports = {
  verify,
}
