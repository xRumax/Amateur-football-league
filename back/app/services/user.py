from app.schemas.user import UserCreate, UserUpdate
from app.models import user as models
from app.crud.user import create_user, get_all_users, get_user, update_user, delete_user, authenticate_user
from sqlalchemy.orm import Session
from typing import Optional

class UserService:
    def __init__(self, db: Session):
        self.db = db

    def create_user(self, user: UserCreate) -> models.User:
        return create_user(self.db, user)

    def get_all_users(self) -> list[models.User]:
        return get_all_users(self.db)

    def get_user(self, user_id: int) -> Optional[models.User]:
        return get_user(self.db, user_id)

    def update_user(self, user: UserUpdate, user_id: int) -> Optional[models.User]:
        return update_user(self.db, user, user_id)

    def delete_user(self, user_id: int) -> Optional[models.User]:
        return delete_user(self.db, user_id)

    def authenticate_user(self, email: str, password: str) -> Optional[models.User]:
        return authenticate_user(self.db, email, password)