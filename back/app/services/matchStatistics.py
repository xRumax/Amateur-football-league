from app.schemas.matchStatistics import MatchStatisticsCreate, MatchStatisticsUpdate
from app.models import matchStatistics as models
from app.crud.matchStatistics import create_matchStatistics, get_all_matchStatisticss, get_matchStatistics, update_matchStatistics, delete_matchStatistics
from sqlalchemy.orm import Session
from typing import Optional

class MatchStatisticsService:
    def __init__(self, db: Session):
        self.db = db

    def create_matchStatistics(self, matchStatistics: MatchStatisticsCreate) -> models.MatchStatistics:
        return create_matchStatistics(self.db, matchStatistics)

    def get_all_matchStatisticss(self) -> list[models.MatchStatistics]:
        return get_all_matchStatisticss(self.db)

    def get_matchStatistics(self, matchStatistics_id: int) -> Optional[models.MatchStatistics]:
        return get_matchStatistics(self.db, matchStatistics_id)

    def update_matchStatistics(self, matchStatistics: MatchStatisticsUpdate, matchStatistics_id: int) -> Optional[models.MatchStatistics]:
        return update_matchStatistics(self.db, matchStatistics, matchStatistics_id)

    def delete_matchStatistics(self, matchStatistics_id: int) -> Optional[models.MatchStatistics]:
        return delete_matchStatistics(self.db, matchStatistics_id)
