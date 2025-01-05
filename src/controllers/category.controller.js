import Category from './../models/category.model.js'
import { generateSlut } from '../utils/index.js'

export const createCategory = async (req, res) => {
  try {
    const { name, parentId, type } = req.body

    const slugName = generateSlut(name)
    const category = await Category.create({
      name,
      type,
      parentId,
      slug: slugName
    })
    return res.status(200).json({message: 'sucess', data: category})

  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find()

    if(!categories) {
      return res.status(400).json({message: 'fail', data: []})
    }

    res.status(200).json({message: 'sucess', categories})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}