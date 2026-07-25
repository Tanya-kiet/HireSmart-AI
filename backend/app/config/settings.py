import os
from pathlib import Path

# Project Root
PROJECT_ROOT = Path(__file__).resolve().parents[3]

# Directories
MODELS_DIR = PROJECT_ROOT / "models"
UPLOADS_DIR = PROJECT_ROOT / "uploads"
DATASET_DIR = PROJECT_ROOT / "dataset"

# API Information
API_TITLE = "HireSmart AI API"
API_VERSION = "1.0.0"
API_DESCRIPTION = "AI-powered Resume Screening and Job Matching Platform"

# Google Gemini API Key
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", os.getenv("GOOGLE_API_KEY", ""))

# JWT Security Configuration
SECRET_KEY = os.getenv("SECRET_KEY", "hiresmart_ai_jwt_secret_key_super_secure_production_2026")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
REFRESH_TOKEN_EXPIRE_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", "7"))

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME", "")
CLOUDINARY_API_KEY = os.getenv("CLOUDINARY_API_KEY", "")
CLOUDINARY_API_SECRET = os.getenv("CLOUDINARY_API_SECRET", "")
CLOUDINARY_URL = os.getenv("CLOUDINARY_URL", "")

# Database Configuration (PostgreSQL with SQLite fallback)
POSTGRES_USER = os.getenv("POSTGRES_USER", "postgres")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD", "postgres")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")
POSTGRES_DB = os.getenv("POSTGRES_DB", "hiresmart_db")

DEFAULT_DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
SQLITE_FALLBACK_URL = f"sqlite:///{PROJECT_ROOT}/hiresmart_dev.db"

DATABASE_URL = os.getenv("DATABASE_URL", DEFAULT_DATABASE_URL)