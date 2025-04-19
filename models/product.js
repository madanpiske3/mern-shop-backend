// import mongoose from "mongoose";

// const {schema} = mongoose;

// const Product = mongoose.model('Product', productSchema); // Product is the model name, productSchema is the schema name & normally Models starts with the capital letters



import mongoose from 'mongoose';

const { Schema } = mongoose;
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    richDescription: {
        type: String,
        default: ''
    },
    image: {
        type: String,
        default: ''
    },
    images: [{
        type: String
    }],
    brand: {
        type: String,
        default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true // i think we need to check, if something is new then 
    },
    countInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }

}); // After creating schema, we need to create a model

// enabling virtual id !_id
productSchema.virtual('id').get(function () {
    return this._id.toHexString();
});
productSchema.set('toJSON', {
    virtuals: true
});


// const Product = mongoose.model('Product', productSchema); // Product is the model name, productSchema is the schema name & normally Models starts with the capital letters
const Product = mongoose.model('Product', productSchema); // Product is the model name, productSchema is the schema name & normally Models starts with the capital letters

export default Product;






// // // const mongoose = require('mongoose');
// // import mongoose from 'mongoose';

// // const productSchema = mongoose.Schema({
// //     name: String,
// //     image: String,
// //     countInStock: {
// //         type: Number,
// //         required: true
// //     },
// //     price: Number,
// //     // category: String,
// //     // description: String,
// //     // rating: Number,
// //     // numReviews: Number,
// //     // isFeatured: Boolean,
// //     // dateCreated: Date
// // });

// // // exports.Product = mongoose.model('Product', productSchema) // Modal starts with capital lette/
// // // const Product = mongoose.model('Product', productSchema);

// // // module.exports = Product;
// // // module.exports = mongoose.model('Product', productSchema);
// // exports.Product = mongoose.model('Product', productSchema);