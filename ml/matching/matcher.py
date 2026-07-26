"""
matcher.py

Handles Resume ↔ Job Description matching.
"""

from ml.preprocessing.text_preprocessor import clean_resume
from ml.inference.model_loader import get_vectorizer
from ml.matching.similarity import calculate_similarity


def calculate_match_score(resume_text: str, job_description: str):
    """
    Calculate Resume ↔ JD Match Score.

    Args:
        resume_text (str)
        job_description (str)

    Returns:
        float
    """
    vectorizer = get_vectorizer()

    # Clean both texts
    cleaned_resume = clean_resume(resume_text)
    cleaned_jd = clean_resume(job_description)

    # Convert to TF-IDF vectors
    resume_vector = vectorizer.transform([cleaned_resume])
    jd_vector = vectorizer.transform([cleaned_jd])

    # Calculate similarity
    score = calculate_similarity(
        resume_vector,
        jd_vector
    )

    return score