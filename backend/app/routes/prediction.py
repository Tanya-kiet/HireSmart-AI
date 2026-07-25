"""
Prediction & ATS Resume Evaluation API routes for HireSmart AI.
"""

import shutil
from fastapi import APIRouter, File, HTTPException, UploadFile
from pydantic import BaseModel

from backend.app.config.settings import UPLOADS_DIR
from backend.app.schemas.common import APIResponse
from backend.app.schemas.ats import ATSEvaluationResponse
from backend.app.services.prediction_service import predict_category
from backend.app.services.ats_engine import evaluate_resume_ats
from ml.inference.resume_parser import extract_text_from_pdf

router = APIRouter(
    prefix="/predict",
    tags=["Prediction & ATS Evaluation"],
)

# Ensure uploads directory exists
UPLOADS_DIR.mkdir(exist_ok=True)


class TextEvaluationRequest(BaseModel):
    resume_text: str


@router.post("/resume", response_model=APIResponse)
async def predict_resume(file: UploadFile = File(...)):
    """
    Upload a PDF resume, predict job category, and compute real ATS score.
    """
    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = UPLOADS_DIR / file.filename

    try:
        # Save uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 1. ML Category Prediction
        category = predict_category(str(file_path))

        # 2. Extract Text & Real ATS Scoring
        raw_text = extract_text_from_pdf(str(file_path))
        ats_result = evaluate_resume_ats(raw_text)

        # Response payload
        return APIResponse(
            success=True,
            message="Resume classified & evaluated successfully.",
            data={
                "predicted_category": category,
                "filename": file.filename,
                "ats_evaluation": ats_result
            },
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e),
        )

    finally:
        # Cleanup file
        if file_path.exists():
            file_path.unlink()


@router.post("/evaluate-ats", response_model=ATSEvaluationResponse)
async def evaluate_ats_from_text(payload: TextEvaluationRequest):
    """
    Directly evaluate raw resume text against the ATS scoring engine.
    """
    if not payload.resume_text.trim() if hasattr(payload.resume_text, "trim") else not payload.resume_text.strip():
        raise HTTPException(status_code=400, detail="Resume text cannot be empty.")

    ats_result = evaluate_resume_ats(payload.resume_text)
    return ats_result