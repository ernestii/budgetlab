import express from 'express'
import trpc from '@/trpc'

const router = express.Router()

router.use('/trpc', trpc)

router.get('/', async (req, res) => {
  res.send('budgetlab')
})

router.get('/healthcheck', async (req, res) => {
  res.send('OK')
})

export default router
