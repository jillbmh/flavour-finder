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

  async function handleDelete(recipeId) {
    try {
      console.log('delete is broken')
      await axios.delete(`/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      navigate('/user/:addedBy')
    } catch (error) {
      console.log('delete is defo broken')
      console.log(error)
    }
  }

  return (
    <main className='user-profile'>
      <h1>Welcome back!</h1>
      <h2>My recipes</h2>
      <Link className='create-link' to={`/user/${userId}/create`}>
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
              <div className="edit-buttons">
                <Link to={`/user/${recipe.addedBy}/${recipe._id}`}>
                  <div className='icon-container'>
                    <FontAwesomeIcon className='update' icon={faPen} />
                  </div>
                </Link>
                <div className='icon-container delete-icon'>
                  <FontAwesomeIcon onClick={() => handleDelete(recipe._id)} icon={faTrash} />
                </div>
              </div>
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
