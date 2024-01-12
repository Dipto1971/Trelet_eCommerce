import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    //fetching data from the database MongoDB
    const products = await Product.find({});
    res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler( async(req, res) => {
    const product = await Product.findById(req.params.id);
    
    if(product){
        res.json(product);
    }
    else{
        res.status(404);
        throw new Error('Resource you searched not found');
    }
        // Thorowing new error is using the errorHandler middleware function.
});

export { getProductById, getProducts };

