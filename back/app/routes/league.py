from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.league import LeagueCreate, LeagueUpdate, League
from app.services.league import LeagueService
from app.database import get_db

router = APIRouter(prefix="/leagues", tags=["leagues"])

@router.post("/", response_model=League)
def create_league(league: LeagueCreate, db: Session = Depends(get_db)):
    league_service = LeagueService(db)
    return league_service.create_league(league)

@router.get("/", response_model=list[League])
def read_leagues(db: Session = Depends(get_db)):
    league_service = LeagueService(db)
    return league_service.get_all_leagues()

@router.get("/{league_id}", response_model=League)
def read_league(league_id: int, db: Session = Depends(get_db)):
    league_service = LeagueService(db)
    db_league = league_service.get_league(league_id)
    if db_league is None:
        raise HTTPException(status_code=404, detail="League not found")
    return db_league

@router.put("/{league_id}", response_model=League)
def update_league(league_id: int, league: LeagueUpdate, db: Session = Depends(get_db)):
    league_service = LeagueService(db)
    db_league = league_service.get_league(league_id)
    if db_league is None:
        raise HTTPException(status_code=404, detail="League not found")
    return league_service.update_league(league, league_id)

@router.delete("/{league_id}", response_model=League)
def delete_league(league_id: int, db: Session = Depends(get_db)):
    league_service = LeagueService(db)
    db_league = league_service.get_league(league_id)
    if db_league is None:
        raise HTTPException(status_code=404, detail="League not found")
    return league_service.delete_league(league_id)
