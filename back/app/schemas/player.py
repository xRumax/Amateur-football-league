from pydantic import BaseModel, Field
from datetime import datetime

class PlayerBase(BaseModel):
    name: str


class PlayerCreate(PlayerBase):
    name: str
    last_name: str
    date_of_birth : datetime
    sex : str
    team_id: int = Field(default=None)

class PlayerUpdate(PlayerBase):
    last_name: str
    date_of_birth : datetime
    num_of_goals : int
    team_id: int = Field(default=None)

class Player(BaseModel):
    id :int
    name: str
    last_name: str
    date_of_birth : datetime
    sex : str
    num_of_goals : int
    team_id : int

    class Config:
        from_attributes = True