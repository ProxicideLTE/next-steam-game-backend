/**
 * @file game.js
 *
 * Handles all the API routes for the user games.
 *
 */
const express = require('express')
const router = express.Router()
const fetch = require('cross-fetch')
const CompleteGame = require('../models/CompleteGame')

require('dotenv').config()

router
  .get('/', async (req, res) => {
    res.send('No game app ID provided...')
  })
  .get('/:appID', async (req, res) => {
    const response = await fetch(
      `http://store.steampowered.com/api/appdetails?appids=${req.params.appID}&json=1`
    )
    const data = await response.json()
    res.status(200).send(JSON.stringify(data))
  })
  .post('/', async (req, res) => {
    const game = new CompleteGame({
      userID: req.body.userID,
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
    const findResponse = await CompleteGame.exists({
      userID: req.body.userID,
      gameAppID: req.body.gameAppID,
    })

    if (!findResponse) {
      res.status(204).json({
        success: true,
        message: `Completed game ID '${req.body.gameAppID}' and/or user ID '${req.body.userID}' not found in database`,
      })
      return
    }

    const data = await CompleteGame.deleteOne({
      userID: req.body.userID,
      gameAppID: req.body.gameAppID,
    })
    res.status(200).json({
      success: true,
      message: data,
    })
  })

module.exports = router
