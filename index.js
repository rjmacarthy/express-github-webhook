require('dotenv').config()
const express = require('express')
const crypto = require('crypto')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT
const SECRET = process.env.SECRET
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app
  .post('/deploy', (req, res) => {
    const payload = req.body
    const signature = `sha1=${crypto
      .createHmac('sha1', SECRET)
      .update(JSON.stringify(payload))
      .digest('hex')}`
    const event = req.headers['x-github-event']
    const allowed = req.headers['x-hub-signature'] === signature
    console.log(signature, req.headers['x-hub-signature'])
    const master = payload.ref === 'refs/heads/master'
    if (allowed && isMaster && event === 'push') {
      return res.json({ allowed, master })
    }
    res.json({ allowed, master })
  })
  .get('/deploy', (_, res) => {
    res.json('eosui-deployer')
  })

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)
