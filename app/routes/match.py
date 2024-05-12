from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.match import MatchCreate, MatchUpdate, Match
from app.crud import match as crud
from app.database import get_db


router = APIRouter(prefix="/matchs", tags=["matchs"])

@router.post("/", response_model=Match)
def create_match(match: MatchCreate, db: Session = Depends(get_db)):
    return crud.create_match(db=db, match=match)

@router.get("/", response_model=list[Match])
def read_matchs(db: Session = Depends(get_db)):
    return crud.get_all_matchs(db=db)

@router.get("/{match_id}", response_model=Match)
def read_match(match_id: int, db: Session = Depends(get_db)):
    db_match = crud.get_match(db=db, match_id=match_id)
    if db_match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    return db_match

@router.put("/{match_id}", response_model=Match)
def update_match(match_id: int, match: MatchUpdate, db: Session = Depends(get_db)):
    db_match = crud.get_match(db=db, match_id=match_id)
    if db_match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    return crud.update_match(db=db, match=match, match_id=match_id)


@router.delete("/{match_id}", response_model=Match)
def delete_match(match_id: int, db: Session = Depends(get_db)):
    db_match = crud.get_match(db=db, match_id=match_id)
    if db_match is None:
        raise HTTPException(status_code=404, detail="Match not found")
    return crud.delete_match(db=db, match_id=match_id)