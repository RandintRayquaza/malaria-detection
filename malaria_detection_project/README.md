# Malaria Detection System

## Overview
This project is a production-ready Malaria detection system. It features a Convolutional Neural Network (CNN) trained on the NIH Malaria dataset to classify cell images as 'Parasitized' or 'Uninfected'. The system includes a FastAPI backend for real-time inference and uses `uv` for robust dependency management.

## Project Structure
- `app/`: Contains the FastAPI application logic.
    - `api/`: API endpoint definitions (e.g., prediction).
    - `services/`: Singleton model loading logic.
    - `utils/`: Image preprocessing utilities.
- `training/`: Scripts for data loading and model training.
- `models/`: Directory where the trained `.h5` models are stored.
- `data/`: Directory for the NIH Malaria dataset (zip and extracted images).
- `pyproject.toml` & `requirements.txt`: Dependency specifications.

## Environment Setup
This project uses `uv` for lightning-fast package management.
1. Install `uv`: `pip install uv`.
2. Initialize environment and sync dependencies:
   ```bash
   uv sync
   ```
   Alternatively, install from requirements: `uv pip install -r requirements.txt`.

## How to Train
To train the model from scratch, ensure you are in the project root and run:bash
export PYTHONPATH=$PYTHONPATH:. 
python training/train_model.py
This script will download the dataset to `data/`, preprocess it, and save the trained model to `models/malaria_cnn.h5`.

## How to Run the Server
Start the FastAPI production server using `uvicorn`:bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
The API will be available at `http://localhost:8000`.

## API Testing
You can test the prediction endpoint using `curl`. Replace `cell_image.png` with a path to a local image file:bash
curl -X 'POST' \
  'http://localhost:8000/api/v1/predict' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@cell_image.png;type=image/png'

### Expected Response Formatjson
{
  "filename": "cell_image.png",
  "prediction": "Parasitized",
  "confidence": 0.9982,
  "raw_score": 0.0018
}
