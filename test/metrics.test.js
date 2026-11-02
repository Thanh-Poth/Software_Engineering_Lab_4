import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/app.js'

describe('GET /api/metrics', () => {
  it('returns system statistics as JSON', async () => {
    const res = await request(app).get('/api/metrics')

    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toContain('application/json')
    expect(res.body.uptimeSeconds).toEqual(expect.any(Number))
    expect(res.body.uptimeSeconds).toBeGreaterThanOrEqual(0)
    expect(res.body.memoryUsedMB).toEqual(expect.any(Number))
    expect(res.body.memoryUsedMB).toBeGreaterThan(0)
  })

  it('returns the current number of patients', async () => {
    const patients = await request(app).get('/api/patients')
    const metrics = await request(app).get('/api/metrics')

    expect(metrics.status).toBe(200)
    expect(metrics.body.totalPatients).toBe(patients.body.length)
  })

  it('updates the count after adding a patient', async () => {
    const before = await request(app).get('/api/metrics')

    const created = await request(app)
      .post('/api/patients')
      .send({ name: 'Metrics Test', age: 30 })

    expect(created.status).toBe(201)

    const after = await request(app).get('/api/metrics')

    expect(after.body.totalPatients).toBe(before.body.totalPatients + 1)
  })
})
