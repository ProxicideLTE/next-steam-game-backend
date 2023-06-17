/**
 * @file user.existing.js
 *
 * Check the user collection/table and see if the user exists or not.
 *
 */
const User = require('../models/User')

const doesUserExist = async (id) => {
  const response = await User.find({
    id,
  })

  return response.length > 0 ? true : false
}

module.exports = doesUserExist
