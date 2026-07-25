"""
similarity.py

Calculates Resume ↔ Job Description similarity
using TF-IDF and Cosine Similarity.
"""

from sklearn.metrics.pairwise import cosine_similarity


def calculate_similarity(resume_vector, jd_vector):
    """
    Calculate cosine similarity between
    resume and job description vectors.

    Returns:
        float: similarity percentage (0–100)
    """

    similarity = cosine_similarity(
        resume_vector,
        jd_vector
    )[0][0]

    return round(similarity * 100, 2)