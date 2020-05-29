const { deploy, index } = require('./controllers')
const { verify } = require('./middleware')
const basicAuth = require('express-basic-auth')
const password = process.env.BASIC_AUTH_PASSWORD

const opts = {
  challenge: true,
  users: { admin: password }
}

const router = app => {
  app
    .get('/deploy', basicAuth(opts), index)
    .post('/deploy', verify, deploy)
}

module.exports = {
  router
}
