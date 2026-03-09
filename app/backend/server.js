import 'express-async-errors';
import dotenv from 'dotenv';
import app from './src/app.js';
import { connectDB } from './src/config/db.js';
import { checkAIServiceHealth } from './src/services/aiService.js';


dotenv.config();

const requiredEnvVars = [
  'MONGO_URI',
  'JWT_SECRET',
  'IMAGEKIT_PUBLIC_KEY',
  'IMAGEKIT_PRIVATE_KEY',
  'IMAGEKIT_URL_ENDPOINT',
  'AI_SERVICE_URL',
];

const missingEnvVars = requiredEnvVars.filter(
  (envVar) => !process.env[envVar]
);

if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await connectDB();

    // Check AI service health
    console.log('Checking AI service health...');
    const aiServiceHealthy = await checkAIServiceHealth();
    if (aiServiceHealthy) {
      console.log('✓ AI service is healthy');
    } else {
      console.warn('⚠ AI service is not responding - will retry on demand');
    }

    // Start Express server
    app.listen(PORT, () => {
      console.log(`
╔════════════════════════════════════════╗
║   Malaria Detection Backend Server     ║
╠════════════════════════════════════════╣
║   Server running on port ${PORT}         ║
║   Environment: ${process.env.NODE_ENV || 'development'}      ║
║   Database: Connected                  ║
╚════════════════════════════════════════╝
      `);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err.message);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err.message);
  process.exit(1);
});

startServer();