from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.team import TeamCreate, TeamUpdate, Team
from app.services.team import TeamService
from app.database import get_db

router = APIRouter(prefix="/teams", tags=["teams"])

@router.post("/", response_model=Team)
def create_team(team: TeamCreate, db: Session = Depends(get_db)):
    team_service = TeamService(db)
    return team_service.create_team(team)

@router.get("/", response_model=list[Team])
def read_teams(db: Session = Depends(get_db)):
    team_service = TeamService(db)
    return team_service.get_all_teams()

@router.get("/{team_id}", response_model=Team)
def read_team(team_id: int, db: Session = Depends(get_db)):
    team_service = TeamService(db)
    db_team = team_service.get_team(team_id)
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return db_team

@router.put("/{team_id}", response_model=Team)
def update_team(team_id: int, team: TeamUpdate, db: Session = Depends(get_db)):
    team_service = TeamService(db)
    db_team = team_service.get_team(team_id)
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return team_service.update_team(team, team_id)

@router.delete("/{team_id}", response_model=Team)
def delete_team(team_id: int, db: Session = Depends(get_db)):
    team_service = TeamService(db)
    db_team = team_service.get_team(team_id)
    if db_team is None:
        raise HTTPException(status_code=404, detail="Team not found")
    return team_service.delete_team(team_id)
