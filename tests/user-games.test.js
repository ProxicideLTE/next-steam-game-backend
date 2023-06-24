const request = require('supertest')

const app = require('../util/util.server')
require('dotenv').config()

describe('/user/games', () => {
  describe('get', () => {
    test('a list of user owned games', async () => {
      const response = await request(app).get(
        `/user/games/${process.env.STEAM_USER_ID}`
      )
      expect(response.statusCode).toBe(200)
    })

    test('a list of games with an invalid user', async () => {
      const response = await request(app).get(`/user/games/1111111111`)
      expect(response.statusCode).toBe(400)
    })
  })
})
