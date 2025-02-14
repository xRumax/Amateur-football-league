from app.schemas.tournament_table import TournamentTableCreate, TournamentTableUpdate
from app.models import tournament_table as models
from app.crud.tournament_table import create_tournament_table, get_all_tournament_tables, get_tournament_table, update_tournament_table, delete_tournament_table
from sqlalchemy.orm import Session
from typing import Optional

class TournamentTableService:
    def __init__(self, db: Session):
        self.db = db

    def create_tournament_table(self, tournament_table: TournamentTableCreate, tournament_id: str) -> models.TournamentTable:
        return create_tournament_table(self.db, tournament_table, tournament_id)

    def get_all_tournament_tables(self, tournament_id: int) -> list[models.TournamentTable]:
        return get_all_tournament_tables(self.db, tournament_id)

    def get_tournament_table(self, tournament_table_id: int) -> Optional[models.TournamentTable]:
        return get_tournament_table(self.db, tournament_table_id)

    def update_tournament_table(self, tournament_id: int) -> list[models.TournamentTable]:
        return update_tournament_table(self.db, tournament_id)

    def delete_tournament_table(self, tournament_table_id: int) -> Optional[models.TournamentTable]:
        return delete_tournament_table(self.db, tournament_table_id)