import express from 'express';
import { protect } from '../../auth/middleware/authMiddleware.js';
import { uploadImage } from '../middleware/uploadMiddleware.js';
import {
  createScan,
  getScanHistory,
  getScanById,
  deleteScan,
} from '../controllers/malariaController.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Scan routes
router.post('/scan', uploadImage.single('image'), createScan);
router.get('/scan/history', getScanHistory);
router.get('/scan/:scanId', getScanById);
router.delete('/scan/:scanId', deleteScan);

export default router;
