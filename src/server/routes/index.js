import express from 'express'
import authentication from './authentication'
import crystals from './crystals'
import journals from './journals'
import users from './users'

const routes = express.Router()

routes.get('/')
routes.use('/', authentication)
routes.use('/crystals', crystals)
routes.use('/journals', journals)
routes.use('/users', users)

export default routes
