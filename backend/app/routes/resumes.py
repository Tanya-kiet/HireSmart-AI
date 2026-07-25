"""
Resumes Cloudinary Upload & Management API Router for HireSmart AI.
"""

import shutil
from typing import List, Optional
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from backend.app.config.settings import UPLOADS_DIR
from backend.app.db.session import get_db
from backend.app.schemas.resume import ResumeResponse, ResumeCreate
from backend.app.repositories.resume_repository import resume_repository
from backend.app.services.cloudinary_service import upload_resume_pdf, delete_resume_pdf
from backend.app.core.security import require_roles
from ml.inference.resume_parser import extract_text_from_pdf

router = APIRouter(
    prefix="/api/v1/resumes",
    tags=["Resume Cloudinary Management"],
)

UPLOADS_DIR.mkdir(exist_ok=True)


@router.post(
    "/upload",
    response_model=ResumeResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR", "Candidate"]))]
)
async def upload_resume(
    file: UploadFile = File(...),
    candidate_id: Optional[int] = Form(None),
    db: Session = Depends(get_db)
):
    """
    Upload a PDF resume to Cloudinary cloud storage, extract text, and save secure URL in PostgreSQL DB.
    """
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")

    temp_path = UPLOADS_DIR / file.filename

    try:
        # Save temp file for parsing
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # 1. Parse text from PDF
        parsed_text = extract_text_from_pdf(str(temp_path))

        # 2. Upload to Cloudinary
        cloud_res = upload_resume_pdf(str(temp_path), file.filename)

        # 3. If replacing an existing resume for candidate, delete old resume from Cloudinary
        if candidate_id:
            old_resumes = db.query(resume_repository.model).filter_by(candidate_id=candidate_id).all()
            for old_r in old_resumes:
                if old_r.cloudinary_public_id:
                    delete_resume_pdf(old_r.cloudinary_public_id)
                db.delete(old_r)
            db.commit()

        # 4. Save new Resume in DB with secure Cloudinary HTTPS URL
        resume_in = ResumeCreate(
            filename=file.filename,
            file_path=cloud_res["secure_url"],
            cloudinary_public_id=cloud_res.get("public_id"),
            file_size=cloud_res.get("file_size", 0),
            parsed_text=parsed_text,
            candidate_id=candidate_id
        )

        db_resume = resume_repository.create(db, obj_in=resume_in)
        return db_resume

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        if temp_path.exists():
            temp_path.unlink()


@router.get(
    "/",
    response_model=List[ResumeResponse],
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def read_resumes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all uploaded resume records.
    """
    return resume_repository.get_multi(db, skip=skip, limit=limit)


@router.get(
    "/{resume_id}",
    response_model=ResumeResponse,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR", "Candidate"]))]
)
def read_resume(resume_id: int, db: Session = Depends(get_db)):
    """
    Get resume details and Cloudinary secure URL by ID.
    """
    resume = resume_repository.get(db, id=resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume record not found.")
    return resume


@router.delete(
    "/{resume_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_roles(["Admin", "Recruiter"]))]
)
def delete_resume(resume_id: int, db: Session = Depends(get_db)):
    """
    Delete a resume from database AND delete old file from Cloudinary cloud storage.
    """
    resume = resume_repository.get(db, id=resume_id)
    if not resume:
        raise HTTPException(status_code=404, detail="Resume record not found.")

    # Delete from Cloudinary cloud storage
    if resume.cloudinary_public_id:
        delete_resume_pdf(resume.cloudinary_public_id)

    # Delete from database
    resume_repository.remove(db, id=resume_id)
    return {"message": "Resume record and Cloudinary file deleted successfully", "id": resume_id}
