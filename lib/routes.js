const { deploy, index } = require('./controllers')
const { verify, auth } = require('./middleware')

const routes = app => {
  app
    .get('/deploy', auth, index)
    .post('/deploy', verify, deploy)
}

module.exports = {
  routes
}
