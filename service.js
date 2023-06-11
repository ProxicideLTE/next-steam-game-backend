const express = require('express')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT || 3001;
const app = express()
app.use(cors({
  allow: '*'
}))

const userRouter = require('./routes/user')
app.use('/user', userRouter)

app.listen(PORT, () => {
  console.log(`Service running on port ${PORT}`)
})