import { Router } from 'express'

import wbController from './wb.controller'


const wbRouter = Router()

wbRouter.get( '/get-data', wbController.getWbApi )

export default wbRouter