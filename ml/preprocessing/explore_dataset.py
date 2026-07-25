from pathlib import Path
import pandas as pd

# Get the project root directory
PROJECT_ROOT = Path(__file__).resolve().parents[2]

# Dataset path
DATASET_PATH = PROJECT_ROOT / "dataset" / "UpdatedResumeDataSet.csv"

# Load dataset
df = pd.read_csv(DATASET_PATH)

# Display first 5 rows
print("\n========== First 5 Rows ==========")
print(df.head())

# Display dataset shape
print("\n========== Dataset Shape ==========")
print(f"Rows    : {df.shape[0]}")
print(f"Columns : {df.shape[1]}")

# Display column names
print("\n========== Column Names ==========")
print(df.columns.tolist())

# Check missing values
print("\n========== Missing Values ==========")
print(df.isnull().sum())

# Display unique categories
print("\n========== Resume Categories ==========")
print(df["Category"].unique())

# Display category counts
print("\n========== Category Distribution ==========")
print(df["Category"].value_counts())