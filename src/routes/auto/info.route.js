/**
 * GET /info → merges two small helpers for easy unit testing.
 * Returns: { name, version, node, uptime }
 */
import { Router } from 'express'
import { getPackageInfo, getRuntimeInfo } from '../../utils/appInfo.js'

const router = Router()

router.get('/info', (_req, res) => {
  const { name, version } = getPackageInfo()
  const { node, uptime } = getRuntimeInfo()
  res.status(200).json({ name, version, node, uptime: Number(uptime.toFixed(2)) })
})

export default router
