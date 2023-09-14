import mongoose from 'mongoose'
import Recipe from '../models/recipe.js'

// Index route
export const getAllRecipes = async (req, res) => {
  const recipes = await Recipe.find()
  return res.json(recipes)
}

// Show route

export const getSingleRecipe = async (req, res) => {
  const { id } = req.params
  if(!mongoose.isValidObjectId(id)){
    return res.status(422).json({ error: 'Invalid ID'})
  }

  try {
    const recipe = await Recipe.findById(id)
    if(!recipe){
      throw new Error('Recipe not found')
    }
    return res.json(recipe)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ message: error.message})
  }
}

// Create route
export const createRecipe = async (req, res) => {
  try {
    const recipeCreated = await Recipe.create({ ...req.body })
    return res.status(201).json(recipeCreated)
  } catch (error) {
    console.log(error.code)
    if(error.code === 11000){
      return res.status(422).json({
        error: {
          name: 'Duplicate recipe',
          field: error.keyValue
        }
    })
    
  }
  return res.status(422).json(error)
}
}

// Update route
export const updateRecipe = async (req, res) => {
  const { id } = req.params

  if(!mongoose.isValidObjectId(id)){
    return res.status(422).json({ error: 'Invalid ID'})
  }
  try {
    const updatedRecipe = await Recipe.findById(id)
    if(!updatedRecipe){
      return res.status(404).json({ error: 'Recipe not found'})
    }
    Object.assign(updatedRecipe, req.body)
    await updatedRecipe.save()
  } catch (error) {
    console.log(error)
    return res.status(422).json(error)
  }
}

// Delete route
export const deleteRecipe = async (req, res) => {
  const { id } = req.params
  if(!mongoose.isValidObjectId(id)){
    return res.status(401).json({ error: 'Invalid ID'})
  }

  try {
    const foundRecipe = await Recipe.findById(id)
    if(!foundRecipe){
      return res.status(401).json({ error: 'Not Found'})
    }

    const recipeDeleted = await Recipe.findByIdAndDelete(id)
    // if(!recipeDeleted) throw new Error ('Recipe not found')

    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(404).json({ error: error.message })
  }
}