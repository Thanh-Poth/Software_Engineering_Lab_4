import fs from 'node:fs'
import request from 'supertest'
import app from '../src/app.js'
import { describe, it, expect } from 'vitest'

const pkg = JSON.parse(
  fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8')
)

describe('GET /version', () => {
  it('returns HTTP 200 and the exact package version', async () => {
    const res = await request(app).get('/version')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ version: pkg.version })
    expect(typeof res.body.version).toBe('string')
    expect(res.body.version.length).toBeGreaterThan(0)
  })

  it('responds with JSON content-type', async () => {
    const res = await request(app).get('/version')

    expect(res.headers['content-type']).toMatch(/application\/json/)
  })
})
