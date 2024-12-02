from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.action import ActionCreate, ActionUpdate, Action, ActionPlayerDisplay, ActionTeamDisplay, ActionMatchDisplay
from app.services.action import ActionService
from app.database import get_db
from app.crud.action import get_player_action_summary, get_team_action_summary, get_match_action_summary
from typing import List

router = APIRouter(prefix="/actions", tags=["actions"])

@router.post("/", response_model=Action)
def create_action(action: ActionCreate, db: Session = Depends(get_db)):
    action_service = ActionService(db)
    return action_service.create_action(action)

@router.post("/bulk", response_model=list[Action])
async def create_match_actions(actions: list[ActionCreate], db: Session = Depends(get_db)):
    action_service = ActionService(db)
    return action_service.create_match_actions(actions)

@router.get("/", response_model=list[Action])
def read_actions(db: Session = Depends(get_db)):
    action_service = ActionService(db)
    return action_service.get_all_actions()

@router.get("/{action_id}", response_model=Action)
def read_action(action_id: int, db: Session = Depends(get_db)):
    action_service = ActionService(db)
    db_action = action_service.get_action(action_id)
    if db_action is None:
        raise HTTPException(status_code=404, detail="Action not found")
    return db_action

@router.put("/{action_id}", response_model=Action)
def update_action(action_id: int, action: ActionUpdate, db: Session = Depends(get_db)):
    action_service = ActionService(db)
    db_action = action_service.get_action(action_id)
    if db_action is None:
        raise HTTPException(status_code=404, detail="Action not found")
    return action_service.update_action(action, action_id)

@router.delete("/{action_id}", response_model=Action)
def delete_action(action_id: int, db: Session = Depends(get_db)):
    action_service = ActionService(db)
    db_action = action_service.get_action(action_id)
    if db_action is None:
        raise HTTPException(status_code=404, detail="Action not found")
    return action_service.delete_action(action_id)

@router.get("/player/{player_id}/actions", response_model=ActionPlayerDisplay)
def read_player_actions(player_id: int, db: Session = Depends(get_db)):
    return get_player_action_summary(db, player_id)

@router.get("/team/{team_id}/actions", response_model=ActionTeamDisplay)
def read_team_actions(team_id: int, db: Session = Depends(get_db)):
    return get_team_action_summary(db, team_id)

@router.get("/match/{match_id}/actions", response_model=List[ActionMatchDisplay])
def read_match_team_actions(match_id: int, db: Session = Depends(get_db)):
    return get_match_action_summary(db, match_id)