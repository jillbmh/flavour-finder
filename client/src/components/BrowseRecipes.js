import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Filters from './Filters'

export default function BrowseRecipes() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)

  const [filter, setFilter] = useState({
    cuisine: '',
    type: '',
    // Add more filters as needed
  })

  async function getRecipesData() {
    setLoading(true)
    try {
      let url = '/api/recipes'
      const queryParams = []
      if (filter.cuisine) queryParams.push(`cuisine=${filter.cuisine}`)
      if (filter.type) queryParams.push(`type=${filter.type}`)
      if (queryParams.length) {
        url = url + '?' + queryParams.join('&')
      }
      const { data } = await axios.get(url)
      setRecipes(data)
      console.log(data)
      setLoading(false)
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  // Re-fetch recipes whenever filter is changed
  useEffect(() => {
    getRecipesData()
  }, [filter])

  return (
    <>
      <main>
        <Filters filter={filter} setFilter={setFilter} />
        <div className='grid-container'>
          {loading ? (
            'Loading...'
          ) : recipes.length > 0 ? (
            recipes.map(recipe => (
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
          ) : (
            'No recipes found'
          )}
        </div>
      </main>
    </>
  )
}
