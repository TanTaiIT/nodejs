import mongoose from 'mongoose'

const connect = async () => {
  const conn = await mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@${process.env.MONGO_DB_DATABASE}`)
  return conn
}

export default connect
