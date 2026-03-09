# Malaria Detection Backend

A production-ready Node.js/Express backend for malaria detection system with modular feature-based architecture.

## Features

- ✅ **Modular Architecture** - Feature-based organization (auth, malaria)
- ✅ **JWT Authentication** - Secure token-based authentication
- ✅ **Image Upload** - Multer for file uploads
- ✅ **Cloud Storage** - ImageKit integration for image storage
- ✅ **AI Integration** - FastAPI integration for malaria prediction
- ✅ **MongoDB** - Mongoose for database management
- ✅ **Error Handling** - Comprehensive error handling middleware
- ✅ **CORS** - Cross-origin resource sharing support
- ✅ **Environment Variables** - Secure configuration management

## Project Structure

```
backend/
├── src/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── routes/
│   │   │   │   └── authRoutes.js          # Auth endpoints
│   │   │   ├── controllers/
│   │   │   │   └── authController.js      # Auth logic
│   │   │   ├── middleware/
│   │   │   │   └── authMiddleware.js      # JWT protection
│   │   │   └── models/
│   │   │       └── User.js                # User schema
│   │   └── malaria/
│   │       ├── routes/
│   │       │   └── malariaRoutes.js       # Scan endpoints
│   │       ├── controllers/
│   │       │   └── malariaController.js   # Scan logic
│   │       ├── middleware/
│   │       │   └── uploadMiddleware.js    # File upload config
│   │       └── models/
│   │           └── Scan.js                # Scan schema
│   ├── services/
│   │   ├── aiService.js                   # FastAPI integration
│   │   └── imagekitService.js             # ImageKit integration
│   ├── config/
│   │   └── db.js                          # MongoDB connection
│   ├── middleware/
│   │   └── errorHandler.js                # Error handling
│   └── app.js                             # Express app setup
├── server.js                              # Server entry point
├── package.json                           # Dependencies
├── .env                                   # Environment variables
├── .env.example                           # Environment template
└── README.md                              # This file
```

## Prerequisites

- Node.js (v14+ recommended)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)
- ImageKit account
- FastAPI malaria detection service running on `http://localhost:8000`

## Installation

1. **Navigate to backend directory:**
   ```bash
   cd app/backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Fill in your credentials:
     ```bash
     PORT=5000
     NODE_ENV=development
     MONGO_URI=your_mongodb_uri
     JWT_SECRET=your_secret_key
     JWT_EXPIRE=7d
     IMAGEKIT_PUBLIC_KEY=your_public_key
     IMAGEKIT_PRIVATE_KEY=your_private_key
     IMAGEKIT_URL_ENDPOINT=your_endpoint
     AI_SERVICE_URL=http://localhost:8000
     AI_SERVICE_PREDICT_ENDPOINT=/predict
     ```

## Running the Server

**Development mode (with hot reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will start on `http://localhost:5000`

## API Endpoints

### Authentication

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Malaria Detection

All malaria endpoints require JWT authentication. Include token in Authorization header:
```
Authorization: Bearer <token>
```

#### Create Scan (Upload & Predict)
```http
POST /scan
Content-Type: multipart/form-data

[Binary image file as form data with key 'image']
```

**Response:**
```json
{
  "success": true,
  "message": "Scan completed successfully",
  "data": {
    "scanId": "scan_id",
    "imageUrl": "https://ik.imagekit.io/...",
    "prediction": "Parasitized",
    "confidence": 0.91,
    "createdAt": "2024-03-09T10:30:00Z"
  }
}
```

#### Get Scan History
```http
GET /scan/history?page=1&limit=10
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Scan history retrieved successfully",
  "data": {
    "scans": [
      {
        "_id": "scan_id",
        "userId": "user_id",
        "imageUrl": "https://ik.imagekit.io/...",
        "prediction": "Parasitized",
        "confidence": 0.91,
        "createdAt": "2024-03-09T10:30:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 15,
      "totalPages": 2
    }
  }
}
```

#### Get Scan by ID
```http
GET /scan/:scanId
Authorization: Bearer <token>
```

#### Delete Scan
```http
DELETE /scan/:scanId
Authorization: Bearer <token>
```

### Health Check

```http
GET /health
```

**Response:**
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2024-03-09T10:30:00Z"
}
```

## Error Handling

All error responses follow this format:

```json
{
  "success": false,
  "error": {
    "message": "Error description",
    "statusCode": 400
  }
}
```

Common status codes:
- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Database Models

### User
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Scan
```javascript
{
  userId: ObjectId (required, references User),
  imageUrl: String (required),
  prediction: String (enum: ['Parasitized', 'Uninfected']),
  confidence: Number (0-1),
  imageFileName: String,
  notes: String,
  createdAt: Date,
  updatedAt: Date
}
```

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` or `production` |
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://...` |
| `JWT_SECRET` | JWT signing secret | `your-secret-key` |
| `JWT_EXPIRE` | JWT expiration time | `7d` |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key | `public_...` |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key | `private_...` |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | `https://ik.imagekit.io/...` |
| `AI_SERVICE_URL` | FastAPI service URL | `http://localhost:8000` |
| `AI_SERVICE_PREDICT_ENDPOINT` | Prediction endpoint | `/predict` |

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (v5.x)
- **Database**: MongoDB with Mongoose (v9.x)
- **Authentication**: JWT with bcryptjs
- **File Upload**: Multer
- **Cloud Storage**: ImageKit
- **HTTP Client**: Axios
- **Environment**: dotenv
- **CORS**: cors
- **Error Handling**: express-async-errors

## Development

### Project Structure Benefits

- **Modularity**: Each feature is self-contained with its own routes, controllers, and models
- **Scalability**: Easy to add new features without affecting existing code
- **Maintainability**: Clear separation of concerns
- **Testability**: Easy to test individual features

### Code Style

- Async/await for asynchronous operations
- Consistent error handling
- JSDoc comments for functions
- Environment variables for configuration

## Deployment

1. **Build for production:**
   ```bash
   npm install
   ```

2. **Set environment variables:**
   - Set `NODE_ENV=production`
   - Use secure values for all sensitive data

3. **Start server:**
   ```bash
   npm start
   ```

## Troubleshooting

### MongoDB Connection Error
- Verify `MONGO_URI` is correct
- Check MongoDB Atlas IP whitelist includes your IP
- Ensure network connectivity

### ImageKit Upload Fails
- Verify ImageKit credentials
- Check image size doesn't exceed 10MB
- Ensure file is a valid image format (JPEG, PNG, GIF)

### AI Service Not Responding
- Verify FastAPI service is running on `http://localhost:8000`
- Check `AI_SERVICE_URL` environment variable
- Review FastAPI service logs

### JWT Token Invalid
- Verify token is in Authorization header as `Bearer <token>`
- Check token hasn't expired (7 days default)
- Verify `JWT_SECRET` matches between encoding and decoding

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
