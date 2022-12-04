import * as trpc from '@trpc/server'
import prisma from '@/modules/prisma'

export const createContext = () => {
  return {
    prisma,
  }
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>
