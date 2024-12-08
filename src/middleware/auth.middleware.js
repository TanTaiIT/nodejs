import { promisify } from 'util'
import userModel from '../models/user.model.js'
export const authUser = async (req, res, next) => {
  const { token } = req.cookies

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