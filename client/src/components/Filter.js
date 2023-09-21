import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

export default function Filter() {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    async function getStarter() {
      try {
        const { data } = await axios.get('/api/recipes/type/starter')
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
            <Link key={recipe._id} to={`/recipes/${recipe._id}`} className='recipe'>
              <div key={recipe._id} className="recipe-container">
              
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
              </div>
            </Link>
          
          ))
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  )
}
