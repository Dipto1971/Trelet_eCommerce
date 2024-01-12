const asyncHandler = fn => (req, res, next) =>{
    Promise.resolve(fn(req, res, next)).catch(next);
}

export default asyncHandler;

// This Handler is used to handle the errors in the routes. Explanation in the productRoutes.js file.
// The asyncHandler is used to handle the errors in the routes. It is a middleware function that takes another function as an argument.