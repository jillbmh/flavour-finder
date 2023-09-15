import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
  image: { type: String, unique: true, required: true },
  title: { type: String, unique: true, required: true },
  author: { type: String, unique: true, required: true },
  dateCreated: { type: String, required: true },
  content: { type: String, unique: true, required: true },
})

export default mongoose.model('Blog', blogSchema)