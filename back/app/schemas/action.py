from pydantic import BaseModel
from typing import Optional
from enum import Enum

class ActionTypeEnum(str, Enum):
    Goal = "Goal"
    Assist = "Assist"
    YellowCard = "Yellow Card"
    RedCard = "Red Card"
    Substitution = "Substitution"
    Injury = "Injury"
    Offside = "Offside"
    Corner = "Corner"
    FreeKick = "Free Kick"
    Penalty = "Penalty"
    Shot = "Shot"
    ShotOnTarget = "Shot on Target"
    Foul = "Foul"


class ActionBase(BaseModel):
    id : int
    action_type : Optional[ActionTypeEnum] = None

class ActionCreate(BaseModel):
    action_type : Optional[ActionTypeEnum] = None
    minute: int 
    match_id : int
    player_id : int
    team_id : int

class ActionUpdate(ActionBase):
    minute: int 
    match_id : int
    player_id : int
    team_id : int

class ActionDelete(ActionBase):
    id : int

class Action(ActionBase):
    minute: int 
    match_id : int
    player_id : int
    team_id : int

    class Config:
        from_attributes = True
