import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isAuthenticated } from '../utils/auth.js'

export default function Profile() {
  const userId = isAuthenticated()
  const [usersRecipes, setUsersRecipes] = useState([])
  console.log(userId)

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

  return (
    <main className='user-profile'>
      <h1>Welcome back!</h1>
      <h2>My recipes</h2>
      <Link to={`/user/${userId}/create`}>
        Create New Recipe
      </Link>
      <h2>Recipes you added:</h2>
      <section className='grid-container'>
        {usersRecipes.map((recipe) => (
          <Link key={recipe._id} to={`/recipes/${recipe._id}`} className='recipe'>
            <div
              className='recipe-container'
              style={{
                backgroundImage: `url(${recipe.image})`,
              }}
            >
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