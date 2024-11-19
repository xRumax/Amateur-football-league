from pydantic import BaseModel
from typing import List, Optional
from app.schemas.player import Player

class TeamBase(BaseModel):
    name: str

class TeamCreate(TeamBase):
    league_id: int
    logo: Optional[str] = None
    
class TeamUpdate(TeamBase):
    league_id: int


class TeamMatch(BaseModel):
    id: int
    name:str
    players: Optional[List[Player]] = None


class Team(BaseModel):
    id: int
    name:str
    matches_played: Optional[int] = 0
    players: Optional[List[Player]] = None
    league_id: int
    creator_id: int
    logo: Optional[str] = None

    class Config:
        from_attributes = True