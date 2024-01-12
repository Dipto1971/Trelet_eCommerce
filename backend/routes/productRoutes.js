import express from 'express';
import products from '../data/products.js';
const router = express.Router();

router.get('/', (req, res) => {
    res.send(products);
});
// from app. to router. and from app.get to router.get means that we are using the router to get the products instead of the app.

router.get('/:id', (req, res) => {
    const product = products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);
    } else {
        res.status(404).send({ message: 'Product Not Found'});
    }
});

export default router;