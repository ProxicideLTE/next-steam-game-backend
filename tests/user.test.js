const mongoose = require('mongoose')
const request = require('supertest')

const app = require('../util/util.server')
require('dotenv').config()

const TEST_USER = {
  id: 'XXXXXXXXX',
  email: 'test.email@gmail.com',
}

beforeAll(async () => {
  await mongoose.connect(process.env.DB_CONNECTION_STRING)
})

describe('/user', () => {
  describe('get', () => {
    test('an existing user record', async () => {
      const response = await request(app).get(`/user/${process.env.USER_ID}`)
      expect(response.statusCode).toBe(200)
    })

    test('a non-existing user record', async () => {
      const response = await request(app).get(`/user/${TEST_USER.id}`)
      expect(response.statusCode).toBe(400)
    })
  })

  describe('post', () => {
    test('a new user record', async () => {
      const response = await request(app).post(`/user`).send({
        id: TEST_USER.id,
        email: TEST_USER.email,
      })
      expect(response.statusCode).toBe(201)
    })

    test('a duplicate user entry', async () => {
      const response = await request(app).post(`/user`).send({
        id: TEST_USER.id,
        email: TEST_USER.email,
      })
      expect(response.statusCode).toBe(400)
    })
  })

  describe('delete', () => {
    test('an existing user record', async () => {
      const response = await request(app).delete(`/user/${TEST_USER.id}`)
      expect(response.statusCode).toBe(200)
    })

    test('an non-existing user', async () => {
      const response = await request(app).delete(`/user/YYYYYYYYY`)
      expect(response.statusCode).toBe(400)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
