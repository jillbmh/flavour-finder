import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function SingleRecipe(){

  const [ recipe, setRecipe ] = useState(null)
  console.log(recipe)
  useEffect(() => {
    async function getRecipeData(){
      try {
        const { data } = await axios.get('/api/recipes/650341baa6e0615a7848824a')
        setRecipe(data)
      } catch (error) {
        console.error(error)
      }
    }
    getRecipeData()
  }, [])

  if (!recipe) return <></>

  return (
    <>
      <h1>{ recipe.title }</h1>
    
      <section>
        <div>{recipe.ingredients.map((val) => {
          return (
            <div key={`${recipe._id}_${val.ingredient}`}>
              {val.ingredient} - {val.amount} 
            </div>
          )
        })}
        </div>
      </section>

      <section>
        <div>{recipe.method.map(() => {
          
        })}</div>
      </section>
    </>
  )
}
