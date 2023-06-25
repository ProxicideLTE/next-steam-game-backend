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
    try {
      const data = await CompletedGame.find({ userID: req.params.userID })

      if (data.length === 0) {
        throw new Error('No complete games found for user.')
      }

      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })
    }
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
    try {
      const findResponse = await CompletedGame.exists({
        userID: req.body.userID,
        appUserID: req.body.appUserID,
        gameAppID: req.body.gameAppID,
      })

      if (!findResponse) {
        throw new Error(
          `Completed game ID '${req.body.gameAppID}' and/or user ID '${req.body.appUserID}' not found in database`
        )
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
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      })
    }
  })

module.exports = router
