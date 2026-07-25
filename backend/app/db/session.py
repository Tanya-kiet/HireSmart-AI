from typing import Generator
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from backend.app.config.settings import DATABASE_URL, SQLITE_FALLBACK_URL

# Import base models registry
import backend.app.db.base

# Create engine with connect_args for SQLite fallback if used
engine_args = {}
if "sqlite" in DATABASE_URL:
    engine_args["check_same_thread"] = False

try:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True, **engine_args)
    # Test connection
    with engine.connect() as conn:
        pass
except Exception:
    # Fallback to local dev SQLite database if PostgreSQL server is not locally running
    engine = create_engine(SQLITE_FALLBACK_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db() -> Generator[Session, None, None]:
    """
    FastAPI Dependency to obtain database session context.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
