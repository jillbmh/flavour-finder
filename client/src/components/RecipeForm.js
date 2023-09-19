// CHANGE IMAGE INPUT THE COMMENTED OUT ONE WHEN WE HAVE CLOUDINARY WORKING
// CLOUDINARY NEEDS TO RETURN THE IMAGE URL AS A STRING SO THE POST REQUEST WORKS

import { useForm, Controller } from 'react-hook-form'
import { useState, useEffect } from 'react'
import PlusIcon from '../images/plus-icon.png'
import RemoveIcon from '../images/remove-icon.png'
import axios from 'axios'


export default function RecipeForm() {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    defaultValues: {
      cuisine: '',
      type: '',
    },
  })

  // State
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }])
  const [methods, setMethods] = useState([''])
  console.log(methods)

  // Method
  const addMethod = () => {
    setMethods([...methods, ''])
  }

  const removeMethod = (index) => {
    // TODO - Fix the bug here by specifically deleting the correct index, use .filter()
    const newMethod = [...methods]

    newMethod.splice(index, 1)

    setMethods(newMethod)
  }

  const handleMethodNameChange = (e, index) => {
    const newMethods = methods.map((item, idx) => {
      // When the current index matches the provided index, return the new value
      if (idx === index) {
        return e.target.value
      }
      // Otherwise, return the original item
      return item
    })
    setMethods(newMethods)

  }
  // Ingredients

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }])
  }

  const removeIngredient = (index) => {
    // TODO - Fix the bug here by specifically deleting the correct index, use .filter()
    const newIngredients = [...ingredients]

    newIngredients.splice(index, 1)

    setIngredients(newIngredients)
  }

  const handleIngredientNameChange = (e, index) => {
    const newIngredients = [...ingredients]
    newIngredients[index].name = e.target.value
    setIngredients(newIngredients)
    console.log('Event value: ', e.target.value)
    console.log('Updated Ingredients: ', newIngredients)
    console.log(errors)
  }

  const handleIngredientAmountChange = (e, index) => {
    const newIngredients = [...ingredients]
    newIngredients[index].amount = e.target.value
    setIngredients(newIngredients)
    console.log(errors)
  }

  const onSubmit = data => {
    console.log(data)
    console.log(errors)

    const createRecipe = async () => {
      const response = await axios.post('/api/recipes', data)
      console.log(response)
    }

    createRecipe()
  }
  return (
    <main className='recipe-form-page'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Recipe Name</label>
        <input placeholder='New Recipe' {...register('title', { required: true })} />
        {/* {errors.username && <span>Username is required</span>} */}
        {/* <input type='file' accept='image/png, image/jpeg, image/jpg' {...register('image', { required: false })} /> */}
        <input type='text' placeholder='Image Path' {...register('image', { required: true })} />
        <select className='dropbtn' {...register('cuisine', { required: true })}>
          <option value='' disabled>
            Choose a cuisine
          </option>
          <option value='italian'>Italian</option>
          <option value='japanese'>Japanese</option>
          <option value='chinese'>Chinese</option>
          <option value='indian'>Indian</option>
          <option value='thai'>Thai</option>
          <option value='mexican'>Mexican</option>
          <option value='american'>American</option>
          <option value='british'>British</option>
          <option value='spanish'>Spanish</option>
          <option value='korean'>Korean</option>
          <option value='vietnamese'>Vietnamese</option>
          <option value='asian'>Asian</option>
        </select>

        <select className='dropbtn' {...register('type', { required: true })}>
          <option value='' disabled>
            Choose the dish type
          </option>
          <option value='starter'>Starter</option>
          <option value='main'>Main</option>
          <option value='side'>Side</option>
          <option value='dessert'>Dessert</option>
        </select>

        <label>Hours</label>
        <input type='number' min='0' max='12' {...register('hours', { required: true })} />
        <label>Minutes</label>
        <input type='number' min='0' max='59' {...register('minutes', { required: true })} />

        <label>Serves</label>
        <input type='number' min='0' max='12' {...register('serves', { required: true })} />

        <section className="checkbox-container">
          <label>
            <input type="checkbox" />
            Vegan
          </label>

          <label>
            <input type="checkbox" />
            Vegetarian
          </label>

          <label>
            <input type="checkbox" />
            Gluten Free
          </label>

          <label>
            <input type="checkbox" />
            Pescatarian
          </label>
        </section>

        {/* Ingredients */}
        <label>Ingredients</label>
        <div className='container-ingredients'>
          {ingredients.map((ingredient, index) => (
            <div className='ingredient-container' key={index}>
              <Controller
                name={`ingredients[${index}].ingredient`}
                control={control}
                defaultValue={ingredient.name}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className='ingredient-input'
                    placeholder='New ingredient'
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                      handleIngredientNameChange(e, index)
                    }}
                  />
                )}
              />

              <Controller
                name={`ingredients[${index}].amount`}
                control={control}
                defaultValue={ingredient.amount}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className='ingredient-input amount-input'
                    placeholder='Amount'
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                      handleIngredientAmountChange(e, index)
                    }}
                  />
                )}
              />

              <button type='button' onClick={() => removeIngredient(index)}>
                <img src={RemoveIcon} width='18px' />
              </button>
            </div>
          ))}
          <button className='remove-icon' type='button' onClick={addIngredient}>
            <img src={PlusIcon} width='28px' alt='Add Ingredient' />
          </button>
        </div>

        {/* Method */}
        <label>Method</label>
        <div className='container-methods'>
          {methods.map((method, index) => (
            <div className='methods' key={`method_${index}`}>
              <Controller
                name={`method[${index}].method`}
                control={control}
                defaultValue={method}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className='methods-input'
                    placeholder='Add Method'
                    {...field}
                    onChange={e => {
                      field.onChange(e)
                      handleMethodNameChange(e, index)
                    }}
                  />
                )}
              />
              <button type='button' onClick={() => removeMethod(index)}>
                <img src={RemoveIcon} width='18px' />
              </button>
            </div>
          ))}
          <button className='remove-icon' type='button' onClick={addMethod}>
            <img src={PlusIcon} width='28px' alt='Add Ingredient' />
          </button>
        </div>


        <input type='submit' value='Submit Recipe' />


      </form>
    </main>
  )
}
