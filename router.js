const { deploy, index, hash, error } = require('./controllers')
const { verify } = require('./middleware')

const router = app => {
  app
    .get('/', index)
    .post('/deploy', verify, deploy)

  app.get('/hash', hash)
    .get('/error', error)
}

module.exports = {
  router,
}
