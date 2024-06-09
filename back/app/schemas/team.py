from pydantic import BaseModel
from typing import List, Optional
from app.schemas.player import PlayerBase, PlayerStats

class TeamBase(BaseModel):
    name: str

class TeamCreate(TeamBase):
    league_id: int


class TeamUpdate(TeamBase):
    league_id: int


class Team(BaseModel):
    id: int
    name:str
    matches_played: Optional[int] = 0
    players: Optional[List[PlayerBase]] = None
    statics: Optional[List[PlayerStats]] = None
    league_id: int
    creator_id: int

    class Config:
        from_attributes = True