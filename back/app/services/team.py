from app.schemas.team import TeamCreate, TeamUpdate
from app.models import team as models
from app.crud.team import create_team, get_all_teams, get_team, update_team, delete_team
from sqlalchemy.orm import Session
from typing import Optional
from sqlalchemy import select
from app.models.team import Team
from fastapi import UploadFile, HTTPException
from app.services.upload_service import UploadService
from app.models.player import Player

class TeamService:
    def __init__(self, db: Session):
        self.db = db

    def create_team(self, team: TeamCreate, creator_id: str) -> models.Team:
        return create_team(self.db, team, creator_id)

    def get_all_teams(self) -> list[models.Team]:
        return get_all_teams(self.db)

    def get_team(self, team_id: int) -> Optional[models.Team]:
        return get_team(self.db, team_id)

    def update_team(self, team: TeamUpdate, team_id: int) -> Optional[models.Team]:
        return update_team(self.db, team, team_id)

    def delete_team(self, team_id: int) -> Optional[models.Team]:
        return delete_team(self.db, team_id)

    def get_team_by_user_id(self, user_id: str) -> Optional[models.Team]:
        stmt = select(Team).where(Team.creator_id == user_id)
        result = self.db.execute(stmt)
        return result.scalars().first()
    
    def create_team_with_logo(self, team: TeamCreate, creator_id: int, logo: Optional[UploadFile] = None):
        if logo:
            upload_service = UploadService()
            upload_result = upload_service.validate_and_save(logo, team.name)
            if "error" in upload_result:
                raise HTTPException(status_code=400, detail=upload_result["error"])
            team.logo = upload_result["info"]

        return self.create_team(team, creator_id)
    
