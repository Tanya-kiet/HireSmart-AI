"""
Health check endpoints.
"""

from fastapi import APIRouter

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("/")
def health_check():
    return {
        "status": "healthy",
        "service": "HireSmart AI",
        "version": "1.0.0",
    }