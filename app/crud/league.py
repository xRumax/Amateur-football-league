from sqlalchemy.orm import Session
from app.schemas.league import LeagueCreate, LeagueUpdate
from app.models import league as models


def create_league(db: Session, league: LeagueCreate):
    db_league = models.League(**league.dict())
    db.add(db_league)
    db.commit()
    db.refresh(db_league)
    return db_league

def get_all_leagues(db: Session):
    return db.query(models.League).all()

def get_league(db: Session, league_id: int):
    return db.query(models.League).filter(models.League.id == league_id).first()

def update_league(db: Session, league: LeagueUpdate, league_id: int):
    db.query(models.League).filter(models.League.id == league_id).update(league.dict())
    db.commit()
    return get_league(db=db, league_id=league_id)

def delete_league(db: Session, league_id: int):
    db_league = get_league(db=db, league_id=league_id)
    db.delete(db_league)
    db.commit()
    return db_league