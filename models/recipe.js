import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        cuisine: { type: String, required: true },
        type: { type: String, required: true },
        cookingTime: { type: String, required: true },
        serves: { type: Number, required: true },
        ingredients: [{ type: String }],
        method: { type: String, required: true },
        // addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
        // comments: [commentSchema],
        // rating: [ratingSchema]
    },
    {
        timestamps: true
    }
);

// const commentSchema = new mongoose.Schema(
//     {
//         text: { type: String, required: true },
//         addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
//     },
//     {
//         timestamps: true
//     }
// );

// const ratingSchema = new mongoose.Schema({
//     rating: { type: Number, required: true },
//     addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }
// });

export default mongoose.model('Recipe', recipeSchema);
