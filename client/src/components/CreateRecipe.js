import axios from 'axios'
import RecipeForm from './RecipeForm'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../utils/auth'
import { useEffect } from 'react'




export default function CreateRecipe({ user }){

  const navigate = useNavigate()

  useEffect(() => {
    !user && navigate('/login')
  }, [user, navigate])

  const fields = [
    { type: 'text', name: 'title', label: 'Title' },
    { type: 'text', name: 'image', label: 'Image URL' },
    { type: 'text', name: 'cuisine', label: 'Cuisine' },
    { type: 'text', name: 'type', label: 'Type' },
    { type: 'text', name: 'cookingTime', label: 'Cooking Time' },
    { type: 'number', name: 'serves', label: 'Serves' },
    //ADD INGREDIENTS AND METHODS
    { type: 'number', name: 'spiceLevel', label: 'Spice Level' },
    { type: 'checkbox', name: 'isVegan', label: 'Is Vegan?' },
    { type: 'checkbox', name: 'isVegetarian', label: 'Is Vegetarian?' },
    { type: 'checkbox', name: 'isPescatarian', label: 'Is Pescatarian?' },
    { type: 'checkbox', name: 'isGlutenFree', label: 'Is Gluten-Free?' }
  ]
  

  async function createRecipe(formData){
    try {
      const response = await axios.post('/api/recipes', formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      console.log('Recipe created!', response.data)
      navigate(`recipes/ ${response.data.id}`)

    } catch (error) {
      console.error(error)

      if (error.response) {
        console.error(error.response.status)
        console.error(error.response.data)
      }
    }
  }
  return (
    <RecipeForm title="Create Recipe" request={createRecipe} fields={fields}/>
  )
}