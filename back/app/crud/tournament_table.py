from sqlalchemy.orm import Session
from app.schemas.tournament_table import TournamentTableCreate, TournamentTableUpdate
from app.models import tournament_table as models, match as match_models

def create_tournament_table(db: Session, tournament_table: TournamentTableCreate):
    db_tournament_table = models.TournamentTable(**tournament_table.dict())
    db.add(db_tournament_table)
    db.commit()
    db.refresh(db_tournament_table)
    return db_tournament_table

def get_all_tournament_tables(db: Session, tournament_id: int):
    return db.query(models.TournamentTable).filter(models.TournamentTable.tournament_id == tournament_id).all()

def get_tournament_table(db: Session, tournament_table_id: int):
    return db.query(models.TournamentTable).filter(models.TournamentTable.id == tournament_table_id).first()

def update_tournament_table(db: Session, tournament_id: int):
    matches = db.query(match_models.Match).filter(match_models.Match.tournament_id == tournament_id).all()
    team_stats = {}

    for match in matches:
        if match.result:
            team_1_id = match.team_1_id
            team_2_id = match.team_2_id
            team_1_goals, team_2_goals = map(int, match.result.split(':'))

            if team_1_id not in team_stats:
                team_stats[team_1_id] = {'points': 0, 'matches_played': 0, 'wins': 0, 'draws': 0, 'losses': 0}
            if team_2_id not in team_stats:
                team_stats[team_2_id] = {'points': 0, 'matches_played': 0, 'wins': 0, 'draws': 0, 'losses': 0}

            team_stats[team_1_id]['matches_played'] += 1
            team_stats[team_2_id]['matches_played'] += 1

            if team_1_goals > team_2_goals:
                team_stats[team_1_id]['points'] += 3
                team_stats[team_1_id]['wins'] += 1
                team_stats[team_2_id]['losses'] += 1
            elif team_1_goals < team_2_goals:
                team_stats[team_2_id]['points'] += 3
                team_stats[team_2_id]['wins'] += 1
                team_stats[team_1_id]['losses'] += 1
            else:
                team_stats[team_1_id]['points'] += 1
                team_stats[team_2_id]['points'] += 1
                team_stats[team_1_id]['draws'] += 1
                team_stats[team_2_id]['draws'] += 1

    for team_id, stats in team_stats.items():
        db_tournament_table = db.query(models.TournamentTable).filter(models.TournamentTable.tournament_id == tournament_id, models.TournamentTable.team_id == team_id).first()
        if db_tournament_table:
            db_tournament_table.points = stats['points']
            db_tournament_table.matches_played = stats['matches_played']
            db_tournament_table.wins = stats['wins']
            db_tournament_table.draws = stats['draws']
            db_tournament_table.losses = stats['losses']
        else:
            new_tournament_table = models.TournamentTable(
                tournament_id=tournament_id,
                team_id=team_id,
                points=stats['points'],
                matches_played=stats['matches_played'],
                wins=stats['wins'],
                draws=stats['draws'],
                losses=stats['losses']
            )
            db.add(new_tournament_table)

    db.commit()
    return db.query(models.TournamentTable).filter(models.TournamentTable.tournament_id == tournament_id).all()

def delete_tournament_table(db: Session, tournament_table_id: int):
    db_team = get_tournament_table(db=db, tournament_table_id=tournament_table_id)
    db.delete(db_team)
    db.commit()
    return db_team