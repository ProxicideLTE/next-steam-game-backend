/**
 * @file user.update.js
 *
 * Finds an existing user in the database and updates the records.
 *
 */
const User = require('../models/User')

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
        resolve({
          success: true,
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
  insertUserSteamData: insertUserSteamData,
}
