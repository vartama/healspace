require('dotenv').config()
const express = require('express')
const cors = require('cors')
const errorHandling = require('./middlewares/errorHandling')
const router = require('./routes')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(router)
app.use(errorHandling)

module.exports = app