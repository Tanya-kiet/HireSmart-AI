from backend.app.repositories.base import BaseRepository
from backend.app.models.prediction import Prediction
from backend.app.schemas.prediction import PredictionCreate, PredictionBase


class PredictionRepository(BaseRepository[Prediction, PredictionCreate, PredictionBase]):
    pass


prediction_repository = PredictionRepository(Prediction)
