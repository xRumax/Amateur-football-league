from pydantic import BaseModel

class StatisticsBase(BaseModel):
# Drużyna pierwsza
    home_shots: int
    home_shots_on_target: int
    home_possession: int
    home_passes: int
    home_pass_accuarcy: int
    home_fouls: int
    home_yellow_cards: int
    home_red_cards: int
    home_offsides: int
    home_corners: int


# Drużyna druga
    away_shots: int
    away_shots_on_target: int
    away_possession: int
    away_passes: int
    away_pass_accuarcy: int
    away_fouls: int
    away_yellow_cards: int
    away_red_cards: int
    away_offsides: int
    away_corners: int

    match_id: int

class StatisticsCreate(StatisticsBase):
    pass

class StatisticsUpdate(StatisticsBase):
    pass

class Statistics(BaseModel):
    id: int

# Drużyna pierwsza   
    home_shots: int
    home_shots_on_target: int
    home_possession: int
    home_passes: int
    home_pass_accuarcy: int
    home_fouls: int
    home_yellow_cards: int
    home_red_cards: int
    home_offsides: int
    home_corners: int


# Drużyna druga
    away_shots: int
    away_shots_on_target: int
    away_possession: int
    away_passes: int
    away_pass_accuarcy: int
    away_fouls: int
    away_yellow_cards: int
    away_red_cards: int
    away_offsides: int
    away_corners: int

    match_id: int

    class Config:
        from_attributes = True