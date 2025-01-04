from pydantic import BaseModel
from typing import List, Optional
from app.schemas.player import Player

class TeamBase(BaseModel):
    name: str
class TeamTournamentDisplay(BaseModel):
    id: int
    name: str
class TeamCreate(TeamBase):
    pass
    
class TeamUpdate(TeamBase):
    pass

class TeamMatch(BaseModel):
    id: int
    name:str
    players: Optional[List[Player]] = None

class TournamentTeams(BaseModel):
    id:int
    name:str

class Team(BaseModel):
    id: int
    name:str
    matches_played: Optional[int] = 0
    players: Optional[List[Player]] = None
    creator_id: int

    class Config:
        from_attributes = True