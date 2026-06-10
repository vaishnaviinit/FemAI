from pydantic import BaseModel


class PatientData(BaseModel):
    Age: float
    Weight: float
    Height: float
    BMI: float
    Cycle_RI: float
    Weight_gain_YN: int
    hair_growth_YN: int
    Skin_darkening_YN: int
    Fast_food_YN: int
    Reg_Exercise_YN: int
    AMH: float
    Follicle_No_L: float
    Follicle_No_R: float