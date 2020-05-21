require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')

const { router } = require('./router')
const logger = require('./logger')

logger.init()
const port = process.env.PORT
const app = express()
app.use(helmet())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router(app)

app.listen(port)
