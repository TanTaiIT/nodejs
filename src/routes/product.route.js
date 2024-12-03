import { Router } from "express"
import multer from "multer"
import { getProductBySlug, createProduct, getAllProducts } from "../controllers/product.controller.js"
const productRouter = Router()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({storage: storage})
// const uploads = multer({ dest: 'uploads/' })

// productRouter.get('/products/:slug', getProductBySlug)
productRouter.post('/products', upload.single('file'), createProduct)
productRouter.get('/products', getAllProducts)

export default productRouter


