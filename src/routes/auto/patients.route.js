/**
 * Patients API.
 * GET  /api/patients → list all patients
 * POST /api/patients → create a patient { name, age }
 */
import { Router } from 'express'

const router = Router()

const patients = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'John', age: 45 }
]

router.get('/api/patients', (_req, res) => res.status(200).json(patients))

router.post('/api/patients', (req, res) => {
  const { name, age } = req.body
  if (typeof name !== 'string' || !name.trim() || !Number.isInteger(age) || age <= 0) {
    return res.status(400).json({ error: 'Missing or invalid fields (name: string, age: positive integer)' })
  }
  const newPatient = { id: patients.length + 1, name: name.trim(), age }
  patients.push(newPatient)
  res.status(201).json(newPatient)
})

export default router
