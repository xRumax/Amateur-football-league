import os
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.models.player import Player
from app.models.user import User
from app.models.team import Team
from app.models.action import Action
from app.models.tournament import Tournament
from app.models.match import Match
from app.models.tournament_table import TournamentTable
from app.association_tables import team_tournament
from datetime import datetime   
from app.database import SQLALCHEMY_DATABASE_URL

# Utwórz silnik bazy danych
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# Utwórz sesję
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
db = SessionLocal()

# Ścieżka do katalogu z plikami JSON
json_dir = 'db json'

# Funkcja do wczytywania danych z pliku JSON
def load_json_data(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        return json.load(f)

# Iteruj przez wszystkie pliki JSON w katalogu
for file_name in os.listdir(json_dir):
    if file_name.endswith('.json'):
        file_path = os.path.join(json_dir, file_name)
        data = load_json_data(file_path)

        # Zapisz dane do bazy danych
        for item in data:
            if 'players' in file_name:
                player = Player(
                    id=item['id'],
                    name=item['name'],
                    last_name=item['last_name'],
                    date_of_birth=datetime.strptime(item['date_of_birth'], '%Y-%m-%d').date(),
                    sex=item['sex'],
                    team_id=item['team_id']
                )
                db.add(player)
            elif 'teams' in file_name:
                team = Team(
                    id=item['id'],
                    name=item['name'],
                    matches_played=item['matches_played'],
                    creator_id=item['creator_id']
                )
                db.add(team)
            elif 'users' in file_name:
                user = User(
                    id=item['id'],
                    username=item['username'],
                    email=item['email'],
                    password=item['password'],
                    is_superuser=item['is_superuser'],
                    is_referee=item['is_referee']
                )
                db.add(user)
            elif 'actions' in file_name:
                action = Action(
                    id=item['id'],
                    action_type=item['action_type'],
                    minute=item['minute'],
                    match_id=item['match_id'],
                    player_id=item['player_id'],
                    team_id=item['team_id'],
                    tournament_id=item['tournament_id']
                )
                db.add(action)
            elif 'tournaments' in file_name:
                tournament = Tournament(
                    id=item['id'],
                    name=item['name'],
                    amount_of_teams=item['amount_of_teams'],
                    is_active=item['is_active'],
                    is_full=item['is_full'],
                     date_of_tournament=datetime.strptime(item['date_of_tournament'], '%Y-%m-%d').date(),
                    team_id=item['team_id'],
                    creator_id=item['creator_id']
                )
                db.add(tournament)
            elif 'matches' in file_name:
                match = Match(
                    id=item['id'],
                    date_of_match=datetime.strptime(item['date_of_match'], '%Y-%m-%d').date(),
                    result = item['result'],
                    team_1_id=item['team_1_id'],
                    team_2_id=item['team_2_id'],
                    tournament_id=item['tournament_id']
                )
            elif 'tournament_table' in file_name:
                pass
            # Dodaj inne modele i warunki, jeśli masz więcej plików JSON

# Zatwierdź zmiany
db.commit()

# Zamknij sesję
db.close()