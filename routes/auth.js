/**
 * @file auth.js
 *
 * Manages all the user authenication to the web app.
 *
 */
const express = require('express')
const SteamAuth = require('node-steam-openid')
const router = express.Router()
const User = require('./../models/User')

require('dotenv').config()

const steam = new SteamAuth({
  realm: 'http://localhost:3001',
  returnUrl: 'http://localhost:3001/auth/steam/authenticate?',
  apiKey: process.env.STEAM_API_KEY,
})

router
  .get('/', async (req, res) => {
    res.send('AUTH')
  })
  .get('/steam', async (req, res) => {
    const response = await steam.getRedirectUrl()

    res.status(200).json({
      success: true,
      URL: response,
    })
  })
  .get('/steam/authenticate', async (req, res) => {
    try {
      const response = await steam.authenticate(req)
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      })
    }
  })

module.exports = router
