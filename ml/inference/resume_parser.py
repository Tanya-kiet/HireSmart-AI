"""
resume_parser.py

Extract text from PDF resumes with error handling.
"""

import pdfplumber


def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file.
    """

    try:
        text = ""

        with pdfplumber.open(pdf_path) as pdf:

            for page in pdf.pages:

                page_text = page.extract_text()

                if page_text:
                    text += page_text + "\n"

        return text

    except Exception as e:
        raise RuntimeError(
            f"Unable to read PDF '{pdf_path}'. "
            f"Please ensure it is a valid, non-corrupted PDF.\n"
            f"Original error: {e}"
        )