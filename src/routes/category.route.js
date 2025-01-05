import express from 'express'
import { authUser } from '../middleware/auth.middleware.js'
import { createCategory, getCategories } from '../controllers/category.controller.js'
const categoryRouter = express.Router()

categoryRouter.get('/categories', authUser, getCategories)

categoryRouter.post('/categories', authUser, createCategory)

export default categoryRouter