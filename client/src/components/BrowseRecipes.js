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
      <h1>All Recipes</h1>
      <div className="grid-container">
        {recipes.length > 0 ? (
          recipes.map(recipe => (
            <div key={recipe._id} className="recipe-container">
              <Link
                to={`/recipes/${recipe._id}`}
                className="recipe"
                style={{ backgroundImage: `url(${recipe.image})` }}
              >
                <div key={recipe.title} className="recipe-title">
                  <h3>{recipe.title}</h3>
                </div>
              </Link>
            </div>
            
          ))
        ) : (
          'Loading...'
        )}
      </div>
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
