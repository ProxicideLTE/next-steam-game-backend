/**
 * @file user.js
 *
 * Handles all the API routes for the user account.
 *
 */
const express = require('express')
const router = express.Router()
const axios = require('axios')

const User = require('../models/User')
const UserUtils = require('../util/util.user')

require('dotenv').config()

const STEAM_API = 'http://api.steampowered.com/IPlayerService/GetOwnedGames/v1/'

const getSteamAPIHostURL = (userID) => {
  let steamURL = `${STEAM_API}?key=${process.env.STEAM_API_KEY}`
  steamURL += `&include_appinfo=true&steamid=${userID}`
  steamURL += `&include_played_free_games=true&format=json`

  return steamURL
}

router
  .post('/', async (req, res) => {
    try {
      const response = await UserUtils.createUser({
        id: req.body.id,
        email: req.body.email,
      })

      if (response.success) {
        res.status(201).json(response)
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  })
  .get('/:userID', async (req, res) => {
    try {
      const user = await User.find({
        id: req.params.userID,
      })

      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  })
  .patch('/:userID', async (req, res) => {
    try {
      const response = await UserUtils.insertUserSteamData(req.params.userID, {
        name: req.body.name,
        steam_id: req.body.steam_id,
      })

      if (response.success) {
        res.status(201).json(response)
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  })

  .get('/games/:userID', (req, res) => {
    axios.get(getSteamAPIHostURL(req.params.userID)).then((response) => {
      res.status(200).json(response.data)
    })
  })

module.exports = router
