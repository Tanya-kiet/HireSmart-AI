"""
text_preprocessor.py

This module contains reusable functions for cleaning resume text
before training machine learning models or making predictions.
"""

import re
import string

import nltk
from nltk.corpus import stopwords

# Download stopwords only once
nltk.download("stopwords", quiet=True)

# Create a set of English stopwords for fast lookup
STOP_WORDS = set(stopwords.words("english"))


def clean_resume(text: str) -> str:
    """
    Clean and preprocess resume text.

    Steps:
    1. Convert to lowercase
    2. Remove URLs
    3. Remove email addresses
    4. Remove phone numbers
    5. Remove newline and tab characters
    6. Remove non-ASCII characters
    7. Remove punctuation
    8. Remove digits
    9. Remove extra spaces
    10. Remove stopwords

    Parameters
    ----------
    text : str
        Raw resume text.

    Returns
    -------
    str
        Cleaned resume text.
    """

    # Handle missing values
    if not isinstance(text, str):
        return ""

    # Convert to lowercase
    text = text.lower()

    # Remove URLs
    text = re.sub(r"http\S+|www\S+", " ", text)

    # Remove email addresses
    text = re.sub(r"\S+@\S+", " ", text)

    # Remove phone numbers
    text = re.sub(r"\+?\d[\d\s\-()]{8,}\d", " ", text)

    # Remove newline, tab and carriage return characters
    text = re.sub(r"[\n\r\t]", " ", text)

    # Remove non-ASCII characters (fixes symbols like â¢)
    text = text.encode("ascii", "ignore").decode()

    # Remove punctuation
    text = text.translate(str.maketrans("", "", string.punctuation))

    # Remove digits
    text = re.sub(r"\d+", " ", text)

    # Remove extra whitespace
    text = re.sub(r"\s+", " ", text).strip()

    # Remove stopwords
    words = text.split()

    cleaned_words = [
        word
        for word in words
        if word not in STOP_WORDS
    ]

    return " ".join(cleaned_words)


if __name__ == "__main__":

    sample_resume = """
    John Doe

    Email: john@gmail.com

    Phone: +91-9876543210

    Skills:
    Python, Machine Learning, SQL

    GitHub:
    https://github.com/johndoe

    Experienced Data Scientist with 5 years of experience.
    """

    print("========== ORIGINAL ==========\n")
    print(sample_resume)

    print("\n========== CLEANED ==========\n")
    print(clean_resume(sample_resume))