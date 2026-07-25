"""
Real ATS (Applicant Tracking System) Scoring Engine.

Calculates weighted scores across:
1. Contact Information & Links (15%)
2. Section Completeness (20%)
3. Technical Keyword Coverage (25%)
4. Action Verbs & Impact Density (15%)
5. Experience & Chronology Depth (15%)
6. Formatting & Readability (10%)
"""

import re
from typing import Dict, List, Any, Tuple

# Technical Keyword Library
TECH_KEYWORDS = {
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

# Power Action Verbs
POWER_ACTION_VERBS = {
    "built", "designed", "architected", "developed", "implemented", "scaled",
    "optimized", "managed", "led", "engineered", "delivered", "deployed",
    "automated", "integrated", "launched", "accelerated", "transformed",
    "resolved", "reduced", "increased", "streamlined", "refactored",
    "spearheaded", "orchestrated", "migrated", "configured", "analyzed",
    "established", "mentored", "collaborated", "pioneered", "enhanced"
}

# Standard Resume Sections
REQUIRED_SECTIONS = {
    "Experience": [r"\bexperience\b", r"\bwork history\b", r"\bemployment\b", r"\bpositions held\b"],
    "Education": [r"\beducation\b", r"\bacademic\b", r"\buniversity\b", r"\bcollege\b", r"\bdegree\b"],
    "Skills": [r"\bskills\b", r"\btechnical proficiencies\b", r"\btechnologies\b", r"\btech stack\b"],
    "Projects": [r"\bprojects\b", r"\bkey projects\b", r"\bpersonal projects\b", r"\bopen source\b"],
    "Certifications": [r"\bcertifications\b", r"\bcertificates\b", r"\blicenses\b", r"\bcredentials\b"],
    "Summary": [r"\bsummary\b", r"\bprofile\b", r"\bprofessional summary\b", r"\bobjective\b"]
}


def evaluate_resume_ats(raw_text: str) -> Dict[str, Any]:
    """
    Evaluates raw resume text and computes a realistic ATS score breakdown.
    """
    text_lower = raw_text.lower()
    words = re.findall(r"\b[a-zA-Z0-9.+#-]+\b", text_lower)
    word_set = set(words)

    # 1. Contact Information & Links (15%)
    contact_score, contact_links = _evaluate_contact_info(raw_text)

    # 2. Section Completeness (20%)
    sections_score, missing_sections = _evaluate_sections(text_lower)

    # 3. Technical Keyword Coverage (25%)
    keyword_score, identified_keywords = _evaluate_keywords(word_set, text_lower)

    # 4. Action Verbs & Impact Density (15%)
    action_score, verb_count = _evaluate_action_verbs(word_set)

    # 5. Experience & Education Depth (15%)
    exp_edu_score, exp_score, edu_score = _evaluate_experience_education(text_lower)

    # 6. Formatting & Readability (10%)
    formatting_score = _evaluate_formatting(raw_text, words)

    # Calculate Weighted Overall Score
    overall_ats = (
        (contact_score * 0.15) +
        (sections_score * 0.20) +
        (keyword_score * 0.25) +
        (action_score * 0.15) +
        (exp_edu_score * 0.15) +
        (formatting_score * 0.10)
    )
    overall_ats = round(min(100.0, max(0.0, overall_ats)), 1)

    # Determine Grade
    grade = "A+" if overall_ats >= 90 else "A" if overall_ats >= 80 else "B" if overall_ats >= 70 else "C" if overall_ats >= 60 else "D"

    # Actionable Suggestions Generator
    suggestions = _generate_suggestions(
        contact_links, missing_sections, len(identified_keywords), verb_count, formatting_score
    )

    return {
        "overall_ats_score": overall_ats,
        "grade": grade,
        "section_scores": {
            "contact_info": round(contact_score, 1),
            "sections_presence": round(sections_score, 1),
            "keyword_coverage": round(keyword_score, 1),
            "action_verbs": round(action_score, 1),
            "experience_score": round(exp_score, 1),
            "education_score": round(edu_score, 1),
            "formatting_score": round(formatting_score, 1),
        },
        "contact_links_found": contact_links,
        "missing_sections": missing_sections,
        "identified_keywords": sorted(list(identified_keywords)),
        "action_verbs_count": verb_count,
        "suggestions": suggestions,
    }


def _evaluate_contact_info(text: str) -> Tuple[float, Dict[str, str]]:
    score = 0.0
    links = {
        "email": None,
        "phone": None,
        "linkedin": None,
        "github": None,
        "portfolio": None,
    }

    # Email
    email_match = re.search(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}', text)
    if email_match:
        links["email"] = email_match.group(0)
        score += 30.0

    # Phone
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}', text)
    if phone_match:
        links["phone"] = phone_match.group(0)
        score += 25.0

    # LinkedIn
    linkedin_match = re.search(r'(linkedin\.com/in/[a-zA-Z0-9_-]+)', text, re.IGNORECASE)
    if linkedin_match:
        links["linkedin"] = "https://" + linkedin_match.group(0)
        score += 20.0

    # GitHub
    github_match = re.search(r'(github\.com/[a-zA-Z0-9_-]+)', text, re.IGNORECASE)
    if github_match:
        links["github"] = "https://" + github_match.group(0)
        score += 15.0

    # Portfolio / Website
    portfolio_match = re.search(r'\b[a-zA-Z0-9_-]+\.(dev|io|me)\b', text, re.IGNORECASE)
    if portfolio_match:
        links["portfolio"] = "https://" + portfolio_match.group(0)
        score += 10.0

    return min(100.0, score), links


