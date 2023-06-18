/**
 * @file auth.js
 *
 * Manages all the user authenication to the web app.
 *
 */
const express = require('express')
const router = express.Router()
const NextGameAuth = require('./../class/auth')
const UserUtils = require('../util/util.user')

require('dotenv').config()
let authObj

router
  .get('/', async (req, res) => {
    res.send('AUTH')
  })

  .get('/steam/:userID', async (req, res) => {
    authObj = new NextGameAuth(
      `${process.env.HOST_BACKEND}/auth/steam/authenticate/${req.params.userID}`
    )

    const URL = await authObj.getRedirectURL()
    res.redirect(URL)
  })
  .get('/steam/authenticate/:userID', async (req, res) => {
    try {
      const steamResponse = await authObj.getAuth().authenticate(req)
      const response = await UserUtils.insertUserSteamData(req.params.userID, {
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

module.exports = router
