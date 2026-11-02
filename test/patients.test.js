/**
 * Integration tests for /api/patients.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('GET /api/patients', () => {
  it('returns an array of patients', async () => {
    const res = await request(app).get('/api/patients')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toHaveProperty('name')
  })
})

describe('POST /api/patients', () => {
  it('creates a patient and returns 201 with an id', async () => {
    const res = await request(app).post('/api/patients').send({ name: 'Marie', age: 29 })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toMatchObject({ name: 'Marie', age: 29 })
  })

  it('makes the new patient visible in GET', async () => {
    await request(app).post('/api/patients').send({ name: 'Zoe', age: 51 })
    const res = await request(app).get('/api/patients')
    expect(res.body.some(p => p.name === 'Zoe')).toBe(true)
  })

  it.each([
    [{}],
    [{ name: 'NoAge' }],
    [{ age: 20 }],
    [{ name: '  ', age: 20 }],
    [{ name: 'Bad', age: -3 }],
    [{ name: 'Bad', age: 'old' }]
  ])('returns 400 for invalid body %j', async (body) => {
    const res = await request(app).post('/api/patients').send(body)
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('returns 400 when no body is sent', async () => {
    const res = await request(app).post('/api/patients')
    expect(res.status).toBe(400)
  })
})
