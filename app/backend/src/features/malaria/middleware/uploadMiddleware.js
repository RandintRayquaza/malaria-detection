import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  // Accept only image files
  const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

export const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});
