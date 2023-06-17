/**
 * @file user.js
 *
 * Handles all the API routes for the user.
 *
 */
const express = require('express')
const router = express.Router()
const fetch = require('cross-fetch')

const User = require('../models/User')
const CreateUser = require('../lib/user.create')
const DoesUserExist = require('../lib/user.existing')
const UpdateUser = require('../lib/user.update')

require('dotenv').config()

router
  .post('/', async (req, res) => {
    try {
      const response = await CreateUser({
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
      const response = await UpdateUser.insertUserSteamData(req.params.userID, {
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

  .get('/games/:userid', (req, res) => {
    fetch(
      `${process.env.STEAM_HOST_URL}/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&include_appinfo=true&steamid=${req.params.userid}&include_played_free_games=true&format=json`
    )
      .then((response) => {
        return response.json()
      })
      .then((response) => {
        res.json(response.response)
      })
  })

module.exports = router
