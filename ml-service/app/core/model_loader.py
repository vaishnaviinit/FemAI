import os
import joblib

BASE_DIR = os.path.dirname(
    os.path.dirname(
        os.path.dirname(
            os.path.dirname(__file__)
        )
    )
)

full_model = joblib.load(
    os.path.join(BASE_DIR, "models", "pcos_xgboost.pkl")
)

lite_model = joblib.load(
    os.path.join(BASE_DIR, "models", "pcos_xgboost_lite.pkl")
)