import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function SingleBlog(){

  const [ blog, setBlog ] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    async function getBlogData() {

      try {
        const { data } = await axios.get(`/api/blogs/${id}`)
        setBlog(data)
        console.log(data)

      } catch (error) {
        console.error(error)
      }
    }
    getBlogData()
  }, [id])


  return (
    <>
      {
        blog ? (
          <main>
            <section className='blog-single-container'>
              <h2>{blog.title}</h2>
              <img src={blog.image} alt={blog.title} />

              <section className='blog-info-container'>
                <h3>Author: {blog.author}</h3>
                <p>{blog.dateCreated}</p>
              </section>

              <section className='content-container'>
                <p>{blog.content}</p>
              </section>
            </section>
          </main>
        ) : (
          'Loading...'
        )
      }
    </>
  )
  
}