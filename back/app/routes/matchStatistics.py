from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.matchStatistics import MatchStatisticsCreate, MatchStatisticsUpdate, MatchStatistics
from app.services.matchStatistics import MatchStatisticsService
from app.database import get_db

router = APIRouter(prefix="/matchStatistics", tags=["matchStatistics"])

@router.post("/", response_model=MatchStatistics)
def create_matchStatistics(matchStatistics: MatchStatisticsCreate, db: Session = Depends(get_db)):
    matchStatistics_service = MatchStatisticsService(db)
    return matchStatistics_service.create_matchStatistics(matchStatistics)

@router.get("/", response_model=list[MatchStatistics])
def read_matchStatisticss(db: Session = Depends(get_db)):
    matchStatistics_service = MatchStatisticsService(db)
    return matchStatistics_service.get_all_matchStatisticss()

@router.get("/{matchStatistics_id}", response_model=MatchStatistics)
def read_matchStatistics(matchStatistics_id: int, db: Session = Depends(get_db)):
    matchStatistics_service = MatchStatisticsService(db)
    db_matchStatistics = matchStatistics_service.get_matchStatistics(matchStatistics_id)
    if db_matchStatistics is None:
        raise HTTPException(status_code=404, detail="MatchStatistics not found")
    return db_matchStatistics

@router.put("/{matchStatistics_id}", response_model=MatchStatistics)
def update_matchStatistics(matchStatistics_id: int, matchStatistics: MatchStatisticsUpdate, db: Session = Depends(get_db)):
    matchStatistics_service = MatchStatisticsService(db)
    db_matchStatistics = matchStatistics_service.get_matchStatistics(matchStatistics_id)
    if db_matchStatistics is None:
        raise HTTPException(status_code=404, detail="MatchStatistics not found")
    return matchStatistics_service.update_matchStatistics(matchStatistics, matchStatistics_id)

@router.delete("/{matchStatistics_id}", response_model=MatchStatistics)
def delete_matchStatistics(matchStatistics_id: int, db: Session = Depends(get_db)):
    matchStatistics_service = MatchStatisticsService(db)
    db_matchStatistics = matchStatistics_service.get_matchStatistics(matchStatistics_id)
    if db_matchStatistics is None:
        raise HTTPException(status_code=404, detail="MatchStatistics not found")
    return matchStatistics_service.delete_matchStatistics(matchStatistics_id)
