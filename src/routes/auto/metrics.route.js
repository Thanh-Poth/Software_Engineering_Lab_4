import { Router } from 'express'
import { patients } from './patients.route.js'

const router = Router()

router.get('/api/metrics', (_req, res) => {
  res.status(200).json({
    uptimeSeconds: process.uptime(),
    memoryUsedMB: Math.round(
      process.memoryUsage().rss / (1024 * 1024) * 100
    ) / 100,
    totalPatients: patients.length
  })
})

export default router
