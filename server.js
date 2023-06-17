const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const PORT = process.env.PORT || 3001
const app = express()

app.use(express.json())
app.use(
  cors({
    allow: '*',
  })
)

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
const db = mongoose.connection
db.on('error', (error) => {
  console.error(error)
})
db.once('open', (error) => {
  console.log('Connected to database')
})

const authRouter = require('./routes/auth')
app.use('/auth', authRouter)

const userRouter = require('./routes/user')
app.use('/user', userRouter)

const gameRouter = require('./routes/game')
app.use('/game', gameRouter)

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`)
})
