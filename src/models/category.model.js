import mongoose from 'mongoose'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    required: true,
    unique: true
  },
  
  type: {
    type: String
  },

  parentId: {
    parentId: String
  }
}, {
  timestamps: true
})

export default mongoose.model('Category', categorySchema)