const { deploy, index } = require('./controllers')
const { verify, auth } = require('./middleware')

const router = app => {
  app
    .get('/deploy', auth, index)
    .post('/deploy', verify, deploy)
}

module.exports = {
  router
}
