from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.player import PlayerCreate, PlayerUpdate, Player
from app.crud import player as crud
from app.database import get_db


router = APIRouter(prefix="/players", tags=["players"])

@router.post("/", response_model=Player)
def create_player(player: PlayerCreate, db: Session = Depends(get_db)):
    return crud.create_player(db=db, player=player)

@router.get("/", response_model=list[Player])
def read_players(db: Session = Depends(get_db)):
    return crud.get_all_players(db=db)

@router.get("/{player_id}", response_model=Player)
def read_player(player_id: int, db: Session = Depends(get_db)):
    db_player = crud.get_player(db=db, player_id=player_id)
    if db_player is None:
        raise HTTPException(status_code=404, detail="Player not found")
    return db_player

@router.put("/{player_id}", response_model=Player)
def update_player(player_id: int, player: PlayerUpdate, db: Session = Depends(get_db)):
    db_player = crud.get_player(db=db, player_id=player_id)
    if db_player is None:
        raise HTTPException(status_code=404, detail="Player not found")
    return crud.update_player(db=db, player=player, player_id=player_id)


@router.delete("/{player_id}", response_model=Player)
def delete_player(player_id: int, db: Session = Depends(get_db)):
    db_player = crud.get_player(db=db, player_id=player_id)
    if db_player is None:
        raise HTTPException(status_code=404, detail="Player not found")
    return crud.delete_player(db=db, player_id=player_id)