/**
 * @file completed.js
 *
 * Handles all the API routes for the user's completed games.
 *
 */
const express = require('express')
const router = express.Router()

const CompletedGame = require('../models/CompletedGame')

require('dotenv').config()

router
  .get('/:userID', async (req, res) => {
    const data = await CompletedGame.find({ userID: req.params.userID })
    res.status(200).json(data)
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
