from sqlalchemy.orm import Session
from app.schemas.match import MatchCreate, MatchUpdate
from app.models import match as models
from app.models import team as team_models


def create_match(db: Session, match: MatchCreate):
    db_match = models.Match(**match.dict())
    db.add(db_match)
    db.commit()
    db.refresh(db_match)

# Update matches_played for both teams
    team_1_id = db.query(team_models.Team).filter(team_models.Team.id == db_match.team_1_id).first()
    team_2_id = db.query(team_models.Team).filter(team_models.Team.id == db_match.team_2_id).first()

    if team_1_id:
        team_1_id.matches_played = team_1_id.matches_played + 1 if team_1_id.matches_played is not None else 1
    if team_2_id:
        team_2_id.matches_played = team_2_id.matches_played + 1 if team_2_id.matches_played is not None else 1

    db.commit()

    return db_match

def get_all_matches(db: Session):
    return db.query(models.Match).all()

def get_match(db: Session, match_id: int):
    return db.query(models.Match).filter(models.Match.id == match_id).first()

def update_match(db: Session, match: MatchUpdate, match_id: int):
    db.query(models.Match).filter(models.Match.id == match_id).update(match.dict())
    db.commit()
    return get_match(db=db, match_id=match_id)

def delete_match(db: Session, match_id: int):
    db_match = get_match(db=db, match_id=match_id)
    db.delete(db_match)
    db.commit()
    return db_match