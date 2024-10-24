from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.tournament import TournamentCreate, TournamentUpdate, Tournament
from app.services.tournament import TournamentService
from app.database import get_db
from app.schemas.match import Match

router = APIRouter(prefix="/tournaments", tags=["tournaments"])

@router.post("/", response_model=Tournament)
def create_tournament(tournament: TournamentCreate, db: Session = Depends(get_db)):
    tournament_service = TournamentService(db)
    return tournament_service.create_tournament(tournament)

@router.get("/", response_model=list[Tournament])
def read_tournaments(db: Session = Depends(get_db)):
    tournament_service = TournamentService(db)
    return tournament_service.get_all_tournaments()

@router.get("/{tournament_id}", response_model=Tournament)
def read_tournament(tournament_id: int, db: Session = Depends(get_db)):
    tournament_service = TournamentService(db)
    db_tournament = tournament_service.get_tournament(tournament_id)
    if db_tournament is None:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return db_tournament

@router.put("/{tournament_id}", response_model=Tournament)
def update_tournament(tournament_id: int, tournament: TournamentUpdate, db: Session = Depends(get_db)):
    tournament_service = TournamentService(db)
    db_tournament = tournament_service.get_tournament(tournament_id)
    if db_tournament is None:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return tournament_service.update_tournament(tournament, tournament_id)

@router.delete("/{tournament_id}", response_model=Tournament)
def delete_tournament(tournament_id: int, db: Session = Depends(get_db)):
    tournament_service = TournamentService(db)
    db_tournament = tournament_service.get_tournament(tournament_id)
    if db_tournament is None:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return tournament_service.delete_tournament(tournament_id)

@router.post("/{tournament_id}/teams/{team_id}", response_model=Tournament)
def add_team_to_tournament(tournament_id: int, team_id: int, db: Session = Depends(get_db)):
    tournament_service = TournamentService(db)
    db_tournament = tournament_service.get_tournament(tournament_id)
    if db_tournament is None:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return tournament_service.add_team_to_tournament(tournament_id, team_id)

@router.get("/{tournament_id}/matches", response_model=list[Match])
def read_tournament_matches(tournament_id: int, db: Session = Depends(get_db)):
    tournament_service = TournamentService(db)
    db_tournament = tournament_service.get_tournament(tournament_id)
    if db_tournament is None:
        raise HTTPException(status_code=404, detail="Tournament not found")
    return db_tournament.matches