from sqlalchemy.orm import Session
from app.schemas.tournament import TournamentCreate, TournamentUpdate, Tournament
from app.models import tournament as models


def create_tournament(db: Session, tournament: TournamentCreate, creator_id: int):
    db_tournament = models.Tournament(creator_id=creator_id, **tournament.dict())
    db.add(db_tournament)
    db.commit()
    db.refresh(db_tournament)
    return db_tournament

def get_all_tournaments(db: Session):
    return db.query(models.Tournament).all()

def get_tournament(db: Session, tournament_id: int):
    return db.query(models.Tournament).filter(models.Tournament.id == tournament_id).first()

def update_tournament(db: Session, tournament: TournamentUpdate, tournament_id: int):
    db.query(models.Tournament).filter(models.Tournament.id == tournament_id).update(tournament.dict())
    db.commit()
    return get_tournament(db=db, tournament_id=tournament_id)

def delete_tournament(db: Session, tournament_id: int):
    db_tournament = get_tournament(db=db, tournament_id=tournament_id)
    db.delete(db_tournament)
    db.commit()
    return db_tournament
