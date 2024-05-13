from pydantic import BaseModel
from typing import List, Optional
from app.schemas.player import PlayerBase

class TeamBase(BaseModel):
    name: str

class TeamCreate(TeamBase):
    league_id: int

class TeamUpdate(TeamBase):
    league_id: int

class Team(TeamBase):
    id: int
    players: Optional[List[PlayerBase]] = None
    league_id: int

    class Config:
        from_attributes = True