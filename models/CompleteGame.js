/**
 * @file CompleteGame.js
 *
 * Determines the database schema for a complete game.
 *
 */
const mongoose = require('mongoose')

const COMPLETE_GAME_SCHEMA = new mongoose.Schema({
  userID: {
    type: Number,
    require: true,
  },
  gameAppID: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
})

module.exports = mongoose.model('CompleteGame', COMPLETE_GAME_SCHEMA)
