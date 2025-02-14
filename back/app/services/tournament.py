from app.schemas.tournament import TournamentCreate, TournamentUpdate
from app.models import tournament as models
from app.crud.tournament import create_tournament, get_tournament, update_tournament, delete_tournament
from sqlalchemy.orm import Session
from typing import Optional
from app.models.team import Team
from app.schemas.tournament import Tournament
from app.models.tournament import Tournament as ModelTournament
from app.schemas.match import MatchCreate
from app.services.match import MatchService
from fastapi import HTTPException
from datetime import datetime, timedelta
from app.services.tournament_table import update_tournament_table

class TournamentService:
    def __init__(self, db: Session):
        self.db = db    

    def create_tournament(self, tournament: TournamentCreate, creator_id: int) -> Tournament:
        today = datetime.today().date()
        six_months_from_now = today + timedelta(days=6*30)
        if not (today <= tournament.date_of_tournament <= six_months_from_now):
            raise HTTPException(status_code=400, detail="Tournament date must be between today and six months from now")

        if len(tournament.name) > 40:
            raise HTTPException(status_code=400, detail="Tournament name cannot exceed 40 characters")
        
        return create_tournament(self.db, tournament, creator_id)

    def get_all_tournaments(self, limit:Optional[int] = None) -> list[models.Tournament]:
        query = self.db.query(ModelTournament)
        if limit:
            query = query.limit(limit)
        return query.all()

    def get_tournament(self, tournament_id: int) -> Optional[models.Tournament]:
        return get_tournament(self.db, tournament_id)

    def update_tournament(self, tournament: TournamentUpdate, tournament_id: int) -> Optional[models.Tournament]:
        if tournament.date_of_tournament:
            today = datetime.today().date()
            six_months_from_now = today + timedelta(days=6*30)
            if not (today <= tournament.date_of_tournament <= six_months_from_now):
                raise HTTPException(status_code=400, detail="Tournament date must be between today and six months from now")

        if tournament.name and len(tournament.name) > 40:
            raise HTTPException(status_code=400, detail="Tournament name cannot exceed 40 characters")
        
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

            if len(db_tournament.teams) == db_tournament.amount_of_teams:
                self.set_tournament_inactive(db_tournament)
                self.create_matches_for_tournament(db_tournament)

        return db_tournament

    def set_tournament_inactive(self, db_tournament):
        db_tournament.is_full = True
        self.db.commit()

    def create_matches_for_tournament(self, db_tournament):
        teams = db_tournament.teams
        for i, team_1 in enumerate(teams):
            for j, team_2 in enumerate(teams):
                if i < j:  
                    match = MatchCreate(
                        team_1_id=team_1.id,
                        team_2_id=team_2.id,
                        date_of_match=db_tournament.date_of_tournament,
                        tournament_id=db_tournament.id
                    )
                    self.create_match(match)
        self.check_and_update_tournament_status(db_tournament.id)

    def create_match(self, match: MatchCreate):
        match_service = MatchService(self.db)
        return match_service.create_match(match)
    
    def get_active_tournament_by_user_id(self, user_id: int):
        return self.db.query(ModelTournament).filter(ModelTournament.creator_id == user_id, ModelTournament.is_active == True).first()
    
    def check_and_update_tournament_status(self, tournament_id: int):
        db_tournament = self.get_tournament(tournament_id)
        if db_tournament:
            all_matches_have_result = all(match.result is not None and match.result != "" for match in db_tournament.matches)
            if all_matches_have_result:
                db_tournament.is_active = False
                self.db.commit()

                update_tournament_table(tournament_id)

  

        
    
