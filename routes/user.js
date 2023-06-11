const express = require('express')
const router = express.Router()
const fetch = require('cross-fetch');
require('dotenv').config()


router
  .get('/games', (req, res) => {
    res.send('No user ID provided....')
  })
  .get('/games/:userid', (req, res) => {
    fetch(`${process.env.STEAM_HOST_URL}/IPlayerService/GetOwnedGames/v1/?key=${process.env.STEAM_API_KEY}&include_appinfo=true&steamid=${req.params.userid}&include_played_free_games=true&format=json`)
    .then(response => {
      return response.json()
    })
    .then(response => {
      response.response.games.forEach(game => {
        game.completed = false;
      })

      res.json(response.response)
    })
  })


module.exports = router