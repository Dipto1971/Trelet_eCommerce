import jwt from 'jsonwebtoken';
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Read the JWT from the cookie
    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
            // req.user is used in userController.js & here we are getting the user from the database and attaching it to the request object
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Admin middleware

const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
        // If the user is an admin, we can proceed to the next middleware
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { admin, protect };

