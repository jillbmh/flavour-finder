import express from 'express'
import { getAllRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes.js'
import { registerUser, loginUser } from '../controllers/users.js'

const router = express.Router()

// Index route
router.route('/recipes')
  .get(getAllRecipes)
  .post(createRecipe)

// Single route
router.route('/recipes/:id')
  .get(getSingleRecipe)
  .put(updateRecipe)
  .delete(deleteRecipe)
export default router

// ! Users
