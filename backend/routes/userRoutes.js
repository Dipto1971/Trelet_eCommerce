import express from 'express';
import {
    authUsers, deleteUser, getUserById, getUserProfile, getUsers, logoutUser, registerUser, updateUser, updateUserProfile
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, admin, getUsers).post(registerUser);

router.post('/logout', logoutUser);

router.post('/auth', authUsers);

router
.route('/profile')
.get(protect, getUserProfile)
.put(protect, updateUserProfile);

router
.route('/:id')
.delete(protect, admin, deleteUser)
.get(protect, admin, getUserById)
.put(protect, admin, updateUser);

export default router;
