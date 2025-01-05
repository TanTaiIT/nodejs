import multer from "multer"
import { v2 as cloudinary } from 'cloudinary'
export const uploadFile = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
      cb(null, true)
    } else {
      cb(new Error('Invalid file uploaded'))
    }
  }
})

export const generateSlut = (name) => {
  return name.toLowerCase().trim().replace(/[^\w ]+/g, '-').replace(/^-+|-+$/g, '')
}

export const cloudinaryStorageData = cloudinary.config({
  cloud_name: 'ds4dqc7s5', 
  api_key: '598854437854472', 
  api_secret: 'pS0P5lh9dwMQp-wpKfhs2iLw2PI'
})