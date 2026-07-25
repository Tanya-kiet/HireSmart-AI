from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.schemas.job import JobDescriptionCreate, JobDescriptionUpdate, JobDescriptionResponse
from backend.app.repositories.job_repository import job_repository
from backend.app.core.security import require_roles, get_current_user

router = APIRouter(
    prefix="/api/v1/jobs",
    tags=["Job Descriptions"],
)


@router.get(
    "/",
    response_model=List[JobDescriptionResponse],
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR", "Candidate"]))]
)
def read_jobs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get list of all job descriptions.
    """
    return job_repository.get_multi(db, skip=skip, limit=limit)


@router.post(
    "/",
    response_model=JobDescriptionResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def create_job(job_in: JobDescriptionCreate, db: Session = Depends(get_db)):
    """
    Create a new job description. Required Roles: Admin, Recruiter, HR.
    """
    return job_repository.create(db, obj_in=job_in)


@router.get(
    "/{job_id}",
    response_model=JobDescriptionResponse,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR", "Candidate"]))]
)
def read_job(job_id: int, db: Session = Depends(get_db)):
    """
    Get job description details by ID.
    """
    job = job_repository.get(db, id=job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job description not found.")
    return job


@router.put(
    "/{job_id}",
    response_model=JobDescriptionResponse,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def update_job(job_id: int, job_in: JobDescriptionUpdate, db: Session = Depends(get_db)):
    """
    Update a job description. Required Roles: Admin, Recruiter, HR.
    """
    job = job_repository.get(db, id=job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job description not found.")
    return job_repository.update(db, db_obj=job, obj_in=job_in)


@router.delete(
    "/{job_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_roles(["Admin", "Recruiter"]))]
)
def delete_job(job_id: int, db: Session = Depends(get_db)):
    """
    Delete a job description. Required Roles: Admin, Recruiter.
    """
    job = job_repository.get(db, id=job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job description not found.")
    job_repository.remove(db, id=job_id)
    return {"message": "Job description deleted successfully", "id": job_id}
