const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const consign = require('consign')
const db = require('./config/db')

consign()
    .include('./config/passport.js')
    .then('./config/middleweares.js')
    .then('./api')
    .then('./routes')
    .into(app)

app.db = db

const port = 3000
app.listen(port, ()=> {
    console.log('Executando backend na porta', +port)
})