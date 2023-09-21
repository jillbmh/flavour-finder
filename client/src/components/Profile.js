import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { isAuthenticated, getToken } from '../utils/auth.js'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'



export default function Profile() {

  const userId = isAuthenticated()
  const [usersRecipes, setUsersRecipes] = useState([])
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    async function getRecipesByUser() {
      try {
        const { data } = await axios.get(`/api/user/${userId}`)
        setUsersRecipes(data)
        console.log(userId)
        console.log(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getRecipesByUser()
  }, [])

  async function handleDelete(id){
    try {
      await axios.delete(`/api/recipes/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/user/:addedBy')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className='user-profile'>
      <h1>Welcome back!</h1>
      <h2>My recipes</h2>
      <Link to={`/user/${userId}/create`}>
        Create New Recipe
      </Link>
      <section className='grid-container'>
        {usersRecipes.map((recipe) => (
          <Link key={recipe._id} to={`/recipes/${recipe._id}`} className='recipe'>
            <div
              className='recipe-container'
              style={{
                backgroundImage: `url(${recipe.image})`,
              }}
            >
              { userId === recipe.addedBy._id && 
                <div className="edit-buttons">
                  <FontAwesomeIcon onClick={handleDelete(id)} icon={faTrash} />
                  <Link to={`/user/${recipe.addedBy._id}/${id}`}>
                    <FontAwesomeIcon className='update' icon={faPen} />
                  </Link>
                </div>
              }
              {/* Icon as button for delete -> onClick to delete, <Link> for update that redirects to update recipe page on click */}
              {/* CSS: position: absolute, right: 0 (Must have position: relative; on the parent recipe container) */}
              <div className='recipe-title'>
                <p>{recipe.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}
