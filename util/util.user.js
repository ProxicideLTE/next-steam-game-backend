/**
 * @file util.user.js
 *
 *
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

const doesUserExist = async (id) => {
  const users = await User.find({
    id,
  })

  return users.length > 0 ? true : false
}

const insertUserSteamData = (id, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await User.updateOne(
        { id },
        {
          name: data.name,
          steam_id: data.steam_id,
        }
      )

      if (response.modifiedCount === 0) {
        reject({
          success: false,
          message: `User ID '${id}' doesn't exist in database`,
        })
      }

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

module.exports = {
  createUser: createUser,
  doesUserExist: doesUserExist,
  insertUserSteamData: insertUserSteamData,
}
