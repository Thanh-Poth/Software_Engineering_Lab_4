/**
 * Doctors API.
 * GET  /api/doctors → list all doctors
 * POST /api/doctors → create a doctor { name, specialty }
 */
import express from 'express'
const router = express.Router()

const doctors = [
  { id: 1, name: 'Dr. Sarah Lee', specialty: 'Cardiology' },
  { id: 2, name: 'Dr. Amir Khan', specialty: 'Pediatrics' }
]

router.get('/api/doctors', (_req, res) => res.status(200).json(doctors))

router.post('/api/doctors', (req, res) => {
  const { name, specialty } = req.body ?? {}
  if (typeof name !== 'string' || !name.trim() || typeof specialty !== 'string' || !specialty.trim()) {
    return res.status(400).json({ error: 'Missing or invalid fields (name, specialty: non-empty strings)' })
  }
  const newDoctor = { id: doctors.length + 1, name: name.trim(), specialty: specialty.trim() }
  doctors.push(newDoctor)
  return res.status(201).json(newDoctor)
})

export default router
