import ImageKit from 'imagekit';

let imageKit = null;

/**
 * Initialize ImageKit client (lazy initialization)
 */
const getImageKitClient = () => {
  if (!imageKit) {
    if (!process.env.IMAGEKIT_PUBLIC_KEY || !process.env.IMAGEKIT_PRIVATE_KEY || !process.env.IMAGEKIT_URL_ENDPOINT) {
      throw new Error('Missing ImageKit credentials in environment variables');
    }
    
    imageKit = new ImageKit({
      publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    });
  }
  return imageKit;
};

/**
 * Upload image to ImageKit
 * @param {Object} file - File object from multer (with buffer and originalname)
 * @returns {Promise<{url: string, fileId: string}>}
 */
export const uploadImageToImageKit = async (file) => {
  try {
    if (!file || !file.buffer) {
      throw new Error('Invalid file object');
    }

    const client = getImageKitClient();
    const timestamp = Date.now();
    const fileName = `malaria-scan-${timestamp}-${file.originalname}`;

    const response = await client.upload({
      file: file.buffer,
      fileName,
      folder: '/malaria-scans',
      tags: ['malaria-detection', timestamp],
      useUniqueFileName: true,
    });

    return {
      url: response.url,
      fileId: response.fileId,
      name: response.name,
    };
  } catch (error) {
    console.error('Error uploading to ImageKit:', error.message);
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};

/**
 * Delete image from ImageKit
 * @param {string} fileId - ImageKit file ID
 * @returns {Promise<boolean>}
 */
export const deleteImageFromImageKit = async (fileId) => {
  try {
    const client = getImageKitClient();
    await client.deleteFile(fileId);
    return true;
  } catch (error) {
    console.error('Error deleting from ImageKit:', error.message);
    throw new Error(`Failed to delete image: ${error.message}`);
  }
};

/**
 * Get file metadata from ImageKit
 * @param {string} fileId - ImageKit file ID
 * @returns {Promise<Object>}
 */
export const getImageKitFileDetails = async (fileId) => {
  try {
    const client = getImageKitClient();
    const response = await client.getFileDetails(fileId);
    return response;
  } catch (error) {
    console.error('Error getting file details from ImageKit:', error.message);
    throw new Error(`Failed to get image details: ${error.message}`);
  }
};
