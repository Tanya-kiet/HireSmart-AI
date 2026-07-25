"""
model_loader.py

Loads the trained ML model, TF-IDF vectorizer,
and label encoder from disk.
"""

import joblib

from backend.app.config.settings import MODELS_DIR


def load_model():
    """Load the trained classifier."""
    return joblib.load(MODELS_DIR / "resume_classifier.pkl")


def load_vectorizer():
    """Load the TF-IDF vectorizer."""
    return joblib.load(MODELS_DIR / "tfidf_vectorizer.pkl")


def load_label_encoder():
    """Load the label encoder."""
    return joblib.load(MODELS_DIR / "label_encoder.pkl")


# Load once when application starts
classifier = load_model()
vectorizer = load_vectorizer()
label_encoder = load_label_encoder()