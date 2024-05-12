from pydantic import BaseModel
from typing import List, Optional
from app.schemas.team import TeamBase

class LeagueBase(BaseModel):
    name: str
    description: str
    rules: str

class LeagueCreate(LeagueBase):
    pass

class LeagueUpdate(LeagueBase):
    pass

class League(BaseModel):
    id: int
    name: str
    description: str
    rules: str
    teams: Optional[List[TeamBase]] = None

    class Config:
        from_attributes = True