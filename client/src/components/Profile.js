import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

export default function Profile() {

  const { state } = useLocation()
  const [recipes, setRecipes] = useState([])


  const currentUserId = 'someUserId' 

  useEffect(() => {
    async function getRecipesData() {
      try {
        const { data } = await axios.get('/api/recipes')
        setRecipes(data)
        console.log(data)
      } catch (error) {
        console.error(error)
      }
    }
    getRecipesData()
  }, [])

  return (
    <main>
      <p>Profile</p>
      <div className='grid-container'>
        {recipes.length > 0
          ? recipes
            .filter(recipe => recipe.addedById === currentUserId)  
            .map(recipe => (
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
            ))
          : 'Loading...'}
      </div>
    </main>
  )
}
