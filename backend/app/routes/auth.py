"""
Authentication API Router for HireSmart AI.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from backend.app.db.session import get_db
from backend.app.schemas.user import UserCreate, UserResponse
from backend.app.schemas.auth import LoginRequest, TokenResponse, RefreshTokenRequest
from backend.app.repositories.user_repository import user_repository
from backend.app.core.security import (
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
    get_current_user,
)

router = APIRouter(
    prefix="/api/v1/auth",
    tags=["Authentication & Security"],
)


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def register_user(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user with a specific Role (Admin, Recruiter, HR, Candidate).
    """
    existing = user_repository.get_by_email(db, email=user_in.email)
    if existing:
        raise HTTPException(
            status_code=400,
            detail="User with this email already exists."
        )

    valid_roles = ["Admin", "Recruiter", "HR", "Candidate"]
    if user_in.role and user_in.role not in valid_roles:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid role. Allowed roles: {valid_roles}"
        )

    user = user_repository.create_user(db, obj_in=user_in)
    return user


@router.post("/login", response_model=TokenResponse)
def login_user(login_in: LoginRequest, db: Session = Depends(get_db)):
    """
    Authenticate credentials and issue JWT Access and Refresh Tokens.
    """
    user = user_repository.get_by_email(db, email=login_in.email)
    if not user or not verify_password(login_in.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User account is deactivated.",
        )

    token_data = {"sub": user.email, "role": user.role}
    access_token = create_access_token(token_data)
    refresh_token = create_refresh_token(token_data)

    return TokenResponse(
        access_token=access_token,
        refresh_token=refresh_token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )


@router.post("/refresh", response_model=TokenResponse)
def refresh_token(payload: RefreshTokenRequest, db: Session = Depends(get_db)):
    """
    Exchange valid refresh token for a new access token.
    """
    token_payload = decode_token(payload.refresh_token)
    if token_payload.get("type") != "refresh":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid refresh token type.",
        )

    email = token_payload.get("sub")
    user = user_repository.get_by_email(db, email=email)
    if not user or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found or inactive.",
        )

    new_token_data = {"sub": user.email, "role": user.role}
    new_access_token = create_access_token(new_token_data)
    new_refresh_token = create_refresh_token(new_token_data)

    return TokenResponse(
        access_token=new_access_token,
        refresh_token=new_refresh_token,
        token_type="bearer",
        user=UserResponse.model_validate(user),
    )


@router.get("/me", response_model=UserResponse)
def get_me(current_user=Depends(get_current_user)):
    """
    Retrieve details of currently authenticated user.
    """
    return current_user
