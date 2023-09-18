import { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import axios from 'axios'

export default function BrowseRecipes() {
  const { state } = useLocation()
  const [recipes, setRecipes] = useState([])

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
    <>
      <main>
        {/* <h1>All Recipes</h1> */}
        <div className='grid-container'>
          {recipes.length > 0
            ? recipes.map(recipe => (
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
      {/* <h1>{state.category}</h1>
      <div className="grid-container">
        {recipes.length > 0 ? (
          recipes
            .filter(recipe => recipe.category === state.category)
            .map(recipe => (
              <div key={recipe._id} className="recipe-container">
                <Link
                  to={`/recipes/${recipe._id}`}
                  className="recipe-small"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                >
                  <div className="recipe-text">
                    <h3>{recipe.title}</h3>
                  </div>
                </Link>
              </div>
            ))
        ) : (
          'ERROR'
        )}
      </div> */}
    </>
  )
}
