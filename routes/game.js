/**
 * @file game.js
 *
 * Handles all the API routes for the user games.
 *
 */
const express = require('express')
const router = express.Router()
const axios = require('axios')
const CompletedGame = require('../models/CompleteGame')

require('dotenv').config()

const STEAM_API = 'http://store.steampowered.com/api/appdetails'

router
  .get('/', async (req, res) => {
    res.send('No game app ID provided...')
  })
  .get('/:appID', (req, res) => {
    axios
      .get(`${STEAM_API}?appids=${req.params.appID}&json=1`)
      .then((response) => {
        res.status(200).json(response.data)
      })
  })
  .post('/', async (req, res) => {
    const game = new CompletedGame({
      userID: req.body.userID,
      appUserID: req.body.appUserID,
      gameAppID: req.body.gameAppID,
    })

    try {
      const response = await game.save()
      res.status(201).json(response)
    } catch (err) {
      res.status(400).json({ success: false, message: error.message })
    }
  })
  .delete('/', async (req, res) => {
    const findResponse = await CompletedGame.exists({
      userID: req.body.userID,
      appUserID: req.body.appUserID,
      gameAppID: req.body.gameAppID,
    })

    if (!findResponse) {
      res.status(204).json({
        success: true,
        message: `Completed game ID '${req.body.gameAppID}' and/or user ID '${req.body.appUserID}' not found in database`,
      })
      return
    }

    const data = await CompletedGame.deleteOne({
      userID: req.body.userID,
      appUserID: req.body.appUserID,
      gameAppID: req.body.gameAppID,
    })
    res.status(200).json({
      success: true,
      message: data,
    })
  })

module.exports = router
