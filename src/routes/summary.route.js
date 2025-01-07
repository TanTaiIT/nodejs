import express from 'express'
import { getSummary } from '../controllers/summary.controller.js'
const summaryRouter = express.Router()
summaryRouter.get('/summary', getSummary)

export default summaryRouter