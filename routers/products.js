import express from 'express';

const router = express.Router();

router.get(`/`, (_, res) => {
    res.send('Hello World!');
});

export default router;

// import express from 'express';
// const router = express.Router();

// router.get(`/`, (req, res) => {
//     res.send('Hello World!');
// });



