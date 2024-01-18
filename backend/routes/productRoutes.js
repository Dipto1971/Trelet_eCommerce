import express from 'express';
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.route('/:id')
.get(getProductById)
.put(protect, admin, updateProduct)
.delete(protect, admin, deleteProduct);
router.route('/:id/reviews').post(protect, createProduct);
router.route('/:id/reviews').post(protect, createProductReview);

export default router;

// Previous code:
// router.get('/', asyncHandler(async (req, res) => {
//     //fetching data from the database MongoDB
//     const products = await Product.find({});
//     res.json(products);
// }));
// // from app. to router. and from app.get to router.get means that we are using the router to get the products instead of the app.

// router.get(
//     '/:id',
//     asyncHandler( async(req, res) => {
//     const product = await Product.findById(req.params.id);
    
//     if(product){
//         res.json(product);
//     }
//     else{
//         res.status(404);
//         throw new Error('Resource you searched not found');
//     }
//         // Thorowing new error is using the errorHandler middleware function.
// }));