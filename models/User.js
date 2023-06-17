/**
 * @file User.js
 *
 * Determines the database schema for a user.
 *
 */
const mongoose = require('mongoose')

const USER_SCHEMA = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  steam_id: {
    type: Number,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
})

module.exports = mongoose.model('User', USER_SCHEMA)
