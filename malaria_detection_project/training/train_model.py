import os
import tensorflow as tf
from tensorflow.keras import layers, models
from training.dataset_loader import prepare_datasets

def build_model(input_shape=(128, 128, 3)):
    model = models.Sequential([
        layers.Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(64, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Conv2D(128, (3, 3), activation='relu'),
        layers.MaxPooling2D((2, 2)),
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.Dropout(0.5),
        layers.Dense(1, activation='sigmoid')
    ])
    
    model.compile(
        optimizer='adam',
        loss='binary_crossentropy',
        metrics=['accuracy']
    )
    return model

if __name__ == '__main__':
    DATA_DIR = 'data/'
    MODEL_SAVE_PATH = 'models/malaria_cnn.h5'
    
    print("Loading datasets...")
    train_ds, val_ds = prepare_datasets(DATA_DIR)
    
    print("Building model...")
    model = build_model()
    model.summary()
    
    print("Starting training...")
    history = model.fit(
        train_ds,
        validation_data=val_ds,
        epochs=5
    )
    
    os.makedirs('models', exist_ok=True)
    model.save(MODEL_SAVE_PATH)
    print(f"Model trained and saved to {MODEL_SAVE_PATH}")
