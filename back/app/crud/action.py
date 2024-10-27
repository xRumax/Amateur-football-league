from sqlalchemy.orm import Session
from app.schemas.action import ActionCreate, ActionUpdate
from app.models import action as models
from app.models.team import Team
from app.models.match import Match
from app.models.player import Player
from fastapi import HTTPException


def create_action(db: Session, action: ActionCreate):
    db_team = db.query(Team).filter(Team.id == action.team_id).first()
    if not db_team:
        raise HTTPException(status_code=400, detail="Team not found")

    # Sprawdź istnienie meczu
    db_match = db.query(Match).filter(Match.id == action.match_id).first()
    if not db_match:
        raise HTTPException(status_code=400, detail="Match not found")

    # Sprawdź istnienie zawodnika
    db_player = db.query(Player).filter(Player.id == action.player_id).first()
    if not db_player:
        raise HTTPException(status_code=400, detail="Player not found")

    db_action = models.Action(**action.dict())
    db.add(db_action)
    db.commit()
    db.refresh(db_action)
    return db_action
def get_all_actions(db: Session):
    return db.query(models.Action).all()

def get_action(db: Session, action_id: int):
    return db.query(models.Action).filter(models.Action.id == action_id).first()

def update_action(db: Session, action: ActionUpdate, action_id: int):
    db.query(models.Action).filter(models.Action.id == action_id).update(action.dict())
    db.commit()
    return get_action(db=db, action_id=action_id)

def delete_action(db: Session, action_id: int):
    db_action = get_action(db=db, action_id=action_id)
    db.delete(db_action)
    db.commit()
    return db_action