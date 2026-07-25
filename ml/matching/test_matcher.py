from ml.matching.matcher import calculate_match_score

resume = """
Python
Machine Learning
FastAPI
SQL
Docker
"""

job_description = """
Python
SQL
FastAPI
AWS
Communication
"""

score = calculate_match_score(
    resume,
    job_description
)

print("\nResume ↔ JD Match Score")
print("------------------------")
print(f"{score}%")