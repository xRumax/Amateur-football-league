from app.schemas.action import ActionCreate, ActionUpdate
from app.models import action as models
from app.crud.action import create_action, get_all_actions, get_action, update_action, delete_action, create_match_actions
from sqlalchemy.orm import Session
from typing import Optional

class ActionService:
    def __init__(self, db: Session):
        self.db = db

    def create_action(self, action: ActionCreate) -> models.Action:
        return create_action(self.db, action)
    
    def create_match_actions(self, actions: list[ActionCreate]) -> list[models.Action]:
        return create_match_actions(self.db, actions)

    def get_all_actions(self) -> list[models.Action]:
        return get_all_actions(self.db)

    def get_action(self, action_id: int) -> Optional[models.Action]:
        return get_action(self.db, action_id)

    def update_action(self, action: ActionUpdate, action_id: int) -> Optional[models.Action]:
        return update_action(self.db, action, action_id)

    def delete_action(self, action_id: int) -> Optional[models.Action]:
        return delete_action(self.db, action_id)
    

