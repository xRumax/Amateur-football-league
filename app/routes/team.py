from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.team import TeamCreate, TeamUpdate, Team
from app.crud import team as crud
from app.database import get_db


router = APIRouter(prefix="/teams", tags=["teams"])

@router.post("/", response_model=Team)
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    return crud.create_team(db=db, team=team)

@router.get("/", response_model=list[Team])
def read_teams(db: Session = Depends(get_db)):
    return crud.get_all_teams(db=db)

@router.get("/{team_id}", response_model=Team)
def read_team(team_id: int, db: Session = Depends(get_db)):
    db_team = crud.get_team(db=db, team_id=team_id)
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return db_team

@router.put("/{team_id}", response_model=Team)
def update_team(team_id: int, team: TeamUpdate, db: Session = Depends(get_db)):
    db_team = crud.get_team(db=db, team_id=team_id)
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return crud.update_team(db=db, team=team, team_id=team_id)


@router.delete("/{team_id}", response_model=Team)
def delete_team(team_id: int, db: Session = Depends(get_db)):
    db_team = crud.get_team(db=db, team_id=team_id)
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return crud.delete_team(db=db, team_id=team_id)