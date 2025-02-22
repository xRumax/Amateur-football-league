from sqlalchemy.orm import Session
from app.schemas.action import ActionCreate, ActionUpdate, ActionTeamDisplay, ActionTypeEnum, ActionTournamentDisplay, ActionPlayerDisplay, ActionMatchDisplay
from app.models import action as models
from app.models.team import Team
from app.models.match import Match
from app.models.player import Player
from fastapi import HTTPException
from typing import List
from app.crud.match import calculate_match_result

def create_action(db: Session, action: ActionCreate):
    check_team_match_player_exist(db, action.team_id, action.match_id, action.player_id)

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

        # Calculate match result for the first action's match_id
        if db_actions:
            calculate_match_result(db, db_actions[0].match_id)

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

    db_action = db.query(models.Action).filter(models.Action.id == action_id).first()
    if db_action:
        # Calculate match result
        calculate_match_result(db, db_action.match_id)

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

def get_player_action_summary(db: Session, player_id: int) -> ActionPlayerDisplay:
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


def get_team_action_summary(db: Session, team_id: int) -> ActionTeamDisplay:
    actions = db.query(models.Action).filter(models.Action.team_id == team_id).all()
    summary = {
        "goals": 0,
        "yellow_cards": 0,
        "red_cards": 0,
        "shots": 0,
        "shots_on_target": 0
    }

    for action in actions:
        if action.action_type == ActionTypeEnum.Goal:
            summary["goals"] += 1
        elif action.action_type == ActionTypeEnum.YellowCard:
            summary["yellow_cards"] += 1
        elif action.action_type == ActionTypeEnum.RedCard:
            summary["red_cards"] += 1
        elif action.action_type == ActionTypeEnum.Shot:
            summary["shots"] += 1
        elif action.action_type == ActionTypeEnum.ShotOnTarget:
            summary["shots_on_target"] += 1

    return ActionTeamDisplay(**summary)


def get_match_action_summary(db: Session, match_id: int) -> List[ActionMatchDisplay]:
    actions = db.query(models.Action).filter(models.Action.match_id == match_id).all()
    team_summaries = {}

    for action in actions:
        team_id = action.team_id
        if team_id not in team_summaries:
            team_summaries[team_id] = {
                "team_id": team_id,
                "goals": 0,
                "assists": 0,
                "yellow_cards": 0,
                "red_cards": 0,
                "offside": 0,
                "shots": 0,
                "shots_on_target": 0
            }

        if action.action_type == ActionTypeEnum.Goal:
            team_summaries[team_id]["goals"] += 1
        elif action.action_type == ActionTypeEnum.Assist:
            team_summaries[team_id]["assists"] += 1
        elif action.action_type == ActionTypeEnum.YellowCard:
            team_summaries[team_id]["yellow_cards"] += 1
        elif action.action_type == ActionTypeEnum.RedCard:
            team_summaries[team_id]["red_cards"] += 1
        elif action.action_type == ActionTypeEnum.Offside:
            team_summaries[team_id]["offside"] += 1
        elif action.action_type == ActionTypeEnum.Shot:
            team_summaries[team_id]["shots"] += 1
        elif action.action_type == ActionTypeEnum.ShotOnTarget:
            team_summaries[team_id]["shots_on_target"] += 1

    return [ActionMatchDisplay(**summary) for summary in team_summaries.values()]

def get_tournament_action_summary(db: Session, tournament_id: int) -> List[ActionTournamentDisplay]:
    actions = db.query(models.Action).filter(models.Action.tournament_id == tournament_id).all()
    tournament_summaries = {}

    for action in actions:
        tournament_id = action.tournament_id
        if tournament_id not in tournament_summaries:
            tournament_summaries[tournament_id] = {
                "tournament_id": tournament_id,
                "goals": 0,
                "yellow_cards": 0,
                "red_cards": 0,
                "shots": 0,
                "shots_on_target": 0,
                "offside": 0,
            }


        if action.action_type == ActionTypeEnum.Goal:
            tournament_summaries[tournament_id]["goals"] += 1
        elif action.action_type == ActionTypeEnum.YellowCard:
            tournament_summaries[tournament_id]["yellow_cards"] += 1
        elif action.action_type == ActionTypeEnum.RedCard:
            tournament_summaries[tournament_id]["red_cards"] += 1
        elif action.action_type == ActionTypeEnum.Shot:
            tournament_summaries[tournament_id]["shots"] += 1
        elif action.action_type == ActionTypeEnum.ShotOnTarget:
            tournament_summaries[tournament_id]["shots_on_target"] += 1
        elif action.action_type == ActionTypeEnum.Offside:
            tournament_summaries[tournament_id]["offside"] += 1

    return [ActionMatchDisplay(**summary) for summary in tournament_summaries.values()]