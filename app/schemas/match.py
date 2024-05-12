from pydantic import BaseModel
from datetime import datetime

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

    class Config:
        from_attributes = True