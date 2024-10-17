from pydantic import BaseModel
from datetime import date
from typing import Optional

class MatchBase(BaseModel):
    team_1_id : int
    team_2_id : int

class MatchCreate(MatchBase):
    date_of_match: Optional[date] = None

class MatchUpdate(MatchBase):
    result: Optional[str] = None
    date_of_match: Optional[date] = None

class Match(BaseModel):
    id: int
    date_of_match : Optional[date]
    result : Optional[str]
    team_1_id : int
    team_2_id : int

    class Config:
        from_attributes = True