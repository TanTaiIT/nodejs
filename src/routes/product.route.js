import { Router } from "express"
import multer from "multer"
import { getProductBySlug, createProduct, getAllProducts } from "../controllers/product.controller.js"
const productRouter = Router()

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      cb(new Error('Invalid file type'))
    }
  }
})
productRouter.post('/products', upload.single('file'), createProduct)
productRouter.get('/products', getAllProducts)

export default productRouter


