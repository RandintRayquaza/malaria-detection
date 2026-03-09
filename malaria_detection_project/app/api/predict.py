from fastapi import APIRouter, File, UploadFile, HTTPException
from app.utils.image_preprocess import preprocess_image
from app.services.model_loader import get_model
import numpy as np

router = APIRouter()

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File provided is not an image.")

    try:
        # Read file bytes
        contents = await file.read()
        
        # Preprocess image
        img_array = preprocess_image(contents)
        
        # Get model and predict
        model = get_model()
        prediction_prob = model.predict(img_array)[0][0]
        
        # Logic: 0 = Parasitized, 1 = Uninfected (based on training loader labels)
        # Note: Sigmoid output < 0.5 is typically class 0
        label = "Uninfected" if prediction_prob > 0.5 else "Parasitized"
        confidence = float(prediction_prob) if prediction_prob > 0.5 else float(1 - prediction_prob)

        return {
            "filename": file.filename,
            "prediction": label,
            "confidence": round(confidence, 4),
            "raw_score": float(prediction_prob)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

print('API router created at app/api/predict.py')
