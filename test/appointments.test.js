import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

const endpoint = '/api/appointments'

const validAppointment = {
  doctor: 'Dr. Lee',
  patient: 'Alice Martin',
  date: '2026-12-10T10:00:00Z'
}

describe('Appointments API', () => {
  it('returns an array with HTTP 200', async () => {
    const res = await request(app).get(endpoint)

    expect(res.status).toBe(200)
    expect(res.headers['content-type']).toMatch(/application\/json/)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('creates an appointment and makes it available in the list', async () => {
    const res = await request(app)
      .post(endpoint)
      .send(validAppointment)

    expect(res.status).toBe(201)
    expect(res.body).toEqual({
      id: expect.any(Number),
      ...validAppointment
    })

    const list = await request(app).get(endpoint)

    expect(list.status).toBe(200)
    expect(list.body).toContainEqual(res.body)
  })

  it('assigns distinct IDs to successive appointments', async () => {
    const first = await request(app).post(endpoint).send(validAppointment)
    const second = await request(app).post(endpoint).send(validAppointment)

    expect(first.status).toBe(201)
    expect(second.status).toBe(201)
    expect(first.body.id).not.toBe(second.body.id)
  })

  it('removes surrounding spaces from accepted fields', async () => {
    const res = await request(app).post(endpoint).send({
      doctor: '  Dr. Lee  ',
      patient: '  Alice Martin  ',
      date: '  2026-12-10T10:00:00Z  '
    })

    expect(res.status).toBe(201)
    expect(res.body).toEqual({
      id: expect.any(Number),
      ...validAppointment
    })
  })

  for (const field of ['doctor', 'patient', 'date']) {
    for (const invalidValue of [undefined, '', '   ', null, 123]) {
      it(`rejects ${field}=${String(invalidValue)} without adding an appointment`, async () => {
        const before = await request(app).get(endpoint)
        const payload = { ...validAppointment }

        if (invalidValue === undefined) {
          delete payload[field]
        } else {
          payload[field] = invalidValue
        }

        const res = await request(app).post(endpoint).send(payload)

        expect(res.status).toBe(400)
        expect(res.body).toHaveProperty('error', expect.any(String))

        const after = await request(app).get(endpoint)

        expect(after.body).toEqual(before.body)
      })
    }
  }

  it('rejects a request without a body', async () => {
    const before = await request(app).get(endpoint)
    const res = await request(app).post(endpoint)

    expect(res.status).toBe(400)

    const after = await request(app).get(endpoint)

    expect(after.body).toEqual(before.body)
  })
})
