/**
 * @file logout.js
 *
 * Handles all the functionally when the user logouts from the web app.
 *
 */
const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  req.session.destroy()
})

module.exports = router
