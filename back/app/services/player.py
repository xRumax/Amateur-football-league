from app.schemas.player import PlayerCreate, PlayerUpdate
from app.models import player as models
from app.crud.player import create_player, get_all_players, get_player, update_player, delete_player
from sqlalchemy.orm import Session
from typing import Optional
from fastapi import HTTPException
import re

class PlayerService:
    def __init__(self, db: Session):
        self.db = db

    def create_player(self, player: PlayerCreate) -> models.Player:
        if not (1985 <= player.date_of_birth.year <= 2005):
            raise HTTPException(status_code=400, detail="Date of birth must be between 1985 and 2005")

        if re.search(r'\d', player.name) or re.search(r'\d', player.last_name):
            raise HTTPException(status_code=400, detail="First name and last name cannot contain numbers")

        return create_player(self.db, player)
    def get_all_players(self) -> list[models.Player]:
        return get_all_players(self.db)

    def get_player(self, player_id: int) -> Optional[models.Player]:
        return get_player(self.db, player_id)

    def update_player(self, player: PlayerUpdate, player_id: int) -> Optional[models.Player]:
        db_player = self.get_player(player_id)
        if not db_player:
            raise HTTPException(status_code=404, detail="Player not found")

        if player.date_of_birth and not (1985 <= player.date_of_birth.year <= 2005):
            raise HTTPException(status_code=400, detail="Date of birth must be between 1985 and 2005")

        if player.name and re.search(r'\d', player.name):
            raise HTTPException(status_code=400, detail="First name cannot contain numbers")
        if player.last_name and re.search(r'\d', player.last_name):
            raise HTTPException(status_code=400, detail="Last name cannot contain numbers")

        return update_player(self.db, player, player_id)
    def delete_player(self, player_id: int) -> Optional[models.Player]:
        return delete_player(self.db, player_id)
