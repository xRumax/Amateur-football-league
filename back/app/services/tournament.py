from app.schemas.tournament import TournamentCreate, TournamentUpdate
from app.models import tournament as models
from app.crud.tournament import create_tournament, get_all_tournaments, get_tournament, update_tournament, delete_tournament
from sqlalchemy.orm import Session
from typing import Optional
from app.models.team import Team

class TournamentService:
    def __init__(self, db: Session):
        self.db = db

    def create_tournament(self, tournament: TournamentCreate) -> models.Tournament:
        return create_tournament(self.db, tournament)

    def get_all_tournaments(self) -> list[models.Tournament]:
        return get_all_tournaments(self.db)

    def get_tournament(self, tournament_id: int) -> Optional[models.Tournament]:
        return get_tournament(self.db, tournament_id)

    def update_tournament(self, tournament: TournamentUpdate, tournament_id: int) -> Optional[models.Tournament]:
        return update_tournament(self.db, tournament, tournament_id)

    def delete_tournament(self, tournament_id: int) -> Optional[models.Tournament]:
        return delete_tournament(self.db, tournament_id)

    def add_team_to_tournament(self, tournament_id: int, team_id: int):
        db_tournament = self.get_tournament(tournament_id)
        db_team = self.db.query(Team).filter(Team.id == team_id).first()
        if db_tournament and db_team:
            db_tournament.teams.append(db_team)
            self.db.commit()
            self.db.refresh(db_tournament)
        return db_tournament