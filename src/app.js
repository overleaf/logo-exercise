const express = require('express')
const helmet = require('helmet')

const app = express()

app.use(helmet())

app.set('view engine', 'pug')

app.get('/', (req, res, next) => {
  res.render('index', { color: process.env.COLOR || 'blue' })
})

module.exports = app
