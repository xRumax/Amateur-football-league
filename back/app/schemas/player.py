from pydantic import BaseModel, Field, validator
from datetime import date
from enum import Enum
from typing import Optional
from app.schemas.action import ActionPlayerDisplay

class SexEnum(str, Enum):
    Male = "Male"
    Female = "Female"

class PlayerBase(BaseModel):
    name: str
    last_name: str


class PlayerCreate(PlayerBase):
    date_of_birth : Optional[date] = None
    sex : Optional[SexEnum] = None
    team_id: Optional[int] = None

    @validator('team_id', pre=True, always=True)
    def set_team_id(cls, v):
        if v == '':
            return None
        return v

class PlayerUpdate(PlayerBase):
    name: str
    last_name: str
    date_of_birth : date



class Player(BaseModel):
    id :int
    name: str
    last_name: str
    date_of_birth : Optional[date] = None
    sex : Optional[SexEnum] = None

    # Relationship with team
    team_id : Optional[int] = None

    class Config:
        from_attributes = True