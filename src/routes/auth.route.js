import express from 'express'
import { uploadFile } from "../utils/index.js"
import { authUser } from '../middleware/auth.middleware.js'
import { registeredUser, login, getAllUsers } from '../controllers/auth.controller.js'

const authRoute = express.Router()

authRoute.post('/registered', uploadFile.single('image'), registeredUser)
authRoute.post('/login', login)
authRoute.get('/getUsers', getAllUsers)
export default authRoute