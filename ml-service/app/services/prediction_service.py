import pandas as pd

from app.core.model_loader import model


def predict_pcos(patient_data):
    df = pd.DataFrame([patient_data])

    probability = model.predict_proba(df)[0][1]

    if probability < 0.3:
        risk_level = "Low"
    elif probability < 0.7:
        risk_level = "Medium"
    else:
        risk_level = "High"

    return {
        "risk_score": round(float(probability), 4),
        "risk_level": risk_level
    }