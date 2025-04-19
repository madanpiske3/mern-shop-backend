import express from 'express';

import { deleteCategories, getCategories, postCategories, updateCategories } from '../controllers/categories.js';
import Category from '../models/category.js';

const router = express.Router();

// Create a new category
router.post('/', postCategories);

// Get all categories
router.get('/', getCategories);
router.delete('/:id', deleteCategories);

// Get a single category by ID
router.get('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// router.put(':/id', updateCategories);
router.put('/:id', async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!category) {
            return res.status(404).json({ success: false, message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;

// import express from 'express';
// import { Category } from '../models/category.js';

// const router = express.Router();

// const tempJson = [
//     {
//         id: '1',
//         name: 'Category 1',
//         image: 'https://example.com/category1.jpg'
//     }
// ]

// router.get('/', async (req, res) => {
//     // const categoryList = await Category.find();
//     // res.send(categoryList);
//     res.send(tempJson);
// });


// export default router;


// // import { Category } from '../models/category';
// // // import { Category } from '../models/category.js';
// // import { Category } from '../models/category.js';
// // // const { Category } = require('../models/category');
// // // import controllers here like getCategories, postCategories, etc.

// // // temp creating categories controller

