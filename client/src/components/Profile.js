// import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import axios from 'axios'
// import { isAuthenticated } from '../../utils/auth.js'
import { useParams } from 'react-router-dom'


export default function Profile() {
  const { addedBy } = useParams()
  // const userId = isAuthenticated()
  // const [usersRecipes, setUsersRecipes] = useState([])

  // useEffect(() => {
  //   async function getRecipesByUser() {
  //     try {
  //       const { data } = await axios.get(`/user/${userId}`)
  //       setUsersRecipes(data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   getRecipesByUser()
  // }, []
  // )



  return (
    <main className='user-profile'>
      <h1>Welcome back!</h1>
      <h2>My recipes</h2>
      <Link to={`/user/${addedBy}/create`}>
        Create New Recipe
      </Link>

      {/* {usersRecipes.map((recipe) => (
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
      ))} */}
    </main>
  )
}
