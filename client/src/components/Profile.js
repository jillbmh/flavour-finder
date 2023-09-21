import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { isAuthenticated } from '../utils/auth.js'

export default function Profile() {
  const userId = isAuthenticated()
  const [usersRecipes, setUsersRecipes] = useState([])

  useEffect(() => {
    async function getRecipesByUser() {
      try {
        // const { data } = await axios.get(`/user/${userId}`)
        const { data } = await axios.get('/api/user/650c2cfbde13d1a3da109eff')
        setUsersRecipes(data)
        console.log(userId)
      } catch (error) {
        console.log(error.message)
      }
    }
    getRecipesByUser()
  }, []

  )



  return (
    <main className='user-profile'>
      <h1>Welcome back!</h1>
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
