from app.schemas.match import MatchCreate, MatchUpdate
from app.models import match as models
from app.crud.match import create_match, get_all_matchs, get_match, update_match, delete_match
from sqlalchemy.orm import Session
from typing import Optional

class MatchService:
    def __init__(self, db: Session):
        self.db = db

    def create_match(self, match: MatchCreate) -> models.Match:
        return create_match(self.db, match)

    def get_all_matchs(self) -> list[models.Match]:
        return get_all_matchs(self.db)

    def get_match(self, match_id: int) -> Optional[models.Match]:
        return get_match(self.db, match_id)

    def update_match(self, match: MatchUpdate, match_id: int) -> Optional[models.Match]:
        return update_match(self.db, match, match_id)

    def delete_match(self, match_id: int) -> Optional[models.Match]:
        return delete_match(self.db, match_id)