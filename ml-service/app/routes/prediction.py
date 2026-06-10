from fastapi import APIRouter

from app.schemas.patient import PatientData
from app.services.prediction_service import predict_pcos

router = APIRouter()


@router.post("/predict")
def predict(patient: PatientData):
    return predict_pcos(patient.model_dump())