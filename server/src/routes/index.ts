import express from 'express'
const router = express.Router()
import prisma from '@/modules/prisma'

router.get('/', async (req, res) => {
  res.send('budgetlab')
})

router.get('/healthcheck', async (req, res) => {
  res.send('OK')
})

export default router
