"""
Reusable prediction functions for HireSmart AI.
"""

from ml.inference.model_loader import (
    get_classifier,
    get_vectorizer,
    get_label_encoder,
)

from ml.inference.resume_parser import extract_text_from_pdf
from ml.preprocessing.text_preprocessor import clean_resume


def predict_resume_category(pdf_path: str) -> str:
    """
    Predict the resume category from a PDF.
    """
    # Obtain lazy-loaded ML artifacts
    vectorizer = get_vectorizer()
    classifier = get_classifier()
    label_encoder = get_label_encoder()

    # Extract text
    resume_text = extract_text_from_pdf(pdf_path)

    # Clean text
    cleaned_resume = clean_resume(resume_text)

    # Convert to TF-IDF
    vector = vectorizer.transform([cleaned_resume])

    # Predict
    prediction = classifier.predict(vector)

    # Decode prediction
    category = label_encoder.inverse_transform(prediction)

    return category[0]