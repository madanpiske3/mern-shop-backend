import mongoose from 'mongoose';

// Removed unused Schema declaration
const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: String
    },
    color: {
        type: String
    },
    image: {
        type: String
    }

}); // After creating schema, we need to create a model

const Category = mongoose.model('Category', categorySchema); // Product is the model name, productSchema is the schema name & normally Models starts with the capital letters

export default Category;
