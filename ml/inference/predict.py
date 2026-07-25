from pathlib import Path

from backend.app.config.settings import UPLOADS_DIR
from ml.inference.predictor import predict_resume_category

if __name__ == "__main__":
    sample = UPLOADS_DIR / "sample_resume.pdf"

    prediction = predict_resume_category(str(sample))

    print("\nPredicted Category")
    print("------------------")
    print(prediction)