from sqlalchemy.orm import Session
from app.schemas.match import MatchCreate, MatchUpdate
from app.models import match as models


def create_match(db: Session, match: MatchCreate):
    db_match = models.Match(**match.dict())
    db.add(db_match)
    db.commit()
    db.refresh(db_match)
    return db_match

def get_all_matchs(db: Session):
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