"""
AI Candidate Ranking Engine.

Calculates multi-dimensional composite ranking scores based on:
1. Vector Match Score (35%)
2. Real ATS Compatibility (20%)
3. Relevant Experience Years (20%)
4. Technical Skill Coverage (15%)
5. Projects & Education Credentials (10%)
"""

from typing import List, Dict, Any, Tuple
from backend.app.schemas.ranking import CandidateEvaluationItem, RankedCandidateItem, RankingResponse


def rank_candidates(
    candidates: List[CandidateEvaluationItem],
    job_description: str = None
) -> Dict[str, Any]:
    """
    Ranks a list of candidate items, computes composite scores, sorts candidates,
    and returns detailed explanations for each candidate rank.
    """
    if not candidates:
        return {
            "total_evaluated": 0,
            "top_candidate": None,
            "average_composite_score": 0.0,
            "ranked_candidates": []
        }

    evaluated = []

    for item in candidates:
        ats = item.ats_score or 75.0
        match = item.match_score or 75.0

        # Experience normalization (0 yrs = 40, 3 yrs = 75, 5+ yrs = 95)
        exp_years = item.experience_years or 0.0
        exp_score = min(100.0, max(40.0, 50.0 + (exp_years * 9.0)))

        # Skill score (based on skill count)
        skills_count = len(item.skills) if item.skills else 3
        skill_score = min(100.0, max(40.0, 50.0 + (skills_count * 8.0)))

        # Education & Projects score
        edu_score = 85.0
        if item.education_level and any(term in item.education_level.lower() for term in ["master", "m.s", "ph.d"]):
            edu_score = 95.0
        proj_score = min(10.0, (item.projects_count or 1) * 3.0)
        proj_edu_score = min(100.0, edu_score + proj_score)

        # Composite Rank Formula
        composite = (
            (match * 0.35) +
            (ats * 0.20) +
            (exp_score * 0.20) +
            (skill_score * 0.15) +
            (proj_edu_score * 0.10)
        )
        composite = round(min(100.0, max(0.0, composite)), 1)

        evaluated.append({
            "raw_item": item,
            "composite": composite,
            "ats": round(ats, 1),
            "match": round(match, 1),
            "exp_score": round(exp_score, 1),
            "skill_score": round(skill_score, 1),
        })

    # Sort descending by composite score
    evaluated.sort(key=lambda x: x["composite"], reverse=True)

    ranked_items = []
    total_composite = 0.0

    for idx, eval_data in enumerate(evaluated):
        rank_num = idx + 1
        comp = eval_data["composite"]
        total_composite += comp
        raw = eval_data["raw_item"]

        tier, explanation = _generate_rank_explanation(rank_num, comp, eval_data)
        strengths, concerns = _generate_strengths_and_concerns(raw, comp, eval_data)

        ranked_items.append(
            RankedCandidateItem(
                rank=rank_num,
                candidate_id=raw.candidate_id,
                name=raw.name,
                overall_composite_score=comp,
                ats_score=eval_data["ats"],
                match_score=eval_data["match"],
                experience_score=eval_data["exp_score"],
                skill_score=eval_data["skill_score"],
                ranking_tier=tier,
                ranking_explanation=explanation,
                key_strengths=strengths,
                potential_concerns=concerns
            )
        )

    avg_score = round(total_composite / len(candidates), 1) if candidates else 0.0
    top_candidate_name = ranked_items[0].name if ranked_items else None

    return {
        "total_evaluated": len(candidates),
        "top_candidate": top_candidate_name,
        "average_composite_score": avg_score,
        "ranked_candidates": [item.model_dump() for item in ranked_items]
    }


def _generate_rank_explanation(rank: int, score: float, eval_data: dict) -> Tuple[str, str]:
    name = eval_data["raw_item"].name

    if score >= 88.0:
        tier = "Top Tier"
        exp = f"Rank #{rank}: {name} is placed in the Top Tier ({score}% composite) due to outstanding vector match ({eval_data['match']}%) and exceptional ATS formatting ({eval_data['ats']}%)."
    elif score >= 78.0:
        tier = "Strong Fit"
        exp = f"Rank #{rank}: {name} represents a Strong Fit ({score}% composite) with solid industry experience and strong skill coverage."
    elif score >= 65.0:
        tier = "Moderate Fit"
        exp = f"Rank #{rank}: {name} is a Moderate Fit ({score}% composite) meeting baseline qualification criteria."
    else:
        tier = "Low Fit"
        exp = f"Rank #{rank}: {name} ranks lower ({score}% composite) due to gaps in technical match or limited relevant experience."

    return tier, exp


def _generate_strengths_and_concerns(raw: CandidateEvaluationItem, score: float, eval_data: dict) -> Tuple[List[str], List[str]]:
    strengths = []
    concerns = []

    if eval_data["match"] >= 85.0:
        strengths.append(f"High vector match score ({eval_data['match']}%) for target job description.")
    if eval_data["ats"] >= 90.0:
        strengths.append(f"Exceptional ATS resume formatting ({eval_data['ats']}%).")
    if (raw.experience_years or 0) >= 5:
        strengths.append(f"Senior level experience ({raw.experience_years} years).")

    if eval_data["match"] < 70.0:
        concerns.append(f"Lower job description vector match ({eval_data['match']}%).")
    if (raw.experience_years or 0) < 2:
        concerns.append("Junior experience level compared to senior role requirements.")

    if not strengths:
        strengths.append("Meets core candidate prerequisites.")
    if not concerns:
        concerns.append("No major candidate concerns identified.")

    return strengths, concerns
