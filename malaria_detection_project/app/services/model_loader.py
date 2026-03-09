import tensorflow as tf
import os

# Global variable to hold the model instance
_model = None

def get_model(model_path='models/malaria_cnn.h5'):
    """
    Loads and returns the Keras model. Uses a singleton pattern to avoid
    re-loading the model on every request.
    """
    global _model
    if _model is None:
        if not os.path.exists(model_path):
            raise FileNotFoundError(f"Model file not found at {model_path}. Please run the training script first.")
        
        print(f"Loading model from {model_path}...")
        _model = tf.keras.models.load_model(model_path)
        print("Model loaded successfully.")
    
    return _model

if __name__ == '__main__':
    # Test loading
    try:
        model = get_model()
        print("Test load successful.")
    except Exception as e:
        print(f"Test load failed: {e}")

print('Model loader service created at app/services/model_loader.py')
