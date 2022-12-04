import express from 'express'
import { createContext } from './context'
import { initTRPC } from '@trpc/server'
import * as trpcExpress from '@trpc/server/adapters/express'
import type { Context } from './context'

const router = express.Router()
const t = initTRPC.context<Context>().create()

const appRouter = t.router({
  getExpenses: t.procedure.query(({ ctx }) => {
    return ctx.prisma.expense.findMany({
      include: {
        account: true,
        category: true,
        user: true,
      },
    })
  }),
})

router.use('/', trpcExpress.createExpressMiddleware({ router: appRouter, createContext }))

export type AppRouter = typeof appRouter
export default router
