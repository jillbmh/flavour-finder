import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import Spinner from './Spinner'


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
    <main>
      <div className='grid-container'>
        {blogs.length > 0 
          ? blogs.map(blog => (
            <Link key={blog._id} to={`/blogs/${blog._id}`} className='blog'>
              <div 
                className= 'individual-blog'
                style={{ backgroundImage: `url(${blog.image})`,
                }}
              >
                <div className='blog-title'>
                  <p>{blog.title}</p>
                </div>
              </div>
            </Link>
          ))
          :
          <Spinner />
        }
      </div>
    </main>
  )
}
