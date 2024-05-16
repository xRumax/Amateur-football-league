from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.match import MatchCreate, MatchUpdate, Match
from app.services.match import MatchService
from app.database import get_db

router = APIRouter(prefix="/matches", tags=["matches"])

@router.post("/", response_model=Match)
def create_match(match: MatchCreate, db: Session = Depends(get_db)):
    match_service = MatchService(db)
    return match_service.create_match(match)

@router.get("/", response_model=list[Match])
def read_matches(db: Session = Depends(get_db)):
    match_service = MatchService(db)
    return match_service.get_all_matches()

@router.get("/{match_id}", response_model=Match)
def read_match(match_id: int, db: Session = Depends(get_db)):
    match_service = MatchService(db)
    db_match = match_service.get_match(match_id)
    if db_match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    return db_match

@router.put("/{match_id}", response_model=Match)
def update_match(match_id: int, match: MatchUpdate, db: Session = Depends(get_db)):
    match_service = MatchService(db)
    db_match = match_service.get_match(match_id)
    if db_match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    return match_service.update_match(match, match_id)

@router.delete("/{match_id}", response_model=Match)
def delete_match(match_id: int, db: Session = Depends(get_db)):
    match_service = MatchService(db)
    db_match = match_service.get_match(match_id)
    if db_match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    return match_service.delete_match(match_id)
