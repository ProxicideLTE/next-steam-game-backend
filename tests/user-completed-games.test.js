const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../util/util.server')
const FAKE_USER = require('./fake.user')
require('dotenv').config()

beforeAll(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING)
})

describe('/user/games/complete', () => {
  describe('get', () => {
    test('all user completed games', async () => {
      const response = await request(app).get(
        `/user/games/completed/${process.env.USER_ID}`
      )
      expect(response.statusCode).toBe(200)
    })

    test('fake user completed games', async () => {
      const response = await request(app).get(`/user/games/completed/11`)
      expect(response.statusCode).toBe(400)
    })
  })

  describe('post', () => {
    test('new completed game', async () => {
      const response = await request(app).post('/user/games/completed').send({
        userID: FAKE_USER.id,
        appUserID: FAKE_USER.steam_id,
        gameAppID: '11111111',
      })

      expect(response.statusCode).toBe(201)
    })
  })

  describe('delete', () => {
    test('user completed game', async () => {
      const response = await request(app).delete('/user/games/completed').send({
        userID: FAKE_USER.id,
        appUserID: FAKE_USER.steam_id,
        gameAppID: '11111111',
      })

      expect(response.statusCode).toBe(200)
    })

    test('completed game from an unregistered user', async () => {
      const response = await request(app).delete('/user/games/completed').send({
        userID: 'xxx',
        appUserID: 'xxx',
        gameAppID: '11111111',
      })

      expect(response.statusCode).toBe(400)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
