import express from 'express'
import dotenv from 'dotenv'
import router from '@/routes'
import cors from 'cors'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import connectRedis from 'connect-redis'
import { redis } from '@/modules/redis'

dotenv.config({ path: '../.env' })

const main = async () => {
  const app = express()
  const RedisStore = connectRedis(session)

  const corsMw = cors({
    credentials: true,
  })
  app.use(corsMw)
  app.options('*', corsMw)
  app.use(express.json())
  app.use(cookieParser())
  app.use(
    session({
      store: new RedisStore({ client: redis }),
      secret: 'jifdsaub43',
      resave: false,
      name: 'one',
      saveUninitialized: true,
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(router)
  app.listen(3000, () => {
    console.log('Started at http://localhost:3000')
  })
}

main().catch((err) => {
  console.error(err)
})
