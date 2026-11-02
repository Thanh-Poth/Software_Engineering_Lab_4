import { Router } from 'express'

const router = Router()

// In-memory storage: reset when the server restarts.
const appointments = []
let nextId = 1

// Retrieve all appointments.
router.get('/api/appointments', (_req, res) => {
  res.status(200).json(appointments)
})

// Create an appointment.
router.post('/api/appointments', (req, res) => {
  const { doctor, patient, date } = req.body || {}

  // Each required field must be a non-empty string.
  const fields = [doctor, patient, date]
  const valid = fields.every(
    value => typeof value === 'string' && value.trim().length > 0
  )

  if (!valid) {
    return res.status(400).json({
      error: 'Doctor, patient and date are required non-empty strings'
    })
  }

  const appointment = {
    id: nextId++,
    doctor: doctor.trim(),
    patient: patient.trim(),
    date: date.trim()
  }

  appointments.push(appointment)

  return res.status(201).json(appointment)
})

export default router
