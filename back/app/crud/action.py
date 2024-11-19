from sqlalchemy.orm import Session
from app.schemas.action import ActionCreate, ActionUpdate
from app.models import action as models
from app.models.team import Team
from app.models.match import Match
from app.models.player import Player
from fastapi import HTTPException
from typing import List
from app.schemas.action import ActionPlayerDisplay
from app.schemas.action import ActionTypeEnum

def create_action(db: Session, action: ActionCreate):
    check_team_match_player_exist(db, action.team_id, action.match_id, action.player_id)

    # Sprawdź, czy taki sam rekord już istnieje
    existing_action = db.query(models.Action).filter(
        models.Action.action_type == action.action_type,
        models.Action.minute == action.minute,
        models.Action.match_id == action.match_id,
        models.Action.player_id == action.player_id,
        models.Action.team_id == action.team_id
    ).first()

    if existing_action:
        raise HTTPException(status_code=400, detail="The action already exists.")

    db_action = models.Action(**action.dict())
    db.add(db_action)
    db.commit()
    db.refresh(db_action)
    return db_action

def create_match_actions(db: Session, actions: List[ActionCreate]):
    try:
        db_actions = []
        for action in actions:
            # Sprawdź, czy taki sam rekord już istnieje
            existing_action = db.query(models.Action).filter(
                models.Action.action_type == action.action_type,
                models.Action.minute == action.minute,
                models.Action.match_id == action.match_id,
                models.Action.player_id == action.player_id,
                models.Action.team_id == action.team_id
            ).first()

            if existing_action:
                raise HTTPException(status_code=400, detail="The action already exists.")

            db_action = models.Action(**action.dict())
            db_actions.append(db_action)

        db.add_all(db_actions)
        db.commit()
        for db_action in db_actions:
            db.refresh(db_action)
        return db_actions
    except Exception as e:
        raise HTTPException(status_code=500, detail="An error occurred while processing actions.")

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


def check_team_match_player_exist(db: Session, team_id: int, match_id: int, player_id: int):
    db_team = db.query(Team).filter(Team.id == team_id).first()
    if not db_team:
        raise HTTPException(status_code=400, detail="Team not found")
    
    db_match = db.query(Match).filter(Match.id == match_id).first()
    if not db_match:
        raise HTTPException(status_code=400, detail="Match not found")
    
    db_player = db.query(Player).filter(Player.id == player_id).first()
    if not db_player:
        raise HTTPException(status_code=400, detail="Player not found")

    return db_team, db_match, db_player

def get_player_action_summary(db: Session, player_id: int):
    actions = db.query(models.Action).filter(models.Action.player_id == player_id).all()
    summary = {
        "goals": 0,
        "assists": 0,
        "yellow_cards": 0,
        "red_cards": 0,
        "offside": 0,
        "shots": 0,
        "shots_on_target": 0
        }

    for action in actions:
        if action.action_type == ActionTypeEnum.Goal:
            summary["goals"] += 1
        elif action.action_type == ActionTypeEnum.Assist:
            summary["assists"] += 1
        elif action.action_type == ActionTypeEnum.YellowCard:
            summary["yellow_cards"] += 1
        elif action.action_type == ActionTypeEnum.RedCard:
            summary["red_cards"] += 1
        elif action.action_type == ActionTypeEnum.Offside:
            summary["offside"] += 1
        elif action.action_type == ActionTypeEnum.Shot:
            summary["shots"] += 1
        elif action.action_type == ActionTypeEnum.ShotOnTarget:
            summary["shots_on_target"] += 1

    return ActionPlayerDisplay(**summary)