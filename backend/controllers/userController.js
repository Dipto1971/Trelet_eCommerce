import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public

const authUsers = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }); //Matching email from database

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Register user & get token
// @route   POST /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email: email }); //Matching email from database

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({ //Creating a new user
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        
        res.status(201).json({ //If user is created successfully
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Logout user / clear token
// @route   POST /api/users/logout
// @access  Private

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),

    });

    res.status(200).json({
        message: 'User logged out successfully'
    });
});

// @desc    Get user profile
// @route   POST /api/users/logout
// @access  Public

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); //Finding user by id

    if (user) {
        res.status(200).json({ //If user is found
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id); //Finding user by id

    if(user) {
        user.name = req.body.name || user.name; //If user name is updated, update the user name
        user.email = req.body.email || user.email; //If user email is updated, update the user email

        if(req.body.password) { //If user password is updated, update the user password
            user.password = req.body.password;
        }

        const updatedUser = await user.save(); //Saving updated user

        res.status(200).json({ //If user is updated
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
    res.send('get users');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin

const getUserById = asyncHandler(async (req, res) => {
    res.send('get user by id');
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
    res.send('delete user');
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
    res.send('update user');
});

export {
    authUsers, deleteUser, getUserById, getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile
};

