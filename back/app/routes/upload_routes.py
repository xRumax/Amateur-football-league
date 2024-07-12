from fastapi import UploadFile, Form, HTTPException
from fastapi.responses import FileResponse
from ..services.upload_service import UploadService
import os
from fastapi import APIRouter
from fastapi.staticfiles import StaticFiles


router = APIRouter(prefix="/upload", tags=["uploads"])

@router.post("/")
async def upload_logo(logo: UploadFile, team_name: str = Form(...)):
    result = UploadService.validate_and_save(logo, team_name)
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    return result

# Serwowanie plików statycznych z katalogu 'uploads'
@router.get("/{file_path:path}")
async def serve_uploads(file_path: str):
    return FileResponse(os.path.join("uploads", file_path))


