import express from 'express'
import { getAllRecipes, getSingleRecipe, createRecipe, updateRecipe, deleteRecipe } from '../controllers/recipes.js'
import { registerUser, loginUser } from '../controllers/users.js'
import { secureRoute } from './secureRoute.js'

const router = express.Router()

// Index route
router.route('/recipes')
  .get(getAllRecipes)
  .post(secureRoute, createRecipe)

// Single route
router.route('/recipes/:id')
  .get(getSingleRecipe)
  .put(secureRoute, updateRecipe)
  .delete(secureRoute, deleteRecipe)
  
  // ! Users
router.route('/register')
  .post(registerUser)
  
router.route('/login')
  .post(loginUser)

export default router