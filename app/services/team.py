from app.schemas.team import TeamCreate, TeamUpdate
from app.models import team as models
from app.crud.team import create_team, get_all_teams, get_team, update_team, delete_team
from sqlalchemy.orm import Session
from typing import Optional

class TeamService:
    def __init__(self, db: Session):
        self.db = db

    def create_team(self, team: TeamCreate) -> models.Team:
        return create_team(self.db, team)

    def get_all_teams(self) -> list[models.Team]:
        return get_all_teams(self.db)

    def get_team(self, team_id: int) -> Optional[models.Team]:
        return get_team(self.db, team_id)

    def update_team(self, team: TeamUpdate, team_id: int) -> Optional[models.Team]:
        return update_team(self.db, team, team_id)

    def delete_team(self, team_id: int) -> Optional[models.Team]:
        return delete_team(self.db, team_id)
