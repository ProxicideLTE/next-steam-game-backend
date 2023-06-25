/**
 * @file games.js
 *
 * Handles all the API routes for the user's owned games.
 *
 */
const express = require('express')
const router = express.Router()
const axios = require('axios')

require('dotenv').config()

const STEAM_API = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/'

/**
 * Builds the Steam API host URL to retrieve the user's games.
 *
 * @param {string} userID
 * @returns Steam API URL containing the API key
 */
const userSteamGamesURL = (userID) => {
  let steamURL = `${STEAM_API}?key=${process.env.STEAM_API_KEY}`
  steamURL += `&include_appinfo=true&steamid=${userID}`
  steamURL += `&include_played_free_games=true&format=json`

  return steamURL
}

router.get('/:userID', async (req, res) => {
  const { userID } = req.params

  try {
    const { data } = await axios.get(userSteamGamesURL(userID))

    res.status(200).json({
      success: true,
      message: data.response,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: `Invalid Steam user id '${userID}'`,
    })
  }
})

const completedGamesRouter = require('./completed')
router.use('/completed', completedGamesRouter)

module.exports = router
