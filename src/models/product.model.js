import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  slug: {
    type: String,
    unique: true,
    required: true
  },

  price: {
    type: Number,
    required: true,
    trim: true
  },

  quantity: {
    type: Number,
    required: true,

  },

  description: {
    type: String,
    required: true,
    trim: true
  },
  
  offer: {
    type: Number
  },

  productPicture: [
    {
      img: {
        type: String
      }
    }
  ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  updatedAt: Date
}, {
  timestamps: true
})

export default mongoose.model('Product', productSchema)