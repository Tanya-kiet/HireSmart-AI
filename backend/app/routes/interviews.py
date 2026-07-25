from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.schemas.interview import InterviewCreate, InterviewUpdate, InterviewResponse
from backend.app.repositories.interview_repository import interview_repository
from backend.app.core.security import require_roles, get_current_user

router = APIRouter(
    prefix="/api/v1/interviews",
    tags=["Interviews"],
)


@router.get(
    "/",
    response_model=List[InterviewResponse],
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def read_interviews(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Get list of all candidate interview sessions. Required Roles: Admin, Recruiter, HR.
    """
    return interview_repository.get_multi(db, skip=skip, limit=limit)


@router.post(
    "/",
    response_model=InterviewResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def create_interview(interview_in: InterviewCreate, db: Session = Depends(get_db)):
    """
    Schedule a new interview. Required Roles: Admin, Recruiter, HR.
    """
    return interview_repository.create(db, obj_in=interview_in)


@router.get(
    "/{interview_id}",
    response_model=InterviewResponse,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR", "Candidate"]))]
)
def read_interview(interview_id: int, db: Session = Depends(get_db)):
    """
    Get interview session details by ID.
    """
    interview = interview_repository.get(db, id=interview_id)
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found.")
    return interview


@router.put(
    "/{interview_id}",
    response_model=InterviewResponse,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def update_interview(interview_id: int, interview_in: InterviewUpdate, db: Session = Depends(get_db)):
    """
    Update an interview session. Required Roles: Admin, Recruiter, HR.
    """
    interview = interview_repository.get(db, id=interview_id)
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found.")
    return interview_repository.update(db, db_obj=interview, obj_in=interview_in)


@router.delete(
    "/{interview_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_roles(["Admin", "Recruiter"]))]
)
def delete_interview(interview_id: int, db: Session = Depends(get_db)):
    """
    Delete an interview session. Required Roles: Admin, Recruiter.
    """
    interview = interview_repository.get(db, id=interview_id)
    if not interview:
        raise HTTPException(status_code=404, detail="Interview not found.")
    interview_repository.remove(db, id=interview_id)
    return {"message": "Interview session deleted successfully", "id": interview_id}
