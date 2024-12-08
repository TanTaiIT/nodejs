import mongoose from "mongoose"

const productSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: [true, 'Plase enter product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please enter product description']
  },
  price: {
    type: Number,
    required: [true, "Please enter product price"],
    maxLength: [6, "Price can't exceed 8 figure"],
  },
  ratings: {
    type: Number,
    default: 0
  },
  images: [
    {
      url: {
        type: String,
        required: true
      }
    }
  ],
  user: {
    type: Number,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: [true, "Please enter your product category"]
  },
  Stock: {
    type: Number,
    required: [true, "Please enter stock product"]
  },
  numberOfReview: {
    type: Number,
    default: 0
  },
  reviews: [{
    _id: String,
    user: {
      type: Number,
      ref: 'User',
      required: true
    },
    name: {
      type: String,
      required: true
    },
    rating: {
      type: Number,
      required: true
    },
    comment: {
      type: String,
      required: true
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const productModel = mongoose.model('Product', productSchema)
export default productModel 