from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.tournament_table import TournamentTableService

router = APIRouter(prefix="/tournament_table", tags=["tournament_tables"])

@router.get("/{tournament_id}/table")
def get_tournament_table(tournament_id: int, db: Session = Depends(get_db)):
    tournament_table_service = TournamentTableService(db)
    tournament_table_service.update_tournament_table(tournament_id)
    db_tournament_table = tournament_table_service.get_all_tournament_tables(tournament_id)
    if not db_tournament_table:
        raise HTTPException(status_code=404, detail="Tournament table not found")

    return db_tournament_table