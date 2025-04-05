import express from 'express';
import { getProducts, postProducts } from '../controllers/products.js';

const router = express.Router()

router.get('/', getProducts);
router.post(`/`, postProducts);

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

