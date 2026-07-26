"""
model_loader.py

Production-ready lazy loading system for HireSmart AI ML artifacts.
Caches classifier, TF-IDF vectorizer, and label encoder models in memory
and raises explicit RuntimeErrors with detailed logging if model files fail to load.
"""

import logging
from typing import Any
import joblib

from backend.app.config.settings import MODELS_DIR

logger = logging.getLogger(__name__)

# Private global caches
_classifier = None
_vectorizer = None
_label_encoder = None


def get_classifier() -> Any:
    """
    Lazy load and cache the trained classifier model.
    """
    global _classifier
    if _classifier is None:
        model_filename = "resume_classifier.pkl"
        model_path = MODELS_DIR / model_filename
        logger.info(f"Loading classifier model from {model_path}")
        try:
            _classifier = joblib.load(model_path)
            logger.info("Successfully loaded classifier model")
        except Exception as e:
            logger.error(f"Failed to load classifier model from {model_path}: {e}")
            raise RuntimeError(f"Could not load {model_filename}: {e}") from e
    return _classifier


def get_vectorizer() -> Any:
    """
    Lazy load and cache the TF-IDF vectorizer.
    """
    global _vectorizer
    if _vectorizer is None:
        model_filename = "tfidf_vectorizer.pkl"
        model_path = MODELS_DIR / model_filename
        logger.info(f"Loading TF-IDF vectorizer from {model_path}")
        try:
            _vectorizer = joblib.load(model_path)
            logger.info("Successfully loaded TF-IDF vectorizer")
        except Exception as e:
            logger.error(f"Failed to load TF-IDF vectorizer from {model_path}: {e}")
            raise RuntimeError(f"Could not load {model_filename}: {e}") from e
    return _vectorizer


def get_label_encoder() -> Any:
    """
    Lazy load and cache the label encoder.
    """
    global _label_encoder
    if _label_encoder is None:
        model_filename = "label_encoder.pkl"
        model_path = MODELS_DIR / model_filename
        logger.info(f"Loading label encoder from {model_path}")
        try:
            _label_encoder = joblib.load(model_path)
            logger.info("Successfully loaded label encoder")
        except Exception as e:
            logger.error(f"Failed to load label encoder from {model_path}: {e}")
            raise RuntimeError(f"Could not load {model_filename}: {e}") from e
    return _label_encoder


# Backwards compatibility helper functions
def load_model() -> Any:
    """Backwards compatible wrapper for get_classifier()."""
    return get_classifier()


def load_vectorizer() -> Any:
    """Backwards compatible wrapper for get_vectorizer()."""
    return get_vectorizer()


def load_label_encoder() -> Any:
    """Backwards compatible wrapper for get_label_encoder()."""
    return get_label_encoder()


# Backwards compatibility module attribute accessor
def __getattr__(name: str) -> Any:
    if name == "classifier":
        return get_classifier()
    if name == "vectorizer":
        return get_vectorizer()
    if name == "label_encoder":
        return get_label_encoder()
    raise AttributeError(f"module '{__name__}' has no attribute '{name}'")