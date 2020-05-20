require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const { router } = require('./router')

const port = process.env.PORT
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router(app)

app.listen(port)
