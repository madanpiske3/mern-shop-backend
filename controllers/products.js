// import Product from '../models/Product.js';
import Category from "../models/category.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
    // res.send('Hello World from controllers! to routers to app.js!'); 
    // const productList = await Product.find().select('name image');
    // const productList = await Product.find();
    // res.send(productList);
    // const productList = await Product.find();
    // return res.send(productList);
    let filter = {};
    if (req.query.categories) {
        // localhost:5k:/api/v1/products?categories=123,456
        filter = { category: req.query.categories.split(',') };
        const productList = await Product.find(filter).populate('category');

        // const categories = req.query.categories.split(',');
        // const products = await Product.find({ categories: { $in: categories } });
        if (!productList) {
            return res.status(400).send('Product not found');
        }
        res.send(productList);
        // res.send('hello categories world?');
        console.log("Categories string:", productsList)
    } else {
        const productList = await Product.find();
        res.send(productList);
    }

}


export const getProductsById = async (req, res) => {
    // check if id is valid mongoose id
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product ID');
    }
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
        return res.status(400).send('Product not found');
    }
    res.send(product);
}

export const postProducts = async (req, res) => {
    // if category received id does not exist in db,
    const category = await Category.findById(req.body.category);
    console.log(category);
    if (!category) {
        return res.status(400).send('Invalid Category').message('Invalid Category');
        // res.send('Invalid Category');
    }
    const product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured
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

export const updateProducts = async (req, res) => {
    // Validate if category id is valid
    const category = await Category.findById(req.body.category);
    if (!category) {
        return res.status(400).send('Invalid Category');
    }
    // const product = await Product.findByIdAndUpdate(
    //     req.params.id,
    //     req.body,
    //     { new: true }
    // ).populate('category');
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    if (!product) {
        return res.status(400).send('Product not found');
    }
    res.send(product);
    // res.send('Update Product!');
}

export const deleteProducts = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product ID');
    }
    try{
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(400).send('Product not found');
    }
    // await Product.findByIdAndDelete(req.params.id);
    await Product.findByIdAndDelete(req.params.id);
    res.send(product);
    // res.send("Deleting Product!");
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getCountProducts = async (req, res) => {
    try{
    const productCount = await Product.countDocuments();
    if (!productCount) {
        return res.status(400).send('Product not found');
    }
    console.log(typeof(productCount));
    res.send({ productCount: productCount });
    }
    catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
    // res.send('Get Count Products!');
}

export const getFeaturedProducts = async (req, res) => {
    // getting all featured products
    const products = await Product.find({ isFeatured: true });
    if (!products) {
        return res.status(400).send('Product not found');
    }
    res.send(products);
    // res.send('Ok sending featured products!');
}
export const getFeaturedProductsByCount = async (req, res) => {
    try {
        const count = req.params.count ? parseInt(req.params.count) : 5;
        // const products = await Product.find({ isFeatured: true }).limit(count);
        const products = await Product.find({ isFeatured: true }).limit(+count);
        if (!products) {
            return res.status(400).send('Product not found');
        }
        res.send(products);
    }catch(error){
        res.status(500).json({ success: false, message: error.message });
    }
}

export const getProductsByCategory = async (req, res) => {
    res.send('Get Products By Category!');
}