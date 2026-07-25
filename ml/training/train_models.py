"""
train_models.py

Train multiple machine learning models for resume classification,
compare their performance, and save the best model.
"""

from pathlib import Path

import joblib
import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split

from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier

from sklearn.metrics import accuracy_score, classification_report


# ---------------------------------------------------
# Paths
# ---------------------------------------------------

PROJECT_ROOT = Path(__file__).resolve().parents[2]

DATASET_PATH = PROJECT_ROOT / "dataset" / "cleaned_resume_dataset.csv"

MODELS_DIR = PROJECT_ROOT / "models"
MODELS_DIR.mkdir(exist_ok=True)


# ---------------------------------------------------
# Load Dataset
# ---------------------------------------------------

df = pd.read_csv(DATASET_PATH)

print("=" * 60)
print("Dataset Loaded Successfully")
print("=" * 60)

print(df.head())


# ---------------------------------------------------
# Features and Labels
# ---------------------------------------------------

X = df["Cleaned_Resume"]

y = df["Category"]


# ---------------------------------------------------
# Label Encoding
# ---------------------------------------------------

label_encoder = LabelEncoder()

y_encoded = label_encoder.fit_transform(y)

print("\nTotal Categories :", len(label_encoder.classes_))


# ---------------------------------------------------
# TF-IDF
# ---------------------------------------------------

vectorizer = TfidfVectorizer(max_features=5000)

X_vectorized = vectorizer.fit_transform(X)

print("\nTF-IDF Shape :", X_vectorized.shape)


# ---------------------------------------------------
# Train Test Split
# ---------------------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y_encoded,
    test_size=0.20,
    random_state=42,
    stratify=y_encoded,
)

print("\nTraining Samples :", X_train.shape[0])
print("Testing Samples :", X_test.shape[0])


# ---------------------------------------------------
# Models
# ---------------------------------------------------

models = {

    "Logistic Regression": LogisticRegression(max_iter=1000),

    "Linear SVM": LinearSVC(),

    "Naive Bayes": MultinomialNB(),

    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ),

}


best_model = None
best_accuracy = 0
best_name = ""


print("\n")
print("=" * 60)
print("TRAINING MODELS")
print("=" * 60)


for name, model in models.items():

    print(f"\nTraining : {name}")

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    print(f"Accuracy : {accuracy:.4f}")

    if accuracy > best_accuracy:

        best_accuracy = accuracy

        best_model = model

        best_name = name


print("\n")
print("=" * 60)
print("BEST MODEL")
print("=" * 60)

print(best_name)

print(f"Accuracy : {best_accuracy:.4f}")


# ---------------------------------------------------
# Save Artifacts
# ---------------------------------------------------

joblib.dump(best_model, MODELS_DIR / "resume_classifier.pkl")

joblib.dump(vectorizer, MODELS_DIR / "tfidf_vectorizer.pkl")

joblib.dump(label_encoder, MODELS_DIR / "label_encoder.pkl")


print("\nSaved Successfully!")

print(MODELS_DIR / "resume_classifier.pkl")

print(MODELS_DIR / "tfidf_vectorizer.pkl")

print(MODELS_DIR / "label_encoder.pkl")


# ---------------------------------------------------
# Classification Report
# ---------------------------------------------------

print("\n")
print("=" * 60)
print("CLASSIFICATION REPORT")
print("=" * 60)

predictions = best_model.predict(X_test)

print(classification_report(
    y_test,
    predictions,
    target_names=label_encoder.classes_
))