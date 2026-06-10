from fastapi import APIRouter

from app.schemas.patient_lite import PatientLite
from app.schemas.patient_detailed import PatientDetailed

from app.services.prediction_service import (
    predict_quick,
    predict_detailed
)

router = APIRouter()


@router.post("/predict/quick")
def quick_prediction(patient: PatientLite):
    return predict_quick(patient)


@router.post("/predict/detailed")
def detailed_prediction(patient: PatientDetailed):
    return predict_detailed(patient)