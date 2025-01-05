import { promisify } from 'util'
import userModel from '../models/user.model.js'
import jwt from 'jsonwebtoken'
const getAuthorizeToken = (header) => {
  const authorizeToken = header.authorization
  if(authorizeToken && authorizeToken.startsWith('Bearer')) {
    return authorizeToken.split(' ')[1]
  }

  return null
}
export const authUser = async (req, res, next) => {
  const token = getAuthorizeToken(req.headers)
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Please login again'
    })
  }

  const decodeToken = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY)

  req.user = await userModel.findById(decodeToken.id)

  next()
}