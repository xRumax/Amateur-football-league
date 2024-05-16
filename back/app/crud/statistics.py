from sqlalchemy.orm import Session
from app.schemas.statistics import StatisticsCreate, StatisticsUpdate
from app.models import statistics as models


def create_statistics(db: Session, statistics: StatisticsCreate):
    db_statistics = models.Statistics(**statistics.dict())
    db.add(db_statistics)
    db.commit()
    db.refresh(db_statistics)
    return db_statistics

def get_all_statisticss(db: Session):
    return db.query(models.Statistics).all()

def get_statistics(db: Session, statistics_id: int):
    return db.query(models.Statistics).filter(models.Statistics.id == statistics_id).first()

def update_statistics(db: Session, statistics: StatisticsUpdate, statistics_id: int):
    db.query(models.Statistics).filter(models.Statistics.id == statistics_id).update(statistics.dict())
    db.commit()
    return get_statistics(db=db, statistics_id=statistics_id)

def delete_statistics(db: Session, statistics_id: int):
    db_statistics = get_statistics(db=db, statistics_id=statistics_id)
    db.delete(db_statistics)
    db.commit()
    return db_statistics