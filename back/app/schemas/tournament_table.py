from pydantic import BaseModel



class TournamentTableBase(BaseModel):
    team_id: int
    points: int = 0
    matches_played: int = 0
    wins: int = 0
    draws: int = 0
    losses: int = 0

class TournamentTableCreate(TournamentTableBase):
    tournament_id: int

class TournamentTableUpdate(TournamentTableCreate):
    pass

class TournamentTable(TournamentTableBase):
    id: int
    tournament_id: int

    class Config:
        from_attributes = True

