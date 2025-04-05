
// import Product from '../models/Product.js';
import Product from "../models/product.js";

export const getProducts = (req, res) => {
    res.send('Hello World from controllers! to routers to app.js!'); 
}

export const postProducts = (req, res) => {
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
}