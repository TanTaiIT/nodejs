import slugify from 'slugify'
import Product from '../models/product.model.js'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3'
import cloudinary from '../config/cloundinary.js'


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
  const products = await Product.find()
  if (products) {
    return res.status(200).json({ products })
  }
  return res.status(400).json({ error: 'Products not found' })
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, ratings, category, Stock } = req.body
    // const file = await Promise.all(req.files.map(async file => {
    //   const s3 = new S3Client({
    //     credentials: {
    //       accessKeyId: process.env.ASW_ACCESS_KEY,
    //       secretAccessKey: process.env.ASW_SECRET_KEY,
    //     },
    //     region: process.env.AWS_BUCKET_REGION
    //   })
    //   const params = {
    //     Bucket: process.env.AWS_BUCKET_NAME,
    //     Key: file.originalname,
    //     Body: file.buffer,
    //     ACL: 'public-read'    
    //   }
      
    //   const command = new PutObjectCommand(params)
    //   await s3.send(command)
    //   const cacheBuster = Date.now();
    //   const productImgUrl = `https://${params.Bucket}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${params.Key}?cacheBuster=${cacheBuster}`
  
    //   return productImgUrl
      
    // }))
    
    const file = req.files.images.map(file => {
      return file.path
    })

    const products = await Product.create({
      name, 
      description,
      price,
      ratings,
      category,
      Stock,
      images: file
    })
    if(!products) {
      return res.status(400).json({message: 'product create fail'})
    }

    res.status(200).json({mesage: 'success', products})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
  
}