import Product from '../models/product.model.js'
import User from '../models/user.model.js'

export const getSummary = async (req, res) => {
  try {
    const { id } = req.body
    const user = await User.findById(id)
    if(!user) {
      return res.status(400).json({message: 'Please login first'})
    }
    console.log('user', user)
    if(user.role !== 'user') {
      return res.status(400).json({message: 'You are not admin'})
    }

    const product = await Product.find() || []
    
    res.status(200).json({message: 'success', data: product.length})
  } catch (error) {
    res.status(400).json({mesage: error.message})
  }
}