def _evaluate_sections(text_lower: str) -> Tuple[float, List[str]]:
    found_count = 0
    missing = []

    for section_name, patterns in REQUIRED_SECTIONS.items():
        found = any(re.search(pat, text_lower) for pat in patterns)
        if found:
            found_count += 1
        else:
            missing.append(section_name)

    score = (found_count / len(REQUIRED_SECTIONS)) * 100.0
    return score, missing


def _evaluate_keywords(word_set: set, text_lower: str) -> Tuple[float, set]:
    matched = set()
    for kw in TECH_KEYWORDS:
        if " " in kw:
            if kw in text_lower:
                matched.add(kw)
        elif kw in word_set:
            matched.add(kw)

    # Benchmark: 8+ keywords = 100%
    score = min(100.0, (len(matched) / 8.0) * 100.0)
    return score, matched


def _evaluate_action_verbs(word_set: set) -> Tuple[float, int]:
    matched_verbs = POWER_ACTION_VERBS.intersection(word_set)
    count = len(matched_verbs)
    # Benchmark: 5+ power action verbs = 100%
    score = min(100.0, (count / 5.0) * 100.0)
    return score, count


def _evaluate_experience_education(text_lower: str) -> Tuple[float, float, float]:
    exp_score = 70.0
    edu_score = 70.0

    # Check years of experience mentioned (e.g. 5 years, 3+ yrs)
    exp_matches = re.findall(r'(\d+)\+?\s*(years?|yrs?)', text_lower)
    if exp_matches:
        years = max([int(m[0]) for m in exp_matches if int(m[0]) < 40], default=3)
        exp_score = min(100.0, 60.0 + (years * 6.0))

    # Check degree titles
    degrees = ["b.s", "b.tech", "bachelor", "m.s", "master", "ph.d", "computer science", "engineering"]
    if any(deg in text_lower for deg in degrees):
        edu_score = 95.0

    overall = (exp_score * 0.6) + (edu_score * 0.4)
    return overall, exp_score, edu_score


def _evaluate_formatting(text: str, words: list) -> float:
    score = 80.0

    # Word count length check (Ideal 300 to 1200 words)
    w_count = len(words)
    if 300 <= w_count <= 1200:
        score += 15.0
    elif w_count < 150:
        score -= 20.0

    # Bullet points / formatting cleanliness
    if "•" in text or "-" in text or "*" in text:
        score += 5.0

    return min(100.0, max(40.0, score))


def _generate_suggestions(
    links: dict, missing_sections: list, keyword_count: int, verb_count: int, format_score: float
) -> List[str]:
    suggestions = []

    if missing_sections:
        suggestions.append(f"Add missing standard sections: {', '.join(missing_sections)}.")

    if not links.get("linkedin"):
        suggestions.append("Include your LinkedIn profile URL in contact header to increase recruiter trust score.")

    if not links.get("github") and not links.get("portfolio"):
        suggestions.append("Add a GitHub or portfolio website link to showcase live project work.")

    if keyword_count < 6:
        suggestions.append("Incorporate more industry-standard technical keywords (e.g., React, Python, Docker, CI/CD).")

    if verb_count < 4:
        suggestions.append("Use strong action verbs like 'Architected', 'Optimized', or 'Spearheaded' at the beginning of bullet points.")

    if format_score < 80:
        suggestions.append("Improve formatting with clear bullet points and consistent line spacing for ATS parsers.")

    if not suggestions:
        suggestions.append("Excellent resume structure and keyword density! Ready for top-tier enterprise ATS applications.")

    return suggestions
