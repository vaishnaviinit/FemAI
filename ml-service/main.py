from fastapi import FastAPI

from app.routes.prediction import router as prediction_router

app = FastAPI(
    title="FemAI ML Service"
)

app.include_router(prediction_router)


@app.get("/")
def home():
    return {"message": "FemAI ML Service Running"}