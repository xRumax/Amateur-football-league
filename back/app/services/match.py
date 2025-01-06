from app.schemas.match import MatchCreate, MatchUpdate, MatchDisplay
from app.models import match as models
from app.crud.match import create_match, get_match, update_match, delete_match, get_matches_with_results
from sqlalchemy.orm import Session
from app.models.match import Match as MatchModel
from typing import Optional

class MatchService:
    def __init__(self, db: Session):
        self.db = db

    def create_match(self, match: MatchCreate) -> models.Match:
        return create_match(self.db, match)

    def get_all_matches(self, limit: Optional[int] = None):
        query = self.db.query(MatchModel).order_by(MatchModel.date_of_match)
        if limit:
            query = query.limit(limit)
        return query.all()
    
    def get_matches_with_results(self):
        return get_matches_with_results(self.db)
    
    def get_match(self, match_id: int) -> Optional[models.Match]:
        return get_match(self.db, match_id)

    def update_match(self, match: MatchUpdate, match_id: int) -> Optional[models.Match]:
        return update_match(self.db, match, match_id)

    def delete_match(self, match_id: int) -> Optional[models.Match]:
        return delete_match(self.db, match_id)
    

            
                