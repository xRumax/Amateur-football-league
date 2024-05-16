from app.schemas.statistics import StatisticsCreate, StatisticsUpdate
from app.models import statistics as models
from app.crud.statistics import create_statistics, get_all_statisticss, get_statistics, update_statistics, delete_statistics
from sqlalchemy.orm import Session
from typing import Optional

class StatisticsService:
    def __init__(self, db: Session):
        self.db = db

    def create_statistics(self, statistics: StatisticsCreate) -> models.Statistics:
        return create_statistics(self.db, statistics)

    def get_all_statisticss(self) -> list[models.Statistics]:
        return get_all_statisticss(self.db)

    def get_statistics(self, statistics_id: int) -> Optional[models.Statistics]:
        return get_statistics(self.db, statistics_id)

    def update_statistics(self, statistics: StatisticsUpdate, statistics_id: int) -> Optional[models.Statistics]:
        return update_statistics(self.db, statistics, statistics_id)

    def delete_statistics(self, statistics_id: int) -> Optional[models.Statistics]:
        return delete_statistics(self.db, statistics_id)
