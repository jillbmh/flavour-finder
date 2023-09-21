import mongoose from 'mongoose'
import Recipe from '../models/recipe.js'


// Index route
export const getAllRecipes = async (req, res) => {
  const { cuisine, type, spiceLevel, isVegan, isVegetarian } = req.query
  const filterCriteria = {}

  if (cuisine) {
    filterCriteria.cuisine = new RegExp(cuisine, 'i')
  }

  if (type) {
    filterCriteria.type = type
  }

  console.log(filterCriteria)
  try {
    const recipes = await Recipe.find(filterCriteria)
    console.log(recipes)
    return res.json(recipes)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: error.message })
  }
}

// Get all recipes by a specific user
export const getRecipesByUser = async (req, res) => {
  const userId = req.params.addedBy
  if (!mongoose.isValidObjectId(userId)) {
    return res.status(422).json({ error: 'Invalid User ID' })
  }
  try {
    const recipes = await Recipe.find({ addedBy: userId })
    if (!recipes) {
      throw new Error('No recipes found for this user')
    }
    return res.status(200).json(recipes)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error.message })
  }
}


// Show route
export const getSingleRecipe = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ID' })
  }
  try {
    const recipe = await Recipe.findById(id).populate('addedBy')
    if (!recipe) {
      throw new Error('Recipe not found')
    }
    return res.json(recipe)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error.message })
  }
}

// Create route
export const createRecipe = async (req, res) => {
  try {
    const recipeCreated = await Recipe.create({ ...req.body, addedBy: req.user._id })
    return res.status(201).json(recipeCreated)
  } catch (error) {
    console.log(error.code)
    if (error.code === 11000) {
      return res.status(422).json({
        error: {
          name: 'Duplicate recipe',
          field: error.keyValue,
        },
      })
    }
    return res.status(422).json(error)
  }
}

// Update route
export const updateRecipe = async (req, res) => {
  const { id } = req.params

  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ID' })
  }
  try {
    const updatedRecipe = await Recipe.findById(id)
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' })
    }
    Object.assign(updatedRecipe, req.body)
    await updatedRecipe.save()
    return res.json(updatedRecipe)
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}

// Delete route
export const deleteRecipe = async (req, res) => {
  const { id } = req.params
  if (!mongoose.isValidObjectId(id)) {
    return res.status(422).json({ error: 'Invalid ID' })
  }

  try {
    const foundRecipe = await Recipe.findById(id)

    console.log(req.user)

    if (!foundRecipe.addedBy.equals(req.user._id)) {
      return res.status(401).json({ error: 'Unauthorized' })
    }

    const recipeDeleted = await Recipe.findByIdAndDelete(id)
    if (!recipeDeleted) throw new Error('Recipe not found')

    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: error.message })
  }
}
export const getRecipesByType = async (req, res) => {
  try {
    const { type } = req.params
    const recipes = await Recipe.find({ type })
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found for the given type.' })
    }

    return res.json(recipes)
  } catch (error) {
    console.log('Error:', error)
    return res.status(404).json({ message: error.message })
  }
}

export const getRecipesByCuisine = async (req, res) => {
  try {
    const { cuisine } = req.params
    const recipes = await Recipe.find({ cuisine })
    if (recipes.length === 0) {
      return res.status(404).json({ message: 'No recipes found for the given cuisine.' })
    }

    return res.json(recipes)
  } catch (error) {
    console.log('Error:', error)
    return res.status(404).json({ message: error.message })
  }
}