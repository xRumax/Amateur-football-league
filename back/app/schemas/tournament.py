from pydantic import BaseModel
from typing import List, Optional
from app.schemas.team import TeamBase
from datetime import date
from app.schemas.match import MatchTournament


class TournamentBase(BaseModel):
    name: str
    amount_of_teams: int

class TournamentCreate(TournamentBase):
    date_of_tournament: Optional[date] = None

class TournamentUpdate(TournamentBase):
    teams: Optional[List[TeamBase]] = None

class AddTeamToTournament(BaseModel):
    team_id: int

class Tournament(BaseModel):
    id: int
    name: str
    amount_of_teams: int
    date_of_tournament: Optional[date] = None
    teams: Optional[List[TeamBase]] = None
    matches: Optional[List[MatchTournament]] = None
    is_full: Optional[bool] = False
    is_active: Optional[bool] = True
    class Config:
        from_attributes = True