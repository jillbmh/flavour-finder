import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import PlusIcon from '../images/plus-icon.png'
import RemoveIcon from '../images/remove-icon.png'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import { cloudinary } from 'cloudinary'

const generateUniqueId = () => uuidv4()

export default function RecipeForm() {
  const { addedBy, id } = useParams() // Extract addedBy from the route parameters
  const navigate = useNavigate()
  // http://localhost:3000/user/650c24697f47fd642512ff0c/650c2cfdde13d1a3da109f17 - Update example

  // State:
  const [errorMessage, setErrorMessage] = useState(null)
  const [ingredients, setIngredients] = useState([{ id: generateUniqueId(), name: '', amount: '' }])
  const [methods, setMethods] = useState([{ id: generateUniqueId(), value: '' }])
  const [isFetching, setIsFetching] = useState(false)
  const [recipeInformation, setRecipeInformation] = useState({
    cuisine: '',
    title: '',
    type: '',
    image: '',
    hours: '',
    minutes: '',
    serves: '',
    isVegan: false,
    isVegetarian: false,
    isPescatarian: false,
    isGlutenFree: false,
  })

  useEffect(() => {
    // Don't fetch any data if the recipe id doesn't exist, i.e. we're creating a recipe:
    if (!id) return

    const getAndUpdateState = async () => {
      setIsFetching(false)
      //  Get data --> { wrangle the data and set each bit of state. RecipeName, Hours, Minutes}
      const { data } = await axios.get(`/api/recipes/${id}`)

      // 1. Ingredients:
      setIngredients(
        data.ingredients.map(ingredient => {
          ingredient.id = generateUniqueId()
          return ingredient
        })
      )

      // 2. Methods:
      setMethods(
        data.method.map(method => {
          return {
            value: method,
            id: generateUniqueId(),
          }
        })
      )

      // 3. RecipeInformation:
      setRecipeInformation({
        cuisine: data.cuisine,
        title: data.title,
        type: data.type,
        image: data.image,
        hours: data.cookingTime.hours,
        minutes: data.cookingTime.minutes,
        serves: data.serves,
        isVegan: data.isVegan || false,
        isVegetarian: data.isVegetarian || false,
        isPescatarian: data.isPescatarian || false,
        isGlutenFree: data.isGlutenFree || false,
      })

      setIsFetching(true)
    }

    getAndUpdateState()
  }, [])

  // Generic handlers:
  const handleInputChange = (attribute, value) => {
    let finalValue

    if (['serves', 'hours', 'minutes'].includes(attribute)) {
      finalValue = parseInt(value, 10)
    } else {
      finalValue = value
    }

    setRecipeInformation(prevState => ({
      ...prevState,
      [attribute]: finalValue,
    }))
  }

  const handleUpload = event => {
    event.preventDefault()

    // Check if there's any file selected
    if (!event.target.files || event.target.files.length === 0) {
      alert('Please select a file.')
      return
    }

    const file = event.target.files[0]

    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET)
    for (var pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1])
    }

    fetch(process.env.REACT_APP_CLOUDINARY_URL, {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setRecipeInformation(prevState => ({
          ...prevState,
          image: data.secure_url,
        }))
        alert('Upload successful')
      })
      .catch(error => {
        console.error('Error uploading:', error)
        alert('Upload failed')
      })
  }

  const handleDietaryCheckboxChange = value => {
    setRecipeInformation(prevState => {
      switch (value) {
        case 'vegan':
          return { ...prevState, isVegan: !prevState.isVegan }
        case 'vegetarian':
          return { ...prevState, isVegetarian: !prevState.isVegetarian }
        case 'glutenFree':
          return { ...prevState, isGlutenFree: !prevState.isGlutenFree }
        case 'pescatarian':
          return { ...prevState, isPescatarian: !prevState.isPescatarian }
        default:
          return prevState
      }
    })
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      cuisine: '',
      type: '',
    },
  })

  // Method
  const addMethod = () => {
    setMethods([...methods, { id: generateUniqueId(), value: '' }])
  }

  const removeMethod = methodId => {
    setMethods(methods.filter(method => method.id !== methodId))
  }

  const handleMethodNameChange = (e, methodId) => {
    const newMethods = methods.map(method => {
      if (method.id === methodId) {
        return { ...method, value: e.target.value }
      }
      return method
    })
    setMethods(newMethods)
  }

  // Ingredients
  const addIngredient = () => {
    setIngredients([...ingredients, { id: generateUniqueId(), ingredient: '', amount: '' }])
  }

  const removeIngredient = ingredientId => {
    const newIngredients = ingredients.filter(ingredient => {
      return ingredient.id !== ingredientId
    })
    setIngredients(newIngredients)
  }

  const handleIngredientNameChange = (e, index) => {
    const newIngredients = [...ingredients]
    newIngredients[index].ingredient = e.target.value
    setIngredients(newIngredients)
  }

  const handleIngredientAmountChange = (e, index) => {
    const newIngredients = [...ingredients]
    newIngredients[index].amount = e.target.value
    setIngredients(newIngredients)
  }

  const updateRecipe = async () => {
    const newObject = {
      ...recipeInformation,
      ingredients: ingredients,
      method: methods.map(method => method.value),
      cookingTime: { hours: recipeInformation.hours, minutes: recipeInformation.minutes },
    }
    // Delete hours and minutes
    delete newObject.hours
    delete newObject.minutes
    try {
      const authorizationToken = localStorage.getItem('token')

      const response = await axios.put(`/api/recipes/${id}`, newObject, {
        headers: {
          Authorization: `Bearer ${authorizationToken}`,
        },
      })

      console.log(response)
      if (response && response.data) {
        navigate(`/user/${addedBy}`)
      } else {
        throw new Error('Unexpected response format from the server.')
      }
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message) {
          console.error('Error updating recipe:', error.response.data.message)
          throw new Error(error.response.data.message)
        }
      } else {
        console.error('Error updating recipe:', error.message)
        throw error
      }
    }
  }

  const onSubmit = async () => {
    const newObject = {
      ...recipeInformation,
      ingredients: ingredients,
      method: methods.map(method => method.value),
      cookingTime: { hours: recipeInformation.hours, minutes: recipeInformation.minutes },
    }
    // Delete hours and minutes
    delete newObject.hours
    delete newObject.minutes

    // TODO - If no id (recipeId) --> run createRecipe --> redirect

    const createRecipe = async () => {
      try {
        const authorizationToken = localStorage.getItem('token')
        const response = await axios.post('/api/recipes', newObject, {
          headers: {
            Authorization: `Bearer ${authorizationToken}`,
          },
        })

        // Check if response has the created recipe object with an _id.
        if (response && response.data && response.data._id) {
          return response.data._id
        } else {
          throw new Error('Unexpected response format from the server.')
        }
      } catch (error) {
        // Check for specific error responses from your server and adjust the error message.
        if (error.response && error.response.data) {
          if (error.response.data.error && error.response.data.error.name === 'Duplicate recipe') {
            console.error('Duplicate recipe detected:', error.response.data.error.field)
            throw new Error('Recipe already exists with the provided details.')
          } else if (error.response.data.message) {
            console.error('Error creating recipe:', error.response.data.message)
            throw new Error(error.response.data.message)
          }
        } else {
          console.error('Error creating recipe:', error.message)
          throw error // re-throw to handle it in the outer function or log it.
        }
      }
    }

    // TODO If id --> run updateRecipe --> redirect

    try {
      const dataId = await createRecipe()
      if (dataId) {
        navigate(`/user/${addedBy}`)
      } else {
        setErrorMessage('Failed to get the ID from the response. Please try again.')
      }
    } catch (error) {
      setErrorMessage(`Error during recipe creation. Please check the details and try again. ${error.message}`)
      console.error('Error during recipe creation:', error.message)
    }
  }

  return (
    <main className='recipe-form-page'>
      {errorMessage && <div className='error-message'>{errorMessage}</div>}
      <form onSubmit={id ? handleSubmit(updateRecipe) : handleSubmit(onSubmit)}>
        <label>Recipe Name</label>
        <input
          value={recipeInformation.title}
          placeholder='New Recipe'
          {...register('title', { required: true })}
          onChange={e => handleInputChange('title', e.target.value)}
        />
        {recipeInformation.image && (
          <img src={recipeInformation.image} alt='Selected Recipe' style={{ maxWidth: '100%', height: 'auto' }} />
        )}

        <div className='field'>
          <label htmlFor='image' className='label'>
            Image
          </label>
          <div className='control'>
            {/* {recipeInformation.image ? (
              <img src={recipeInformation.image} alt='Uploaded preview' style={{ maxWidth: '100%' }}></img>
            ) : ( */}
            <input type='file' className='input' name='image' onChange={handleUpload} />
            {/* )} */}
          </div>
        </div>

        <select
          className='dropbtn'
          {...register('cuisine', { required: true })}
          value={recipeInformation.cuisine}
          onChange={e => handleInputChange('cuisine', e.target.value)}
        >
          <option value='' disabled>
            Choose a cuisine
          </option>
          <option value='Italian'>Italian</option>
          <option value='Japanese'>Japanese</option>
          <option value='Chinese'>Chinese</option>
          <option value='Indian'>Indian</option>
          <option value='Thai'>Thai</option>
          <option value='Mexican'>Mexican</option>
          <option value='American'>American</option>
          <option value='British'>British</option>
          <option value='Spanish'>Spanish</option>
          <option value='Korean'>Korean</option>
          <option value='Vietnamese'>Vietnamese</option>
          <option value='Asian'>Asian</option>
        </select>

        <select
          className='dropbtn'
          {...register('type', { required: true })}
          value={recipeInformation.type}
          placeholder='New Recipe'
          onChange={e => handleInputChange('type', e.target.value)}
        >
          <option value='' disabled>
            Choose the dish type
          </option>
          <option value='Starter'>Starter</option>
          <option value='Main'>Main</option>
          <option value='Side'>Side</option>
          <option value='Dessert'>Dessert</option>
        </select>

        <label>Hours</label>
        <input
          type='number'
          min='0'
          max='12'
          {...register('hours', { required: true })}
          onChange={e => handleInputChange('hours', e.target.value)}
          value={recipeInformation.hours}
        />
        <label>Minutes</label>
        <input
          type='number'
          min='0'
          max='59'
          {...register('minutes', { required: true })}
          onChange={e => handleInputChange('minutes', e.target.value)}
          value={recipeInformation.minutes}
        />

        <label>Serves</label>
        <input
          type='number'
          min='0'
          max='12'
          {...register('serves', { required: true })}
          onChange={e => handleInputChange('serves', e.target.value)}
          value={recipeInformation.serves}
        />

        <section className='checkbox-container'>
          <label>
            <input
              type='checkbox'
              checked={recipeInformation.isVegan}
              value={recipeInformation.isVegan}
              onChange={() => handleDietaryCheckboxChange('vegan')}
            />
            Vegan
          </label>

          <label>
            <input
              type='checkbox'
              checked={recipeInformation.isVegetarian}
              value={recipeInformation.isVegetarian}
              onChange={() => handleDietaryCheckboxChange('vegetarian')}
            />
            Vegetarian
          </label>

          <label>
            <input
              type='checkbox'
              checked={recipeInformation.isGlutenFree}
              value={recipeInformation.isGlutenFree}
              onChange={() => handleDietaryCheckboxChange('glutenFree')}
            />
            Gluten Free
          </label>

          <label>
            <input
              type='checkbox'
              checked={recipeInformation.isPescatarian}
              value={recipeInformation.isPescatarian}
              onChange={() => handleDietaryCheckboxChange('pescatarian')}
            />
            Pescatarian
          </label>
        </section>

        {/* Ingredients */}
        <label>Ingredients</label>
        <div className='container-ingredients'>
          {ingredients.map((ingredient, index) => (
            <div className='ingredient-container' key={ingredient.id}>
              <Controller
                name={`ingredients[${index}].ingredient`}
                control={control}
                defaultValue={ingredient.ingredient}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className='ingredient-input'
                    placeholder='New ingredient'
                    {...field}
                    value={ingredient.ingredient}
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
                    value={ingredient.amount}
                    onChange={e => {
                      field.onChange(e)
                      handleIngredientAmountChange(e, index)
                    }}
                  />
                )}
              />

              <button type='button' onClick={() => removeIngredient(ingredient.id)}>
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
            <div className='methods' key={method.id}>
              <Controller
                name={`method[${index}].method`}
                control={control}
                defaultValue={method.value}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    className='methods-input'
                    placeholder='Add Method'
                    {...field}
                    value={method.value}
                    onChange={e => {
                      field.onChange(e)
                      handleMethodNameChange(e, method.id)
                    }}
                  />
                )}
              />
              <button type='button' onClick={() => removeMethod(method.id)}>
                <img src={RemoveIcon} width='18px' />
              </button>
            </div>
          ))}
          <button className='remove-icon' type='button' onClick={addMethod}>
            <img src={PlusIcon} width='28px' alt='Add Ingredient' />
          </button>
        </div>

        <input type='submit' value={id ? 'Update Recipe' : 'Submit Recipe'} />
      </form>
    </main>
  )
}
