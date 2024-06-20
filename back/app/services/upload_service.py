from fastapi import UploadFile
from PIL import Image
import os
import re

class UploadService:
    @staticmethod
    def validate_and_save(logo: UploadFile, team_name: str):
        # If logo is None, just return
        if logo is None:
            return

        # Check if the file type is correct
        if logo.content_type not in ["image/png", "image/jpeg"]:
            return {"error": "File type not supported"}

        # Check the image dimensions
        image = Image.open(logo.file)
        if image.size != (900, 900):
            return {"error": "Image size must be 900x900"}

        # Generate a file name based on team name
        sanitized_team_name = re.sub(r'\W+', '', team_name)  # Remove non-alphanumeric characters
        file_extension = os.path.splitext(logo.filename)[1]
        file_location = f"uploads/{sanitized_team_name}{file_extension}"

        # Save the file
        with open(file_location, "wb+") as file_object:
            file_object.write(logo.file.read())
        
        return {"info": file_location}
