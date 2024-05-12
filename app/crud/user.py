from sqlalchemy.orm import Session
from app.schemas.user import UserCreate, UserUpdate
from app.models import user as models


def create_user(db: Session, user: UserCreate):
    db_user = models.User(**user.dict())
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_all_users(db: Session):
    return db.query(models.User).all()

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def update_user(db: Session, user: UserUpdate, user_id: int):
    db.query(models.User).filter(models.User.id == user_id).update(user.dict())
    db.commit()
    return get_user(db=db, user_id=user_id)

def delete_user(db: Session, user_id: int):
    db_user = get_user(db=db, user_id=user_id)
    db.delete(db_user)
    db.commit()
    return db_user