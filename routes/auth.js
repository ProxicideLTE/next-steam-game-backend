/**
 * @file auth.js
 *
 * Manages all the user authenication to link the user's Steam account
 * to their Google account.
 *
 */
const express = require('express')
const SteamAuth = require('node-steam-openid')
const router = express.Router()

const UserUtils = require('../util/util.user')
require('dotenv').config()

const steam = new SteamAuth({
  realm: process.env.HOST_BACKEND,
  returnUrl: `${process.env.HOST_BACKEND}/auth/steam/authenticate`,
  apiKey: process.env.STEAM_API_KEY,
})

router
  .get('/steam/authenticate', async (req, res) => {
    try {
      const steamResponse = await steam.authenticate(req)
      const response = await UserUtils.insertUserSteamData(req.session.userID, {
        name: steamResponse.username,
        steam_id: steamResponse.steamid,
      })

      if (response.success) {
        res.redirect(`${process.env.HOST_FRONTEND}/dashboard`)
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  })
  .get('/steam/:userID', async (req, res) => {
    req.session.userID = req.params.userID
    const URL = await steam.getRedirectUrl()
    res.redirect(URL)
  })

module.exports = router
