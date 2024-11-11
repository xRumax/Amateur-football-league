from pydantic import BaseModel
from datetime import date
from typing import Optional, List
from app.schemas.team import TeamMatch
from app.schemas.action import ActionBase, ActionCreate

class MatchBase(BaseModel):
    team_1_id : int
    team_2_id : int

class MatchCreate(MatchBase):
    date_of_match: Optional[date] = None
    tournament_id: int

class MatchUpdate(BaseModel):
    result: Optional[str] = None
    
class MatchTournament(BaseModel):
    id: int
    team_1_id : int
    team_2_id : int

class Match(BaseModel):
    id: int
    date_of_match : Optional[date]
    result : Optional[str]
    team_1 : Optional[TeamMatch]
    team_2 : Optional[TeamMatch]
    actions: Optional[List[ActionBase]] = None

    tournament_id : int

    class Config:
        from_attributes = True