import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Filter() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    async function getStarter() {
      try {
        const { data } = await axios.get('/api/recipes/type')
        const filteredStarters = data.filter((recipe) => recipe.type === 'starter')
        setRecipes(filteredStarters)
        console.log(filteredStarters)
      } catch (error) {
        console.log(error.message)
      }
    }
    getStarter()
  }, [])

  return (
    <main>
      <div className="grid-container">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe._id} className="recipe">
              <Link to={`/recipe/${recipe._id}`}>
                <h3>{recipe.title}</h3>
              </Link>
            </div>
          ))
        ) : (
          'Loading...'
        )}
      </div>
    </main>
  )
}
