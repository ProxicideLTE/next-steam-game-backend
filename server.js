const mongoose = require('mongoose')
const app = require('./util/util.server')
require('dotenv').config()

const PORT = process.env.PORT || 3001

app.listen(PORT, async () => {
  console.log(`Service running on port ${PORT}`)

  try {
    mongoose.connect(process.env.DB_CONNECTION_STRING)
    const db = mongoose.connection
    db.on('error', (error) => {
      throw new Error('Failed to connect to database:', error)
    })
    db.once('open', (error) => {
      console.log('Connected to database')
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})
