from app.schemas.tournament import TournamentCreate, TournamentUpdate
from app.models import tournament as models
from app.crud.tournament import create_tournament, get_all_tournaments, get_tournament, update_tournament, delete_tournament
from sqlalchemy.orm import Session
from typing import Optional
from app.models.team import Team
from app.schemas.match import MatchCreate
from app.services.match import MatchService
from fastapi import HTTPException

class TournamentService:
    def __init__(self, db: Session):
        self.db = db

    def create_tournament(self, tournament: TournamentCreate) -> models.Tournament:
        return create_tournament(self.db, tournament)

    def get_all_tournaments(self) -> list[models.Tournament]:
        return get_all_tournaments(self.db)

    def get_tournament(self, tournament_id: int) -> Optional[models.Tournament]:
        return get_tournament(self.db, tournament_id)

    def update_tournament(self, tournament: TournamentUpdate, tournament_id: int) -> Optional[models.Tournament]:
        return update_tournament(self.db, tournament, tournament_id)

    def delete_tournament(self, tournament_id: int) -> Optional[models.Tournament]:
        return delete_tournament(self.db, tournament_id)

    def add_team_to_tournament(self, tournament_id: int, team_id: int):
        db_tournament = self.get_tournament(tournament_id)
        db_team = self.db.query(Team).filter(Team.id == team_id).first()
        
        if db_tournament and db_team:
            if len(db_tournament.teams) >= db_tournament.amount_of_teams:
                raise HTTPException(status_code=400, detail="Tournament is full")
            
            db_tournament.teams.append(db_team)
            self.db.commit()
            self.db.refresh(db_tournament)

            # Check if the tournament is full after adding the team
            if len(db_tournament.teams) == db_tournament.amount_of_teams:
                self.set_tournament_inactive(db_tournament)
                self.create_matches_for_tournament(db_tournament)

        return db_tournament

    def set_tournament_inactive(self, db_tournament):
        # Set the tournament as full 
        db_tournament.is_full = True
        self.db.commit()

    def create_matches_for_tournament(self, db_tournament):
        teams = db_tournament.teams
        # Algoritm for creating matches: each team plays with each other
        for i, team_1 in enumerate(teams):
            for j, team_2 in enumerate(teams):
                if i < j:  # Creating a match only for unique pairs
                    match = MatchCreate(
                        team_1_id=team_1.id,
                        team_2_id=team_2.id,
                        date_of_match=db_tournament.date_of_tournament,
                        tournament_id=db_tournament.id
                    )
                    self.create_match(match)

    def create_match(self, match: MatchCreate):
        match_service = MatchService(self.db)
        return match_service.create_match(match)