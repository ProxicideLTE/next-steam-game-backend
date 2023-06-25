const express = require('express')
const session = require('express-session')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(
  cors({
    allow: '*',
  })
)
app.use(
  session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
  })
)

const authRouter = require('../routes/auth')
app.use('/auth', authRouter)

const userRouter = require('../routes/user')
app.use('/user', userRouter)

const logoutRouter = require('../routes/logout')
app.use('/logout', logoutRouter)

module.exports = app
