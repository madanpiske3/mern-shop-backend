import express from 'express';
// import mongoose from 'mongoose';
import { deleteProducts, getCountProducts, getFeaturedProducts, getFeaturedProductsByCount, getProducts, getProductsById, postProducts, updateProducts } from '../controllers/products.js';
import { get } from 'mongoose';

const router = express.Router()


// router.get('/', getProducts);
router.get('/:id', getProductsById);
router.post(`/`, postProducts);
router.put('/:id', updateProducts);
router.delete('/:id', deleteProducts);

router.get('/get/count', getCountProducts);
router.get('/get/featured', getFeaturedProducts);
router.get('/get/featured/:count', getFeaturedProductsByCount);

// two types of parameters, get-url-parameter and body.params and other query parameters
// localhost:35k:/api/v1/products?categories=123,456
router.get('/', getProducts);
// router.get('/')

export default router;


// import express from 'express';
// const router = express.Router();
// router.get(`/`, (_, res) => {
//     res.send('Hello World!');
// });
// export default router;
// // import express from 'express';
// // const router = express.Router();
// // router.get(`/`, (req, res) => {
// //     res.send('Hello World!');
// // });

