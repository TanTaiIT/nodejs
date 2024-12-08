import slugify from 'slugify'
import Product from '../models/product.model.js'

export const getProductBySlug = (req, res) => {
  const { slug } = req.params

  Category.findOne({ slug: slug }).select('_id').exec((error, category) => {
    if (error) {
      return res.status(400).json({ error })
    }

    if (category) {
      Product.find({ category: category._id }).exec((error, products) => {
        if (error) {
          return res.status(400).json({ error })
        }

        if (products) {
          return res.status(200).json({ products })
        }
      })
    }
  })
}

export const getAllProducts = async (req, res) => {
  const products = await Product.find({}).exec()
  if (products) {
    return res.status(200).json({ products })
  }
  return res.status(400).json({ error: 'Products not found' })
}

export const createProduct = async (req, res) => {
  const { name, price, description, quantity, offer, category, createdBy } = req.body

  let productPictures = []
  if (req.file.length > 0) {
    productPictures = req.files.map(file => {
      return { img: file.filename }
    })
  }

  const product = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    offer,
    description,
    productPictures,
    category,
    createdBy
  })

  try {
    const products = await product.save()
    if (products) {
      return res.status(200).json({ products })
    }
  } catch (error) {
    res.status(200).json({ message: error })
  }

}