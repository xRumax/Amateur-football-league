from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.league import LeagueCreate, LeagueUpdate, League
from app.crud import league as crud
from app.database import get_db


router = APIRouter(prefix="/leagues", tags=["leagues"])

@router.post("/", response_model=League)
def create_league(league: LeagueCreate, db: Session = Depends(get_db)):
    return crud.create_league(db=db, league=league)

@router.get("/", response_model=list[League])
def read_leagues(db: Session = Depends(get_db)):
    return crud.get_all_leagues(db=db)

@router.get("/{league_id}", response_model=League)
def read_league(league_id: int, db: Session = Depends(get_db)):
    db_league = crud.get_league(db=db, league_id=league_id)
    if db_league is None:
        raise HTTPException(status_code=404, detail="League not found")
    return db_league

@router.put("/{league_id}", response_model=League)
def update_league(league_id: int, league: LeagueUpdate, db: Session = Depends(get_db)):
    db_league = crud.get_league(db=db, league_id=league_id)
    if db_league is None:
        raise HTTPException(status_code=404, detail="League not found")
    return crud.update_league(db=db, league=league, league_id=league_id)


@router.delete("/{league_id}", response_model=League)
def delete_league(league_id: int, db: Session = Depends(get_db)):
    db_league = crud.get_league(db=db, league_id=league_id)
    if db_league is None:
        raise HTTPException(status_code=404, detail="League not found")
    return crud.delete_league(db=db, league_id=league_id)