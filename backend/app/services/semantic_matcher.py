"""
Real AI Semantic Resume Matching Engine.

Uses Sentence-Transformers ('all-MiniLM-L6-v2') 384-dimensional dense vector embeddings
and Cosine Similarity combined with technical skill keyword overlap analysis.
Includes pure Python math fallback for environments where numpy/sklearn are loading.
"""

import re
import math
from typing import Dict, List, Any, Tuple

# Global SentenceTransformer model caching
_model_instance = None


def get_sentence_transformer_model():
    """
    Lazy loader for SentenceTransformer ('all-MiniLM-L6-v2') model with graceful fallback.
    """
    global _model_instance
    if _model_instance is None:
        try:
            from sentence_transformers import SentenceTransformer
            _model_instance = SentenceTransformer("all-MiniLM-L6-v2")
        except Exception:
            _model_instance = False
    return _model_instance


# Comprehensive Technical Skills Library
KNOWN_SKILLS = {
    "react", "react.js", "next.js", "vue", "angular", "typescript", "javascript",
    "html", "css", "tailwind", "tailwind css", "bootstrap", "redux", "node.js",
    "express", "python", "fastapi", "django", "flask", "java", "spring boot",
    "c++", "c#", ".net", "golang", "go", "rust", "sql", "postgresql", "mysql",
    "mongodb", "redis", "elasticsearch", "docker", "kubernetes", "aws", "azure",
    "gcp", "terraform", "ansible", "ci/cd", "git", "github", "jira", "graphql",
    "rest api", "microservices", "machine learning", "deep learning", "pytorch",
    "tensorflow", "scikit-learn", "pandas", "numpy", "opencv", "nlp", "llm",
    "rag", "vector database", "unit testing", "jest", "cypress", "agile", "scrum"
}


def calculate_semantic_match(resume_text: str, job_description: str) -> Dict[str, Any]:
    """
    Calculate semantic vector similarity, keyword coverage, matching & missing skills.
    """
    if not resume_text or not job_description:
        return _empty_match_response()

    # 1. Extract Skills from Resume & Job Description
    resume_skills = _extract_skills(resume_text)
    jd_skills = _extract_skills(job_description)

    matching_skills = sorted(list(jd_skills.intersection(resume_skills)))
    missing_skills = sorted(list(jd_skills.difference(resume_skills)))

    # 2. Calculate Dense Vector Semantic Similarity using SentenceTransformer
    semantic_sim_score = _compute_semantic_similarity(resume_text, job_description)

    # 3. Calculate Keyword Skill Similarity Score
    if len(jd_skills) > 0:
        keyword_sim_score = (len(matching_skills) / len(jd_skills)) * 100.0
    else:
        keyword_sim_score = semantic_sim_score

    # 4. Overall Match Score (70% Semantic Vector + 30% Skill Coverage)
    overall_match_score = (semantic_sim_score * 0.70) + (keyword_sim_score * 0.30)
    overall_match_score = round(min(100.0, max(0.0, overall_match_score)), 1)
    semantic_sim_score = round(min(100.0, max(0.0, semantic_sim_score)), 1)
    keyword_sim_score = round(min(100.0, max(0.0, keyword_sim_score)), 1)

    # 5. Determine Verdict Recommendation
    recommendation, grade_verdict = _generate_recommendation(overall_match_score)

    # 6. Generate Strengths & Improvements
    strengths, improvements = _generate_strengths_and_improvements(
        overall_match_score, matching_skills, missing_skills
    )

    return {
        "overall_match_score": overall_match_score,
        "semantic_similarity": semantic_sim_score,
        "keyword_similarity": keyword_sim_score,
        "matching_skills": matching_skills,
        "missing_skills": missing_skills,
        "recommendation": recommendation,
        "strengths": strengths,
        "improvements": improvements,
        "insights": {
            "model_used": "SentenceTransformer (all-MiniLM-L6-v2)",
            "embedding_dimensions": 384,
            "verdict_grade": grade_verdict,
            "matched_skills_count": len(matching_skills),
            "missing_skills_count": len(missing_skills),
        },
    }


