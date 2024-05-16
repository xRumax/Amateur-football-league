from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.statistics import StatisticsCreate, StatisticsUpdate, Statistics
from app.services.statistics import StatisticsService
from app.database import get_db

router = APIRouter(prefix="/statistics", tags=["statistics"])

@router.post("/", response_model=Statistics)
def create_statistics(statistics: StatisticsCreate, db: Session = Depends(get_db)):
    statistics_service = StatisticsService(db)
    return statistics_service.create_statistics(statistics)

@router.get("/", response_model=list[Statistics])
def read_statisticss(db: Session = Depends(get_db)):
    statistics_service = StatisticsService(db)
    return statistics_service.get_all_statisticss()

@router.get("/{statistics_id}", response_model=Statistics)
def read_statistics(statistics_id: int, db: Session = Depends(get_db)):
    statistics_service = StatisticsService(db)
    db_statistics = statistics_service.get_statistics(statistics_id)
    if db_statistics is None:
        raise HTTPException(status_code=404, detail="Statistics not found")
    return db_statistics

@router.put("/{statistics_id}", response_model=Statistics)
def update_statistics(statistics_id: int, statistics: StatisticsUpdate, db: Session = Depends(get_db)):
    statistics_service = StatisticsService(db)
    db_statistics = statistics_service.get_statistics(statistics_id)
    if db_statistics is None:
        raise HTTPException(status_code=404, detail="Statistics not found")
    return statistics_service.update_statistics(statistics, statistics_id)

@router.delete("/{statistics_id}", response_model=Statistics)
def delete_statistics(statistics_id: int, db: Session = Depends(get_db)):
    statistics_service = StatisticsService(db)
    db_statistics = statistics_service.get_statistics(statistics_id)
    if db_statistics is None:
        raise HTTPException(status_code=404, detail="Statistics not found")
    return statistics_service.delete_statistics(statistics_id)
