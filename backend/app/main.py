"""
Main entry point for HireSmart AI FastAPI Backend Engine.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.app.config.settings import API_TITLE, API_VERSION, API_DESCRIPTION
from backend.app.db.base import Base
from backend.app.db.session import engine

# Import Routers
from backend.app.routes.health import router as health_router
from backend.app.routes.auth import router as auth_router
from backend.app.routes.prediction import router as prediction_router
from backend.app.routes.matching import router as matching_router
from backend.app.routes.candidates import router as candidates_router
from backend.app.routes.jobs import router as jobs_router
from backend.app.routes.interviews import router as interviews_router
from backend.app.routes.gemini import router as gemini_router
from backend.app.routes.ranking import router as ranking_router
from backend.app.routes.resumes import router as resumes_router
from backend.app.routes.analytics import router as analytics_router

# Initialize ORM tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=API_TITLE,
    description=API_DESCRIPTION,
    version=API_VERSION,
)

# Enable CORS for Frontend Development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers
app.include_router(health_router)
app.include_router(auth_router)
app.include_router(prediction_router)
app.include_router(matching_router)
app.include_router(candidates_router)
app.include_router(jobs_router)
app.include_router(interviews_router)
app.include_router(gemini_router)
app.include_router(ranking_router)
app.include_router(resumes_router)
app.include_router(analytics_router)


@app.get("/")
def root():
    return {
        "app": API_TITLE,
        "version": API_VERSION,
        "status": "running 🚀",
        "docs_url": "/docs",
    }