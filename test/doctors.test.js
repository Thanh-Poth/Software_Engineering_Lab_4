/**
 * Integration tests for /api/doctors.
 */
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

describe('GET /api/doctors', () => {
  it('returns an array of doctors', async () => {
    const res = await request(app).get('/api/doctors')
    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
    expect(res.body[0]).toEqual({ id: 1, name: 'Dr. Sarah Lee', specialty: 'Cardiology' })
  })
})

describe('POST /api/doctors', () => {
  it('creates a doctor and returns 201 with an id', async () => {
    const res = await request(app).post('/api/doctors').send({ name: 'Dr. Julie', specialty: 'Neurology' })
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('id')
    expect(res.body).toMatchObject({ name: 'Dr. Julie', specialty: 'Neurology' })
  })

  it('makes the new doctor visible in GET', async () => {
    await request(app).post('/api/doctors').send({ name: 'Dr. Paul', specialty: 'ENT' })
    const res = await request(app).get('/api/doctors')
    expect(res.body.some(d => d.name === 'Dr. Paul')).toBe(true)
  })

  it.each([
    [{}],
    [{ name: 'Dr. NoSpecialty' }],
    [{ specialty: 'Cardiology' }],
    [{ name: '  ', specialty: 'ENT' }],
    [{ name: 'Dr. Bad', specialty: 42 }]
  ])('returns 400 for invalid body %j', async (body) => {
    const res = await request(app).post('/api/doctors').send(body)
    expect(res.status).toBe(400)
    expect(res.body).toHaveProperty('error')
  })

  it('returns 400 when no body is sent', async () => {
    const res = await request(app).post('/api/doctors')
    expect(res.status).toBe(400)
  })
})
