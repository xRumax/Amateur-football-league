from pydantic import BaseModel
from typing import List, Optional
from app.schemas.user import UserBase

class TeamBase(BaseModel):
    name: str

class TeamCreate(TeamBase):
    league_id: int

class TeamUpdate(TeamBase):
    league_id: int

class Team(TeamBase):
    id: int
    players: Optional[List[UserBase]] = None
    league_id: int

    class Config:
        from_attributes = True