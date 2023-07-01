/**
 * @file user.js
 *
 * Handles all the API routes for the user account.
 *
 */
const express = require('express')
const router = express.Router()

const User = require('../models/User')
const UserUtils = require('../util/util.user')

require('dotenv').config()

router
  .get('/:userID', async (req, res) => {
    try {
      // Get user by ID. Only expect one record to be found.
      const user = await User.findOne({
        id: req.params.userID,
      })

      // If no user was found.
      if (!user) {
        res.status(202).json({
          success: false,
          message: `User ID '${req.params.userID}' not found in database`,
        })
      } else {
        res.status(200).json({
          success: true,
          message: user,
        })
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  })
  .delete('/:userID', async (req, res) => {
    try {
      const data = await User.deleteOne({
        id: req.params.userID,
      })

      if (data.deletedCount === 0) {
        throw new Error('Cannot delete user as no matching user was located')
      }

      res.status(200).json(data)
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  })
  .post('/', async (req, res) => {
    const { id, email } = req.body
    try {
      const isExistingUser = await UserUtils.doesUserExist(id)
      if (isExistingUser) {
        throw new Error(`Existing user found in database.`)
      }

      const data = await UserUtils.createUser({
        id,
        email,
      })

      if (data.success) {
        res.status(201).json(data)
      } else {
        throw new Error(data.message)
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message })
    }
  })

const gamesRouter = require('./games')
router.use('/games', gamesRouter)

module.exports = router
