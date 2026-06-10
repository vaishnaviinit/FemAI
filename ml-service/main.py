from fastapi import FastAPI

from app.routes.prediction import router

app = FastAPI(
    title="FemAI ML Service"
)

app.include_router(router)


@app.get("/")
def home():
    return {
        "message": "FemAI ML Service Running"
    }