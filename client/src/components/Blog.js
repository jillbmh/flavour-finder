import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



export default function Blog() {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    async function getBlogData() {
      try {
        const { data } = await axios.get('/api/blogs')
        setBlogs(data)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
    getBlogData()
  }, [])
  return (
    <>
      <h1>blogs</h1>
      <section className='blog-container'>
        {blogs.length > 0 ? 
          blogs.map(blog => (
            <div 
              className='individual-blog' 
              key={blog._id} 
              style={{ backgroundImage: `url(${blog.image})` }}
            >
              <Link to={`/blogs/${blog._id}`}>
                <div className='blog-title'>
                  <h3>{blog.title}</h3>
                </div>
              </Link>
            </div>
          ))
          : 'Loading...'}
      </section>
    </>
  )
}
