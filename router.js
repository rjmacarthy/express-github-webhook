const { deploy, index } = require('./controllers')
const { verify } = require('./middleware')

const router = app => {
  app
    .get('/deploy', index)
    .post('/deploy', verify, deploy)
}

module.exports = {
  router,
}
