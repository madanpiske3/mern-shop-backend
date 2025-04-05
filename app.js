// I lost at 25'th episode
import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';

import Product from './models/product.js';
// We need to create a model with mongodb
// in monogdb, it called collecction
// & in node js its callled model => schema (mongoose schema)
const { Schema } = mongoose;


const app = express();
const PORT = 5000;

dotenv.config();
const api = process.env.API_URL;


// Middleware
app.use(express.json()); // Middleware to parse JSON request body bodyParser got deprecated
app.use(morgan('tiny'));

// models/product.js
// const productSchema = mongoose.Schema({
//     name: String,
//     image: String,
//     countInStock: {
//         type: Number,
//         required: true
//     },
//     price: Number,
// }); // After creating schema, we need to create a model

// const Product = mongoose.model('Product', productSchema); // Product is the model name, productSchema is the schema name & normally Models starts with the capital letters


app.get(`${api}`, (_, res) => {
    res.send('Hello World!');
    console.log(process.env.API_URL);
});
// app.get(`${api}/products`,async (_, res) => {
//     const productList = await Product.find();
//     res.send(productList);
//     res.send('GET PRODDUCTS');
//     console.log(process.env.API_URL);
// });
// app.get(`${api}/products`, (_, res) => {
//     // Product.find()
//     //     .then((productList) => res.send(productList))
//     //     .catch((err) => res.send(err));
//     Product.find()
//   .then((productList) => res.status(200).send(productList))
//   .catch((err) => {
//     console.error("Error fetching products:", err);
//     res.status(500).send("Error fetching products");
//   });
// })
app.get(`${api}/products`, async (_, res) => {
    const productList = await Product.find();
    if(!productList) return res.status(404).send('Product not found');

    res.send(productList);
    // console.log(productList);
    console.log('Products available');
})

app.post(`${api}/products`, (req, res) => {
    const product = new Product({
        name: req.body.name,
        image: req.body.image,
        countInStock: req.body.countInStock,
        price: req.body.price,
    });
    // if (!product) {    //     return res.status(400).send('Product not found');    // }
    product.save()
        .then((savedProduct) => {
            res.send(savedProduct); // Send the response only once
        })
        .catch((err) => {
            res.status(500).json({ error: err, success: false, message: err.message });
        });
});

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log('Database Connection is ready...');
}).catch((err) => {
    console.log(err);
});

app.listen(PORT, () => console.log('localhost:5k'));





// if (!api) {
//     console.error('Error: API_URL is not defined in the environment variables.');
//     process.exit(1);
// }

// app.post(`${api}/products`, (req, res) => {
//     // const newProduct = req.body;
//     const product = new Product({
//         name: req.body.name,
//         image: req.body.image,
//         countInStock: req.body.countInStock,
//         price: req.body.price,
//     })
//     if (!product) {
//         return res.status(400).send('Product not found');
//     }
//     else {
//     product.save().then(res.send(product)).catch((err) => {
//         res.status(500).json({ error: err, success: false, message: "err.message" });     
//     }); // .save() is used to save the product to the database otherwise it will not save the product to the database
//     // res.send(product);
//     }
//     console.log(product);
// });

// import express from 'express';
// import bodyParser from 'body-parser';
// import usersRoutes from './routes/users.js';
// // import { productSchema } from './models/product.js';
// // import product 

// const app = express();
// const PORT = 5000;
// // const product = productSchema();
// // const {Product} = require('../models/product');
// const {Product} = require('./models/product.js');

// app.use(bodyParser.json());

// app.use('/users', usersRoutes);
// app.use('/', (req, res) => res.send(`<h1 classname="lasi">Hello, WOrld!</h1>`));
// // app.all("*", (req, res) =>res.send("You've tried reaching a route that doesn't exist."));


// app.listen(PORT, () => {
//     console.log(`Server is running on port http://localhost:${PORT}`);
// });







