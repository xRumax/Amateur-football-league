from pydantic import BaseModel

class MatchStatisticsBase(BaseModel):
    goals_scored : int
    shots: int
    shots_on_target: int
    possession : int
    passes : int
    pass_accuracy : int
    fouls : int
    yellow_cards : int
    red_cards : int
    offsides : int
    corners : int


class MatchStatisticsCreate(MatchStatisticsBase):
    match_id: int
    team_id: int

class MatchStatisticsUpdate(MatchStatisticsBase):
    match_id: int
    team_id: int

class MatchStatistics(BaseModel):
    id: int

    goals_scored : int
    shots: int
    shots_on_target: int
    possession : int
    passes : int
    pass_accuracy : int
    fouls : int
    yellow_cards : int
    red_cards : int
    offsides : int
    corners : int

    match_id: int
    team_id: int
    class Config:
        from_attributes = True