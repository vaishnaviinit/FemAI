from pydantic import BaseModel

class PatientDetailed(BaseModel):
    data: list[float]