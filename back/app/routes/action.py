from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.action import ActionCreate, ActionUpdate, Action
from app.services.action import ActionService
from app.database import get_db

router = APIRouter(prefix="/actions", tags=["actions"])

@router.post("/", response_model=Action)
def create_action(action: ActionCreate, db: Session = Depends(get_db)):
    action_service = ActionService(db)
    return action_service.create_action(action)

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
