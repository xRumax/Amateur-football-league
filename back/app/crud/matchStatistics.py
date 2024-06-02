from sqlalchemy.orm import Session
from app.schemas.matchStatistics import MatchStatisticsCreate, MatchStatisticsUpdate
from app.models import matchStatistics as models


def create_matchStatistics(db: Session, statistics: MatchStatisticsCreate):
    db_statistics = models.MatchStatistics(**statistics.dict())
    db.add(db_statistics)
    db.commit()
    db.refresh(db_statistics)
    return db_statistics

def get_all_matchStatisticss(db: Session):
    return db.query(models.MatchStatistics).all()

def get_matchStatistics(db: Session, matchStatistics_id: int):
    return db.query(models.MatchStatistics).filter(models.MatchStatistics.id == matchStatistics_id).first()

def update_matchStatistics(db: Session, matchStatistics: MatchStatisticsUpdate, matchStatistics_id: int):
    db.query(models.MatchStatistics).filter(models.MatchStatistics.id == matchStatistics_id).update(matchStatistics.dict())
    db.commit()
    return get_matchStatistics(db=db, matchStatistics_id=matchStatistics_id)

def delete_matchStatistics(db: Session, matchStatistics_id: int):
    db_statistics = get_matchStatistics(db=db, matchStatistics_id=matchStatistics_id)
    db.delete(db_statistics)
    db.commit()
    return db_statistics