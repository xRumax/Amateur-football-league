from sqlalchemy import Table, Column, Integer, ForeignKey, Boolean
from app.database import Base


team_tournament = Table(
    'team_tournament',
    Base.metadata,
    Column('team_id', Integer, ForeignKey('teams.id'), primary_key=True),
    Column('tournament_id', Integer, ForeignKey('tournaments.id'), primary_key=True),
    Column('is_active', Boolean, default=True),)
