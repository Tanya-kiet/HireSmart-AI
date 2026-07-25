from ml.inference.resume_parser import extract_text_from_pdf
from ml.matching.matcher import calculate_match_score


def match_resume_with_jd(pdf_path: str, job_description: str):
    """
    Extract resume text and calculate Resume-JD match score.
    """

    resume_text = extract_text_from_pdf(pdf_path)

    score = calculate_match_score(
        resume_text,
        job_description
    )

    return score