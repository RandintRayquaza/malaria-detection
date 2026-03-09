import Scan from '../models/Scan.js';
import { uploadImageToImageKit } from '../../../services/imagekitService.js';
import { predictMalaria } from '../../../services/aiService.js';

export const createScan = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload an image',
      });
    }

    // Upload image to ImageKit
    const imageKitResponse = await uploadImageToImageKit(req.file);
    const imageUrl = imageKitResponse.url;

    // Send image file to FastAPI for prediction
    const predictionResponse = await predictMalaria(req.file);

    if (!predictionResponse.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to process image for malaria detection',
        error: predictionResponse.error,
      });
    }

    // Save scan result to database
    const scan = await Scan.create({
      userId: req.user.id,
      imageUrl,
      prediction: predictionResponse.data.prediction,
      confidence: predictionResponse.data.confidence,
      imageFileName: req.file.originalname,
    });

    res.status(201).json({
      success: true,
      message: 'Scan completed successfully',
      data: {
        scanId: scan._id,
        imageUrl: scan.imageUrl,
        prediction: scan.prediction,
        confidence: scan.confidence,
        createdAt: scan.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getScanHistory = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    // Get total count
    const total = await Scan.countDocuments({ userId: req.user.id });

    // Get paginated scans
    const scans = await Scan.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      message: 'Scan history retrieved successfully',
      data: {
        scans,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getScanById = async (req, res, next) => {
  try {
    const { scanId } = req.params;

    const scan = await Scan.findOne({
      _id: scanId,
      userId: req.user.id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Scan retrieved successfully',
      data: scan,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteScan = async (req, res, next) => {
  try {
    const { scanId } = req.params;

    const scan = await Scan.findOneAndDelete({
      _id: scanId,
      userId: req.user.id,
    });

    if (!scan) {
      return res.status(404).json({
        success: false,
        message: 'Scan not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Scan deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
