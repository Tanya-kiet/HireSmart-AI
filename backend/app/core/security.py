"""
Security & Authentication Core module.

Provides:
- Password hashing & verification
- JWT Access & Refresh Token creation & decoding
- FastAPI Dependencies: get_current_user & require_roles (RBAC)
"""

import hashlib
import json
import base64
import hmac
from datetime import datetime, timedelta
from typing import Optional, List
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from backend.app.config.settings import (
    SECRET_KEY,
    ALGORITHM,
    ACCESS_TOKEN_EXPIRE_MINUTES,
    REFRESH_TOKEN_EXPIRE_DAYS,
)
from backend.app.db.session import get_db
from backend.app.models.user import User

security_bearer = HTTPBearer(auto_error=False)


def get_password_hash(password: str) -> str:
    """
    Generate SHA-256 salted password hash.
    """
    salted = f"{SECRET_KEY}{password}".encode("utf-8")
    return hashlib.sha256(salted).hexdigest()


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify plain password against hashed password.
    """
    return get_password_hash(plain_password) == hashed_password


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Create JWT Access Token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": int(expire.timestamp()), "type": "access"})
    return _encode_jwt(to_encode)


def create_refresh_token(data: dict) -> str:
    """
    Create JWT Refresh Token.
    """
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode.update({"exp": int(expire.timestamp()), "type": "refresh"})
    return _encode_jwt(to_encode)


def decode_token(token: str) -> dict:
    """
    Decode and validate JWT token.
    """
    try:
        # Try python-jose first if installed
        from jose import jwt
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception:
        pass

    # Try pyjwt as secondary
    try:
        import jwt as pyjwt
        payload = pyjwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except Exception:
        pass

    # Pure Python JWT Decoder fallback
    return _decode_jwt_pure_python(token)


def _encode_jwt(payload: dict) -> str:
    """Pure Python JWT HMAC-SHA256 encoder fallback."""
    try:
        from jose import jwt
        return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    except Exception:
        pass

    header = {"alg": "HS256", "typ": "JWT"}
    header_b64 = _b64_encode(json.dumps(header).encode("utf-8"))
    payload_b64 = _b64_encode(json.dumps(payload).encode("utf-8"))

    signature_input = f"{header_b64}.{payload_b64}".encode("utf-8")
    signature = hmac.new(SECRET_KEY.encode("utf-8"), signature_input, hashlib.sha256).digest()
    signature_b64 = _b64_encode(signature)

    return f"{header_b64}.{payload_b64}.{signature_b64}"


def _decode_jwt_pure_python(token: str) -> dict:
    """Pure Python JWT HMAC-SHA256 decoder & validator fallback."""
    try:
        parts = token.split(".")
        if len(parts) != 3:
            raise ValueError()

        header_b64, payload_b64, signature_b64 = parts
        signature_input = f"{header_b64}.{payload_b64}".encode("utf-8")
        expected_sig = hmac.new(SECRET_KEY.encode("utf-8"), signature_input, hashlib.sha256).digest()

        if _b64_encode(expected_sig) != signature_b64:
            raise ValueError("Signature mismatch")

        payload_json = _b64_decode(payload_b64).decode("utf-8")
        payload = json.loads(payload_json)

        exp = payload.get("exp")
        if exp and datetime.utcnow().timestamp() > exp:
            raise HTTPException(status_code=401, detail="Token has expired.")

        return payload
    except HTTPException as he:
        raise he
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or corrupted authentication token.",
            headers={"WWW-Authenticate": "Bearer"},
        )


def _b64_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('utf-8')


def _b64_decode(data: str) -> bytes:
    padding = '=' * (4 - (len(data) % 4))
    return base64.urlsafe_b64decode(data + padding)


def get_current_user(
    auth: Optional[HTTPAuthorizationCredentials] = Depends(security_bearer),
    db: Session = Depends(get_db),
) -> User:
    """
    FastAPI dependency to extract and authenticate current user from Bearer Token.
    """
    if not auth or not auth.credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication token is missing.",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = decode_token(auth.credentials)
    if payload.get("type") != "access":
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token type for API authorization.",
        )

    user_email: str = payload.get("sub")
    if not user_email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token claims.",
        )

    user = db.query(User).filter(User.email == user_email).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account not found.",
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User account is deactivated.",
        )

    return user


def require_roles(allowed_roles: List[str]):
    """
    FastAPI Dependency Factory for Role-Based Access Control (RBAC).
    Supported Roles: 'Admin', 'Recruiter', 'HR', 'Candidate'
    """

    def role_checker(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Access forbidden: Role '{current_user.role}' is not authorized. Required: {allowed_roles}",
            )
        return current_user

    return role_checker
