from fastapi import FastAPI
from app.api import predict

app = FastAPI(
    title="Malaria Detection System",
    description="A production-ready CNN-based Malaria detection API using NIH dataset.",
    version="1.0.0"
)

# Include the prediction router
app.include_router(predict.router, prefix="/api/v1", tags=["prediction"])

@app.get("/")
async def root():
    return {"message": "Welcome to the Malaria Detection System API. Use /api/v1/predict for image classification."}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

print('FastAPI application initialized at app/main.py')
