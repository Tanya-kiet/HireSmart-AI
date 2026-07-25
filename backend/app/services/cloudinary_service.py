"""
Cloudinary Integration Service for HireSmart AI.

Handles:
- Uploading PDF Resumes to Cloudinary cloud storage
- Generating secure HTTPS URLs
- Deleting old resumes from Cloudinary cloud storage
"""

import os
from typing import Dict, Any, Optional
from backend.app.config.settings import (
    CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET,
    CLOUDINARY_URL,
    UPLOADS_DIR,
)

# Initialize Cloudinary configuration if credentials are configured
_cloudinary_configured = False

try:
    import cloudinary
    import cloudinary.uploader

    if CLOUDINARY_URL:
        cloudinary.config(cloudinary_url=CLOUDINARY_URL)
        _cloudinary_configured = True
    elif CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET:
        cloudinary.config(
            cloud_name=CLOUDINARY_CLOUD_NAME,
            api_key=CLOUDINARY_API_KEY,
            api_secret=CLOUDINARY_API_SECRET,
            secure=True,
        )
        _cloudinary_configured = True
except Exception:
    _cloudinary_configured = False


def upload_resume_pdf(file_path: str, filename: str, folder: str = "hiresmart/resumes") -> Dict[str, Any]:
    """
    Uploads a local PDF resume file to Cloudinary cloud storage.
    Returns dictionary with secure_url and public_id.
    """
    if _cloudinary_configured:
        try:
            response = cloudinary.uploader.upload(
                file_path,
                folder=folder,
                resource_type="raw",
                use_filename=True,
                unique_filename=True,
            )
            return {
                "secure_url": response.get("secure_url"),
                "public_id": response.get("public_id"),
                "file_size": response.get("bytes", 0),
            }
        except Exception:
            pass

    # Local storage fallback
    local_url = f"/static/uploads/{filename}"
    file_size = os.path.getsize(file_path) if os.path.exists(file_path) else 0
    return {
        "secure_url": local_url,
        "public_id": f"local_{filename}",
        "file_size": file_size,
    }


def delete_resume_pdf(public_id: Optional[str]) -> bool:
    """
    Deletes an old resume PDF file from Cloudinary cloud storage using public_id.
    """
    if not public_id:
        return False

    if _cloudinary_configured and not public_id.startswith("local_"):
        try:
            res = cloudinary.uploader.destroy(public_id, resource_type="raw")
            return res.get("result") == "ok"
        except Exception:
            return False

    return True