// // import express from 'express';
// // // import dotenv from 'dotenv/config';
// // // import morgan from 'morgan';
// // // import cors from 'cors';
// // // import mongoose from 'mongoose';
// // import productRoutes from './routers/products.js';

// // const app = express();
// // const PORT = 5000;

// // app.listen(PORT, () => {
// //     console.log(`Server is running on port http://localhost:${PORT}`);
// // });

// // // app.get('/', (req, res) => {
// // //     res.send('Bhavani Bhavani Bhavani!');
// // // });

// // app.get('/products', productRoutes);




// // // const express = require('express');
// // // const dotenv = require('dotenv/config');
// // // const morgan = require('morgan');
// // // const cors = require('cors');
// // // // const mongoose = require('mongoose');

// // // const app = express();
// // // const api = process.env.API_URL;

// // // app.use(express.json()); // Middleware to parse JSON request body
// // // app.use(morgan('tiny'));
// // // app.use(cors());
// // // app.use(`{api}/products`, )
// // // // app.use(`${api}/products`, productRouter);

// // // const Product = require('./models/product').Product;


// // // app.post(`${api}/products`, (req, res) => {
// // //     const product = new Product({
// // //         name: req.body.name,
// // //         image: req.body.image,
// // //         countInStock: req.body.countInStock,
// // //         price: req.body.price,
// // //     });

// // //     product.save().then((createdProduct => {
// // //         res.status(201).json(createdProduct);
// // //     })).catch((err) => {
// // //         res.status(500).json({error: err, success: false, message: 'Error creating product'});
// // //     })
// // //     // const product = req.body;
// // //     console.log(product);
// // //     // res.send(product);
// // // });


// // // mongoose.connect(process.env.CONNECTION_STRING).then(() => {
// // //     console.log('Database Connection is ready...');
// // // }).catch((err) => {
// // //     console.log(err);
// // //   });


// // // app.listen(3000, () => {
// // //     console.log('Server is running on port http://localhost:3000/api/v1/products');
// // //     // console.log(process.env.CONNECTION_STRING);
// // // });

// // // app.get('/', (req, res) => {
// // //     res.send('Maa Bagavati Shakti ki Jai!');
// // //     const product = {
// // //         id: 1,
// // //         name: 'Product 1',
// // //         price: 100
// // //     }
// // //     res.send(product);
// // //   });


// // // // app.get(API_UR, (req, res) => {
// // // app.get(api, (_, res) => {
// // //     // res.send('Maa Bagavati Shakti ki Jai!');
// // //     console.log('Maa Bagavati Shakti ki Jai!');
// // //     const product = {
// // //         id: 1,
// // //         name: 'Product 1',
// // //         price: 100
// // //     }

// // //     res.send(product);
// // // });

// // // app.get(`${api}/products`,async (req, res) => {
// // //     const productList = await Product.find();
// // //     res.send(productList);
// // //     console.log('Products unavailable');
// // // })

// // // // app.get(`${api}/products`, (req, res) => {
// // // //     // const product = {
// // // //     //     id: 1,
// // // //     //     name: 'Product 1',
// // // //     //     price: 100
// // // //     // }
// // // //     const productList = Product.find().then((products) => {
// // // //         return products;
// // // //     }).catch((err) => {
// // // //         console.log(err);
// // // //     });
// // // //     res.send(productList); 
// // // //     // res.send(productList);
// // // //     console.log('Products unavailable');

// // // // })
// // // console.log('jai mata di'); 
// // // console.log('Bhavani Bhavani Bhavani');
// // // // console.log(API_UR);


// // // // app.use(express.json());

// // // // app.post('/api/products', (req, res) => {
// // // //     const product = req.body;
// // // //     console.log(product);
// // // //     res.send(product);
// // // // });

// // // // mongoose.connect('mongodb+srv://shop-user:<db_password>@cluster0.toybd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');