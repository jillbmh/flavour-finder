import Blog from '../models/blog.js'
import mongoose from 'mongoose'

// Index route
export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find()
  return res.json(blogs)
}
// Show route
export const getSingleBlog = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ID' })
  }

  try {
    const blogs = await Blog.findById(id)
    if (!blogs) {
      throw new Error('Blog not found')
    }
    return res.json(blogs)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error.message })
  }
}