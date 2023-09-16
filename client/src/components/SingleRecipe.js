import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'


export default function SingleRecipe() {

  const [recipe, setRecipe] = useState(null)
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
      <h1>{recipe.title}</h1>

      <div className="recipe-container">
        <img src={recipe.image} />
        <h2 style={{
          padding: '15px',
        }}>Author: {recipe.addedBy.username.charAt(0).toUpperCase() + recipe.addedBy.username.slice(1)}</h2>

        <div className="ingredients-method-container">
          <section className="recipe-info-container">
            <div>{recipe.cuisine}</div>
            <div>{recipe.type.charAt(0).toUpperCase() + recipe.type.slice(1)}</div>
            <div>Serves: {recipe.serves}</div>
            <div>
              {recipe.cookingTime.hours > 0 ? `Hours: ${recipe.cookingTime.hours} - ` : ''}
              Minutes: {recipe.cookingTime.minutes}
            </div>
          </section>

          <section className="ingredients-container">
            <div className="ingredients"> Ingredients:</div>
            <div>{recipe.ingredients.map((val) => {
              return (
                <div style={{
                  lineHeight: '1.5rem',
                }} key={`${recipe._id}_${val.ingredient}`}>
                  {val.ingredient} - {val.amount}
                </div>
              )
            })}
            </div>
          </section>

          <section className="method-container">
            <div className="method"> Method:</div>
            <div> {recipe.method.map((val, index) => {
              return (
                <div style={{
                  lineHeight: '1.5rem',
                }} key={`${recipe._id}_${val}`}>
                  Step {index + 1}:  {val}
                </div>
              )
            })}</div>
          </section>
        </div>
      </div>

    </>
  )
}
