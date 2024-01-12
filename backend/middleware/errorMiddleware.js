const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    // next(error);
    next(error);
};

// This Handler is used to handle the errors in the routes. Explanation in the productRoutes.js file.

const errorHandler = (err, req, res, next) => {
    // Sometimes we get a 200 status code even when there is an error. So we set the status code to 500 if the status code is 200.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;
    
    if(err.name === 'CastError'){
        message = 'Resource not found';
        statusCode = 404;
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}


export { errorHandler, notFound };

