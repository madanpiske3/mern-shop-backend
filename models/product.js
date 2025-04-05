import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = mongoose.Schema({
    name: String,
    image: String,
    countInStock: {
        type: Number,
        required: true
    },
    price: Number,
}); // After creating schema, we need to create a model

// const Product = mongoose.model('Product', productSchema); // Product is the model name, productSchema is the schema name & normally Models starts with the capital letters
const Product = mongoose.model('Product', productSchema); // Product is the model name, productSchema is the schema name & normally Models starts with the capital letters

export default Product;






// // const mongoose = require('mongoose');
// import mongoose from 'mongoose';

// const productSchema = mongoose.Schema({
//     name: String,
//     image: String,
//     countInStock: {
//         type: Number,
//         required: true
//     },
//     price: Number,
//     // category: String,
//     // description: String,
//     // rating: Number,
//     // numReviews: Number,
//     // isFeatured: Boolean,
//     // dateCreated: Date
// });

// // exports.Product = mongoose.model('Product', productSchema) // Modal starts with capital lette/
// // const Product = mongoose.model('Product', productSchema);

// // module.exports = Product;
// // module.exports = mongoose.model('Product', productSchema);
// exports.Product = mongoose.model('Product', productSchema);