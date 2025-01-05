import { Router } from "express"
import multer from "multer"
// import { uploadFile } from "../utils/index.js"
import cloudinary from "../config/cloundinary.js"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { getProductBySlug, createProduct, getAllProducts } from "../controllers/product.controller.js"
const productRouter = Router()

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ecommerce',
    format: async () => 'png', 
    public_id: (file) => file.originalname
  }
})

const upload = multer({ storage: storage })
productRouter.post('/products', upload.fields([{ name: 'images', maxCount: 10 }]), createProduct)
productRouter.get('/products', getAllProducts)

export default productRouter





