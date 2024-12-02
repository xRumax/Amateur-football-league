from pydantic import BaseModel
from typing import Optional
from app.models.action import ActionTypeEnum

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

class ActionPlayerDisplay(BaseModel):
    goals: int = 0
    assists: int = 0
    yellow_cards: int = 0
    red_cards: int = 0
    offside: int = 0
    shots: int = 0
    shots_on_target: int = 0

class ActionTeamDisplay(BaseModel):
    goals: int = 0
    yellow_cards: int = 0
    red_cards: int = 0
    shots: int = 0
    shots_on_target: int = 0

class ActionMatchDisplay(BaseModel):
    team_id: int
    goals: int = 0
    assists: int = 0
    yellow_cards: int = 0
    red_cards: int = 0
    offside: int = 0
    shots: int = 0
    shots_on_target: int = 0

class Action(ActionBase):
    minute: int 
    match_id : int
    player_id : int
    team_id : int

    class Config:
        from_attributes = True
