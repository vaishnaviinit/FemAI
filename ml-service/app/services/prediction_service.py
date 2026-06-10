import pandas as pd

from app.core.model_loader import (
    full_model,
    lite_model
)


def predict_quick(patient):

    df = pd.DataFrame([{
        "Age (yrs)": patient.Age,
        "Weight (Kg)": patient.Weight,
        "BMI": patient.BMI,
        "Cycle(R/I)": patient.Cycle_RI,
        "Weight gain(Y/N)": patient.Weight_gain_YN,
        "hair growth(Y/N)": patient.hair_growth_YN,
        "Skin darkening (Y/N)": patient.Skin_darkening_YN,
        "Fast food (Y/N)": patient.Fast_food_YN,
        "Reg.Exercise(Y/N)": patient.Reg_Exercise_YN,
        "AMH(ng/mL)": patient.AMH,
        "Follicle No. (L)": patient.Follicle_No_L,
        "Follicle No. (R)": patient.Follicle_No_R
    }])

    prediction = lite_model.predict(df)[0]
    probability = lite_model.predict_proba(df)[0][1]

    return {
        "model": "Lite (12 Features)",
        "prediction": int(prediction),
        "risk_probability": round(float(probability), 4)
    }


def predict_detailed(patient):

    df = pd.DataFrame([patient.data])

    prediction = full_model.predict(df)[0]
    probability = full_model.predict_proba(df)[0][1]

    return {
        "model": "Detailed (41 Features)",
        "prediction": int(prediction),
        "risk_probability": round(float(probability), 4)
    }