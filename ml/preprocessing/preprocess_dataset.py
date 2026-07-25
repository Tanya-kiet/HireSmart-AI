"""
preprocess_dataset.py

Load the resume dataset, clean all resumes,
and save a cleaned version for model training.
"""

from pathlib import Path
import pandas as pd

from text_preprocessor import clean_resume

# Project root
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Dataset paths
INPUT_DATASET = PROJECT_ROOT / "dataset" / "UpdatedResumeDataSet.csv"
OUTPUT_DATASET = PROJECT_ROOT / "dataset" / "cleaned_resume_dataset.csv"

# Load dataset
df = pd.read_csv(INPUT_DATASET)

print("Dataset Loaded Successfully!")
print(f"Total Resumes: {len(df)}")

# Clean resume text
print("\nCleaning resumes...")

df["Cleaned_Resume"] = df["Resume"].apply(clean_resume)

print("Cleaning completed!")

# Save cleaned dataset
df.to_csv(OUTPUT_DATASET, index=False)

print(f"\nCleaned dataset saved at:\n{OUTPUT_DATASET}")

# Display sample comparison
print("\n========== SAMPLE COMPARISON ==========\n")

print("ORIGINAL:\n")
print(df.loc[0, "Resume"][:500])

print("\n-----------------------------\n")

print("CLEANED:\n")
print(df.loc[0, "Cleaned_Resume"][:500])