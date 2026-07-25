"""
Prediction service.

Acts as a bridge between FastAPI and the ML inference module.
"""

from ml.inference.predictor import predict_resume_category


def predict_category(pdf_path: str) -> str:
    """
    Predict resume category.
    """
    return predict_resume_category(pdf_path)