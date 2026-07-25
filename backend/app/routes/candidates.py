from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.schemas.candidate import CandidateCreate, CandidateUpdate, CandidateResponse
from backend.app.repositories.candidate_repository import candidate_repository
from backend.app.core.security import require_roles, get_current_user

router = APIRouter(
    prefix="/api/v1/candidates",
    tags=["Candidates"],
)


@router.get(
    "/",
    response_model=List[CandidateResponse],
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def read_candidates(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    """
    Retrieve all candidates with pagination. Required Roles: Admin, Recruiter, HR.
    """
    return candidate_repository.get_multi(db, skip=skip, limit=limit)


@router.post(
    "/",
    response_model=CandidateResponse,
    status_code=status.HTTP_201_CREATED,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def create_candidate(candidate_in: CandidateCreate, db: Session = Depends(get_db)):
    """
    Create a new candidate profile. Required Roles: Admin, Recruiter, HR.
    """
    existing = candidate_repository.get_by_email(db, email=candidate_in.email)
    if existing:
        raise HTTPException(
            status_code=400,
            detail="Candidate with this email already exists."
        )
    return candidate_repository.create(db, obj_in=candidate_in)


@router.get(
    "/{candidate_id}",
    response_model=CandidateResponse,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR", "Candidate"]))]
)
def read_candidate(candidate_id: int, db: Session = Depends(get_db)):
    """
    Get candidate profile by ID.
    """
    candidate = candidate_repository.get(db, id=candidate_id)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found.")
    return candidate


@router.put(
    "/{candidate_id}",
    response_model=CandidateResponse,
    dependencies=[Depends(require_roles(["Admin", "Recruiter", "HR"]))]
)
def update_candidate(candidate_id: int, candidate_in: CandidateUpdate, db: Session = Depends(get_db)):
    """
    Update a candidate profile. Required Roles: Admin, Recruiter, HR.
    """
    candidate = candidate_repository.get(db, id=candidate_id)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found.")
    return candidate_repository.update(db, db_obj=candidate, obj_in=candidate_in)


@router.delete(
    "/{candidate_id}",
    status_code=status.HTTP_200_OK,
    dependencies=[Depends(require_roles(["Admin"]))]
)
def delete_candidate(candidate_id: int, db: Session = Depends(get_db)):
    """
    Delete a candidate profile. Required Role: Admin.
    """
    candidate = candidate_repository.get(db, id=candidate_id)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found.")
    candidate_repository.remove(db, id=candidate_id)
    return {"message": "Candidate deleted successfully", "id": candidate_id}
