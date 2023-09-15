import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function SingleRecipe(){

  const [ recipe, setRecipe ] = useState(null)
  console.log(recipe)
  
  const { id } = useParams()

  useEffect(() => {
    async function getRecipeData() {

      try {
        const { data } = await axios.get(`/api/recipes/${id}`)
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
      <img src={recipe.image} />
      <h2>Author: { recipe.addedBy.username}</h2>
      
      <section className= "recipe-info-container">
        <h3>{ recipe.cuisine }</h3>
        <div>{ recipe.type }</div>
        <div>Serves: { recipe.serves }</div> 
        <div>
          {recipe.cookingTime.hours > 0 ? `Hours: ${recipe.cookingTime.hours} - ` : ''}
            Minutes: {recipe.cookingTime.minutes}
        </div>
      </section>

      <section className= "ingredients-container">
        <div>{recipe.ingredients.map((val) => {
          return (
            <div key={`${recipe._id}_${val.ingredient}`}>
              {val.ingredient} - {val.amount} 
            </div>
          )
        })}
        </div>
      </section>

      <section className= "method-container">
        <div> Method: {recipe.method.map((val) => {
          return (
            <div key={`${recipe._id}_${val}`}>
              {val}
            </div>
          )
        })}</div>
      </section>
    </>
  )
}
