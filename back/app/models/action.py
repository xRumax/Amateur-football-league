from sqlalchemy import Column, Integer, ForeignKey, Enum
from app.database import Base
from enum import Enum as PyEnum
from sqlalchemy.orm import relationship

class ActionTypeEnum(PyEnum):
    Goal = "Goal"
    Assist = "Assist"
    YellowCard = "Yellow Card"
    RedCard = "Red Card"
    Offside = "Offside"
    Corner = "Corner"
    Shot = "Shot"
    ShotOnTarget = "Shot On Target"


class Action(Base):
    __tablename__ = "actions"

    id = Column(Integer, primary_key=True, index=True)
    action_type = Column(Enum(ActionTypeEnum), nullable=False)
    minute = Column(Integer, nullable = False)
    match_id = Column(Integer, ForeignKey('matches.id'))
    player_id = Column(Integer, ForeignKey('players.id'))
    team_id = Column(Integer, ForeignKey('teams.id'))
    tournament_id = Column(Integer, ForeignKey('tournaments.id'))

    # Relationship with match, player, team and tournament
    matches = relationship("Match", back_populates="actions")
    players = relationship("Player", back_populates="actions")
    teams = relationship("Team", back_populates="actions")
    tournaments = relationship("Tournament", back_populates="actions")