import numpy as np
from PIL import Image
import io

def preprocess_image(image_data: bytes, target_size=(128, 128)) -> np.ndarray:
    """
    Converts raw image bytes into a preprocessed numpy array ready for model prediction.
    """
    # Load image from bytes
    img = Image.open(io.BytesIO(image_data)).convert('RGB')
    
    # Resize image
    img = img.resize(target_size)
    
    # Convert to numpy array and normalize to [0, 1]
    img_array = np.array(img).astype('float32') / 255.0
    
    # Add batch dimension (1, 128, 128, 3)
    img_array = np.expand_dims(img_array, axis=0)
    
    return img_array

print('Preprocessing utility created at app/utils/image_preprocess.py')
