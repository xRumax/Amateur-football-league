from app.schemas.league import LeagueCreate, LeagueUpdate
from app.models import league as models
from app.crud.league import create_league, get_all_leagues, get_league, update_league, delete_league
from sqlalchemy.orm import Session
from typing import Optional

class LeagueService:
    def __init__(self, db: Session):
        self.db = db

    def create_league(self, league: LeagueCreate) -> models.League:
        return create_league(self.db, league)

    def get_all_leagues(self) -> list[models.League]:
        return get_all_leagues(self.db)

    def get_league(self, league_id: int) -> Optional[models.League]:
        return get_league(self.db, league_id)

    def update_league(self, league: LeagueUpdate, league_id: int) -> Optional[models.League]:
        return update_league(self.db, league, league_id)

    def delete_league(self, league_id: int) -> Optional[models.League]:
        return delete_league(self.db, league_id)
