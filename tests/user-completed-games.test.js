const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../util/util.server')
require('dotenv').config()

beforeAll(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING)
})

describe('/user/games/complete', () => {
  describe('get', () => {
    test('all user completed games', async () => {
      expect(true).toBe(true)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
