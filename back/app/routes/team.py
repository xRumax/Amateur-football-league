from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy.orm import Session
from app.schemas.team import TeamCreate, TeamUpdate, Team
from app.services.team import TeamService
from app.database import get_db
from app.utils.auth import get_current_user
from app.schemas.player import PlayerBase
from app.services.upload_service import UploadService

router = APIRouter(prefix="/teams", tags=["teams"])

@router.post("/", response_model=Team)
def create_team(
    name: str = Form(...),
    league_id: int = Form(...),
    logo: UploadFile = File(None),
    db: Session = Depends(get_db), 
    current_user: dict = Depends(get_current_user)
):
    if 'user_id' not in current_user:
        raise HTTPException(status_code=400, detail="User ID not found")

    team_service = TeamService(db)

    # Check if the user already has a team
    existing_team = team_service.get_team_by_user_id(current_user['user_id'])
    if existing_team is not None:
        raise HTTPException(status_code=400, detail="User already has a team")

    # Create a TeamCreate object from the form data
    team_create = TeamCreate(name=name, league_id=league_id)

    # Try to save the logo if it is provided
    if logo:
        upload_service = UploadService()
        upload_result = upload_service.validate_and_save(logo, name)
        if upload_result and "error" in upload_result:
            raise HTTPException(status_code=400, detail=upload_result["error"])
        team_create.logo = upload_result["info"] if upload_result else None

    team_service = TeamService(db)
    return team_service.create_team_with_logo(team_create, creator_id=current_user['user_id'], logo=logo)

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

