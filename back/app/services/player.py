from app.schemas.player import PlayerCreate, PlayerUpdate
from app.models import player as models
from app.crud.player import create_player, get_all_players, get_player, update_player, delete_player
from sqlalchemy.orm import Session
from typing import Optional

class PlayerService:
    def __init__(self, db: Session):
        self.db = db

    def create_player(self, player: PlayerCreate) -> models.Player:
        return create_player(self.db, player)

    def get_all_players(self) -> list[models.Player]:
        return get_all_players(self.db)

    def get_player(self, player_id: int) -> Optional[models.Player]:
        return get_player(self.db, player_id)

    def update_player(self, player: PlayerUpdate, player_id: int) -> Optional[models.Player]:
        return update_player(self.db, player, player_id)

    def delete_player(self, player_id: int) -> Optional[models.Player]:
        return delete_player(self.db, player_id)
