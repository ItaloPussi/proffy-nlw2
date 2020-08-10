import cors from 'cors'
import express from 'express'

import authMiddleware from './middlewares/auth'
import ConnectionsController from './controllers/ConnectionsController'
import ClassesController from './controllers/ClassesController'
import AuthController from './controllers/AuthController'
const routes = express.Router()

const connectionsController = new ConnectionsController()
const classesController = new ClassesController()
const authController = new AuthController()
routes.use(cors())

routes.post('/register', authController.register)
routes.post('/login', authController.login)

routes.get('/connections', connectionsController.index)

routes.use(authMiddleware)

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.post('/connections', connectionsController.create)



export default routes