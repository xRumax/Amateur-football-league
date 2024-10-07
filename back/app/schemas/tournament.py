from pydantic import BaseModel
from typing import List, Optional
from app.schemas.team import TeamBase

class TournamentBase(BaseModel):
    name: str
    amount_of_teams: int

class TournamentCreate(TournamentBase):
    pass

class TournamentUpdate(TournamentBase):
    teams: Optional[List[TeamBase]] = None

class AddTeamToTournament(BaseModel):
    team_id: int

class Tournament(BaseModel):
    id: int
    name: str
    amount_of_teams: int
    teams: Optional[List[TeamBase]] = None

    class Config:
        from_attributes = True