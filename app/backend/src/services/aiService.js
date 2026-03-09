import axios from 'axios';

const getAiConfig = () => {
  const baseUrl = (process.env.AI_SERVICE_URL || 'http://localhost:8000').replace(/\/$/, '');
  const predictEndpoint = process.env.AI_SERVICE_PREDICT_ENDPOINT || '/api/v1/predict';

  return {
    baseUrl,
    predictEndpoint: predictEndpoint.startsWith('/')
      ? predictEndpoint
      : `/${predictEndpoint}`,
  };
};

const buildUrl = (baseUrl, endpoint) => {
  const normalized = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${baseUrl}${normalized}`;
};

/**
 * Send image to FastAPI for malaria prediction
 * @param {{buffer: Buffer, mimetype?: string, originalname?: string}} file - Uploaded file from multer
 * @returns {Promise<{success: boolean, data?: object, error?: string}>}
 */
export const predictMalaria = async (file) => {
  try {
    if (!file?.buffer) {
      throw new Error('Invalid file provided for prediction');
    }

    const { baseUrl, predictEndpoint } = getAiConfig();
    const formData = new FormData();
    const blob = new Blob([file.buffer], {
      type: file.mimetype || 'application/octet-stream',
    });
    formData.append('file', blob, file.originalname || 'scan-image.jpg');

    const response = await axios.post(
      buildUrl(baseUrl, predictEndpoint),
      formData,
      {
        timeout: 30000, // 30 seconds
      }
    );

    // Validate response structure
    if (!response.data || !response.data.prediction || response.data.confidence === undefined) {
      throw new Error('Invalid response structure from AI service');
    }

    return {
      success: true,
      data: {
        prediction: response.data.prediction,
        confidence: response.data.confidence,
      },
    };
  } catch (error) {
    const statusCode = error.response?.status;
    const detail = error.response?.data?.detail;
    const message = detail
      ? `AI service error (${statusCode}): ${JSON.stringify(detail)}`
      : error.message;

    console.error('Error calling AI service:', message);

    return {
      success: false,
      error: message || 'Failed to get prediction from AI service',
    };
  }
};

/**
 * Health check for FastAPI service
 * @returns {Promise<boolean>}
 */
export const checkAIServiceHealth = async () => {
  const candidates = ['/health', '/openapi.json', '/'];

  try {
    const { baseUrl } = getAiConfig();

    for (const endpoint of candidates) {
      try {
        const response = await axios.get(buildUrl(baseUrl, endpoint), {
          timeout: 5000,
        });

        if (response.status === 200) {
          return true;
        }
      } catch (innerError) {
        // Try next endpoint candidate.
      }
    }

    return false;
  } catch (error) {
    console.error('AI service health check failed:', error.message);
    return false;
  }
};
