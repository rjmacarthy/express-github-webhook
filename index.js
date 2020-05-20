const express = require('express')
const crypto = require('crypto')
const app = express()
const port = 3000

app.post('/', (req, res) => {
  const signature = `sha1=${crypto
    .createHmac('sha1', SECRET)
    .update(chunk)
    .digest('hex')}`

  const event = req.headers['x-github-event']

  const isAllowed = req.headers['x-hub-signature'] === signature

  console.log(signature)

  const body = JSON.parse(chunk)

  console.log(body.ref, isAllowed)

  const isMaster = body.ref === 'refs/heads/master'

  if (isAllowed && isMaster && event === 'push') {
    console.log('deploy')
  }
}).get((req, res)=>{

})

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
)
