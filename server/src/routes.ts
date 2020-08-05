import cors from 'cors'
import express from 'express'

import ConnectionsController from './controllers/ConnectionsController'
import ClassesController from './controllers/ClassesController'
const routes = express.Router()

const connectionsController = new ConnectionsController()
const classesController = new ClassesController()

routes.use(cors())

routes.get('/classes', classesController.index)
routes.post('/classes', classesController.create)

routes.get('/connections', connectionsController.index)
routes.post('/connections', connectionsController.create)

export default routes