from pydantic import BaseModel, Field
from datetime import datetime
from enum import Enum
from typing import Optional

class SexEnum(str, Enum):
    Male = "Male"
    Female = "Female"

class PlayerBase(BaseModel):
    name: str


class PlayerCreate(PlayerBase):
    name: str
    last_name: str
    date_of_birth : datetime
    sex : SexEnum
    num_of_goals : Optional[int] = Field(0)
    num_of_assists : Optional[int] = Field(0)
    num_of_yellow_cards : Optional[int] = Field(0)
    num_of_red_cards : Optional[int] = Field(0)
    team_id: int = Field(default=None)

class PlayerUpdate(PlayerBase):
    last_name: str
    date_of_birth : datetime
    num_of_goals : Optional[int] = Field(0)
    num_of_assists : Optional[int] = Field(0)
    num_of_yellow_cards : Optional[int] = Field(0)
    num_of_red_cards : Optional[int] = Field(0)
    team_id: int = Field(default=None)

class PlayerStats(BaseModel):
    num_of_goals: Optional[int] = Field(0)
    num_of_assists: Optional[int] = Field(0)
    num_of_yellow_cards: Optional[int] = Field(0)
    num_of_red_cards: Optional[int] = Field(0)

class Player(BaseModel):
    id :int
    name: str
    last_name: str
    date_of_birth : datetime
    sex : SexEnum

    # Relacja z druzyna
    team_id : int

    # Statystyki
    num_of_goals: Optional[int] = Field(0)
    num_of_assists: Optional[int] = Field(0)
    num_of_yellow_cards: Optional[int] = Field(0)
    num_of_red_cards: Optional[int] = Field(0)
    num_of_matches_played :Optional[int] = Field(0)
    minutes_played: Optional[int] = Field(0)

    class Config:
        from_attributes = True