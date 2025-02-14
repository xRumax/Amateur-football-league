from sqlalchemy import Column, Integer, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base


class TournamentTable(Base):
    __tablename__ = "tournament_table"

    id = Column(Integer, primary_key=True, index=True)
    tournament_id = Column(Integer, ForeignKey("tournaments.id"))
    team_id = Column(Integer, ForeignKey("teams.id"))
    points = Column(Integer, default=0)
    matches_played = Column(Integer, default=0)
    wins = Column(Integer, default=0)
    draws = Column(Integer, default=0)
    losses = Column(Integer, default=0)

    tournament = relationship("Tournament", back_populates="tournament_table")
    team = relationship("Team", back_populates="tournament_tables")
