import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: [true, "Please enter your name"],
    maxLength: [30, "Name can't exceed 30 characters"],
    minLength: [2, "Name must be atleast of 2 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter valid email"]
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be atleast 6 characters"],
    select: false
  },
  avatar: {
    type: String,
    required: true
  },
  wishlist: {
    type: [
      {
        _id: String,
        name: {
          type: String,
          required: [true, "Please enter product name"],
          trim: true
        },
        description: {
          type: String,
          required: [true, "Please enter product description"],

        },
        price: {
          type: Number,
          maxLength: [6, "Product price can't exceed 6 figures"]
        },
        ratings: {
          type: Number,
          default: 0
        },
        images: [
          {
            _id: String,
            url: {
              type: String,
              required: true
            }
          }
        ],
        product: {
          type: Number,
          ref: 'Product'
        }
      }
    ],
    default: [],
  },
  // stripCustommerId: String,
  // plusSubscriptionId: String,
  // plusSubscriptionExpiry: Date,
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpiry: Date
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 12)
})

userSchema.methods.getJWToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY,
    { expiresIn: '1d' }
  )
}

userSchema.methods.comparePassword = async function (newPassword) {
  return await bcrypt.compare(newPassword, this.password)
}

const userModel = mongoose.model('user', userSchema)
export default userModel