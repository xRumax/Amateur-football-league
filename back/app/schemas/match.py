from pydantic import BaseModel
from datetime import date
from typing import Optional

class MatchBase(BaseModel):
    team_1_id : int
    team_2_id : int

class MatchCreate(MatchBase):
    date_of_match: Optional[date] = None
    tournament_id: int

class MatchUpdate(MatchBase):
    result: Optional[str] = None
    date_of_match: Optional[date] = None

class MatchTournament(BaseModel):
    id: int
    team_1_id : int
    team_2_id : int

class Match(BaseModel):
    id: int
    date_of_match : Optional[date]
    result : Optional[str]
    team_1_id : int
    team_2_id : int
    tournament_id : int

    class Config:
        from_attributes = True