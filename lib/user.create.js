/**
 * @file user.create.js
 *
 * Creates a new user object in the database.
 *
 * Will not validate if the user already exists. For that
 * refer to existing-user.js file...
 *
 */
const User = require('../models/User')

const createUser = (userObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { id, email } = userObj
      const newUser = new User({
        id,
        email,
      })
      const response = await newUser.save()

      resolve({
        success: true,
        message: response,
      })
    } catch (error) {
      reject({
        success: false,
        message: error.message,
      })
    }
  })
}

module.exports = createUser
