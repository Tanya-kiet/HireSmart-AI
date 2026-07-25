from pydantic import BaseModel


class PredictionResponse(BaseModel):
    predicted_category: str