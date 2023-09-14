import mongoose from 'mongoose';
import 'dotenv/config';

// Model
import Recipe from '../models/recipe.js';
import User from '../models/user.js';

// Data
import recipeData from './data/recipes.js';
import userData from './data/users.js';

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_STRING);
    console.log('🥙 Database connection established');

    const { deletedCount: usersDeleted } = await User.deleteMany();
    console.log(`❌ Deleted ${usersDeleted} users`);

    const { deletedCount: recipeDeleted } = await Recipe.deleteMany();
    console.log(`❌ Deleted ${recipeDeleted} recipes`);

    const usersAdded = await User.create(userData);
    console.log(`➕ added ${usersAdded.length} user`);

    const recipeWithAddedBy = recipeData.map(recipe => {
      const randomUserId = Math.floor(Math.random() * usersAdded.length);
      return { ...recipe, addedBy: usersAdded[randomUserId]._id };
    });

    const recipeAdded = await Recipe.create(recipeWithAddedBy);
    console.log(`🥘 ${recipeAdded.length} recipe added to the recipe collection`);

    await mongoose.connection.close();
    console.log('👋 connection closed');
  } catch (error) {
    console.log(error);
    await mongoose.connection.close();
    console.log('👋 connection closed');
  }
};
seedDatabase();
