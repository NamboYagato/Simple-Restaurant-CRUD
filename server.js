require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conectado ao Banco de Dados'))

app.use(express.json())

const pratosRouter = require('./routes/pratos')
app.use('/pratos', pratosRouter)


app.listen(8080, () => console.log('Servidor Iniciado'))
