const SteamAuth = require('node-steam-openid')
require('dotenv').config()

class NextGameAuth {
  steam

  constructor(returnUrl) {
    this.steam = new SteamAuth({
      realm: process.env.HOST_BACKEND,
      returnUrl,
      apiKey: process.env.STEAM_API_KEY,
    })
  }

  getAuth() {
    return this.steam
  }

  getRedirectURL() {
    return this.steam.getRedirectUrl()
  }
}

module.exports = NextGameAuth
