import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { uploadImage } from '../../malaria/middleware/uploadMiddleware.js';
import {
  register,
  login,
  getCurrentUser,
  updateProfile,
  uploadProfileImage,
  deleteAccount,
} from '../controllers/authController.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getCurrentUser);
router.put('/profile', protect, updateProfile);
router.post('/profile-image', protect, uploadImage.single('image'), uploadProfileImage);
router.delete('/delete', protect, deleteAccount);

export default router;