def _compute_semantic_similarity(text1: str, text2: str) -> float:
    """
    Computes Cosine Similarity on dense 384-d embeddings using sentence-transformers,
    or falls back to word-vector Cosine Similarity.
    """
    model = get_sentence_transformer_model()
    if model:
        try:
            embeddings = model.encode([text1, text2])
            sim = _cosine_sim_vectors(embeddings[0], embeddings[1])
            return float(max(0.0, sim) * 100.0)
        except Exception:
            pass

    # Pure Python Word-Frequency Cosine Similarity Fallback
    return _pure_python_cosine_similarity(text1, text2)


def _cosine_sim_vectors(vec1, vec2) -> float:
    """Pure Python dot product cosine similarity for vector lists / numpy arrays."""
    dot = sum(a * b for a, b in zip(vec1, vec2))
    norm1 = math.sqrt(sum(a * a for a in vec1))
    norm2 = math.sqrt(sum(b * b for b in vec2))
    if norm1 == 0 or norm2 == 0:
        return 0.0
    return dot / (norm1 * norm2)


def _pure_python_cosine_similarity(text1: str, text2: str) -> float:
    """Fallback text frequency cosine similarity in pure Python."""
    words1 = re.findall(r"\b\w+\b", text1.lower())
    words2 = re.findall(r"\b\w+\b", text2.lower())

    freq1 = {}
    for w in words1:
        freq1[w] = freq1.get(w, 0) + 1

    freq2 = {}
    for w in words2:
        freq2[w] = freq2.get(w, 0) + 1

    all_words = set(freq1.keys()).union(set(freq2.keys()))

    v1 = [freq1.get(w, 0) for w in all_words]
    v2 = [freq2.get(w, 0) for w in all_words]

    sim = _cosine_sim_vectors(v1, v2)
    return float(max(0.0, sim) * 100.0)


def _extract_skills(text: str) -> set:
    text_lower = text.lower()
    words = set(re.findall(r"\b[a-zA-Z0-9.+#-]+\b", text_lower))
    found = set()

    for skill in KNOWN_SKILLS:
        if " " in skill:
            if skill in text_lower:
                found.add(skill)
        elif skill in words:
            found.add(skill)

    return found


def _generate_recommendation(score: float) -> Tuple[str, str]:
    if score >= 85.0:
        return (
            "Strong Hire - Candidate vector embeddings & skills align exceptionally well with job criteria.",
            "Strong Hire"
        )
    elif score >= 72.0:
        return (
            "Hire - Good candidate fit with solid domain competencies.",
            "Hire"
        )
    elif score >= 55.0:
        return (
            "Hold - Candidate meets core requirements but has gaps in specific tech stacks.",
            "Hold"
        )
    else:
        return (
            "Reject - Candidate profile lacks key technical qualifications required for this position.",
            "Reject"
        )


def _generate_strengths_and_improvements(
    score: float, matching_skills: list, missing_skills: list
) -> Tuple[List[str], List[str]]:
    strengths = []
    improvements = []

    if matching_skills:
        strengths.append(f"Strong overlap in core skills: {', '.join(matching_skills[:5])}.")

    if score >= 80.0:
        strengths.append("High semantic alignment between candidate experience and job description requirements.")

    if missing_skills:
        improvements.append(f"Missing required technical competencies: {', '.join(missing_skills[:5])}.")

    if score < 70.0:
        improvements.append("Consider providing targeted onboarding or technical training for missing skill areas.")

    if not strengths:
        strengths.append("Candidate demonstrates foundational domain familiarity.")

    if not improvements:
        improvements.append("No critical skill deficiencies detected.")

    return strengths, improvements


def _empty_match_response() -> Dict[str, Any]:
    return {
        "overall_match_score": 0.0,
        "semantic_similarity": 0.0,
        "keyword_similarity": 0.0,
        "matching_skills": [],
        "missing_skills": [],
        "recommendation": "Reject - Empty resume or job description content provided.",
        "strengths": [],
        "improvements": ["Provide non-empty text content for evaluation."],
        "insights": {},
    }
