/**
 * @file game.js
 *
 * Handles all the API routes for acquiring game information.
 *
 */
const express = require('express')
const router = express.Router()
const axios = require('axios')

require('dotenv').config()

const STEAM_API_URL = 'http://store.steampowered.com/api/appdetails'

router.get('/steam/:appID', (req, res) => {
  axios
    .get(`${STEAM_API_URL}?appids=${req.params.appID}&json=1`)
    .then((response) => {
      res.status(200).json(response.data)
    })
})

module.exports = router
