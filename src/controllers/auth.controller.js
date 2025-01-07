import userModel from '../models/user.model.js';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import Snowflake from '@theinternetfolks/snowflake'
import jwt from 'jsonwebtoken'
const timestamp = Date.now()
const timestampInSeconds = Math.floor(timestamp / 1000)

export const registeredUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const file = req.file
    if (!file) {
      return res.status(400).send('No file uploaded')
    }

    const s3 = new S3Client({
      credentials: {
        accessKeyId: process.env.ASW_ACCESS_KEY,
        secretAccessKey: process.env.ASW_SECRET_KEY,
      },
      region: process.env.AWS_BUCKET_REGION
    })

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: file.originalname,
      Body: file.buffer
    }

    const command = new PutObjectCommand(params)
    await s3.send(command)

    const cacheBuster = Date.now();
    const avartarUrl = `https://${params.Bucket}.s3.${process.env.AWS_BUCKET_REGION}.amazonaws.com/${params.Key}?cacheBuster=${cacheBuster}`;

    const user = await userModel.create({
      _id: Snowflake.Snowflake.generate({
        timestamp: timestampInSeconds
      }),
      name,
      email,
      password,
      avatar: avartarUrl
    })

    res.status(201).json({ message: 'sucess', data: user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ success: false, messsage: 'Please enter your email or password' })
    }

    const user = await userModel.findOne({ email }).select('+password')
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email'
      })
    }

    const isPasswordMatch = await user.comparePassword(password)
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: 'Wrong Password'
      })
    }

    const token = jwt.sign({
      id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar
    }, process.env.JWT_SECRET_KEY)

    const options = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true
    }

    res.status(201).cookie('token', token, options).json({
      success: true,
      data: user,
      token: token
    })
  } catch (error) {
    res.status(400).json({ message: error.messsage })
  }
}

export const logout = (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    messsge: "User logout"
  })
}

export const getAllUsers = async(req, res) => {
  try {
    const users = await userModel.find() || []
    res.status(200).json({message: 'success', data: users})
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}