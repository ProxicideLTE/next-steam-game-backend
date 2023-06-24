/**
 * @file CompletedGame.js
 *
 * Determines the database schema for a completed game.
 *
 */
const mongoose = require('mongoose')

const COMPLETE_GAME_SCHEMA = new mongoose.Schema({
  userID: {
    type: String,
    require: true,
  },
  appUserID: {
    type: String,
    require: true,
  },
  gameAppID: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
    default: Date.now,
  },
})

module.exports = mongoose.model('CompletedGame', COMPLETE_GAME_SCHEMA)
