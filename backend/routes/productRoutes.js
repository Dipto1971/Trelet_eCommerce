import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    //fetching data from the database MongoDB
    const products = await Product.find({});
    res.json(products);
}));
// from app. to router. and from app.get to router.get means that we are using the router to get the products instead of the app.

router.get(
    '/:id',
    asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id);
    
    if(product){
        res.json(product);
    }
    else{
        res.status(404);
        throw new Error('Resource you searched not found');
    }
        // Thorowing new error is using the errorHandler middleware function.
}));

export default router;