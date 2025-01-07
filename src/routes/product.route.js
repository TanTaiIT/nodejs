import { Router } from "express"
import multer from "multer"
import cloudinary from "../config/cloundinary.js"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { createProduct, getAllProducts, deleteProduct, updateProduct } from "../controllers/product.controller.js"
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
productRouter.delete('/products', deleteProduct)
productRouter.put('/products', upload.fields([{ name: 'images', maxCount: 10 }]), updateProduct)

export default productRouter





