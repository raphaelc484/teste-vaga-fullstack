import { Router } from 'express'

import { receive } from './receive'
import { uploadMiddleware } from '../../middleware/multer'
import { supply } from './supply'

const routes = Router()

routes.post('/upload', uploadMiddleware, receive)
routes.get('/find', supply)

export { routes }
