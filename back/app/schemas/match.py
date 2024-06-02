from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from app.schemas.matchStatistics import MatchStatisticsBase

class MatchBase(BaseModel):
    date : datetime
    result : str
    team_1_id : int
    team_2_id : int

class MatchCreate(MatchBase):
    pass

class MatchUpdate(MatchBase):
    pass

class Match(BaseModel):
    id: int
    date : datetime
    result : str
    team_1_id : int
    team_2_id : int
    match_statistics : Optional[MatchStatisticsBase]

    class Config:
        from_attributes = True