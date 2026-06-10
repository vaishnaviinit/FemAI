import os
import joblib


BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "models",
    "pcos_xgboost.pkl"
)

model = joblib.load(MODEL_PATH)