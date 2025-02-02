import express from 'express'
import connect from './src/connection/index.js'
import env from 'dotenv'
import cors from 'cors'
import path from 'path'
import { dirname } from 'path'
import morgan from 'morgan'
import bodyParser from 'body-parser'

// route
import productRouter from './src/routes/product.route.js'
import authRoute from './src/routes/auth.route.js'
import categoryRouter from './src/routes/category.route.js'
import summaryRouter from './src/routes/summary.route.js'
env.config()
const __dirname = dirname(import.meta.url)
const corsOptions = {
  origin: 'http://localhost:5000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
}
const app = express()
const port = 3000
app.use(express.json())
app.use(productRouter)
app.use(authRoute)
app.use(categoryRouter)
app.use(summaryRouter)
app.use(morgan('dev'))
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'uploads')))
connect().then(() => {
  console.log('Connected to MongoDB')
}).catch(error => {
  console.log('Error connecting to MongoDB', error)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})        