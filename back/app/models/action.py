from sqlalchemy import Column, Integer, ForeignKey, Enum
from app.database import Base
from enum import Enum as PyEnum
from sqlalchemy.orm import relationship

class ActionTypeEnum(PyEnum):
    Goal = "Goal"
    Assist = "Assist"
    YellowCard = "Yellow Card"
    RedCard = "Red Card"
    Substitution = "Substitution"
    Offside = "Offside"
    Corner = "Corner"
    FreeKick = "Free Kick"
    Penalty = "Penalty"
    Shot = "Shot"
    ShotOnTarget = "Shot on Target"
    Foul = "Foul"
    

class Action(Base):
    __tablename__ = "actions"

    id = Column(Integer, primary_key=True, index=True)
    action_type = Column(Enum(ActionTypeEnum), nullable=False)
    count = Column(Integer, nullable=False, default = 0)
    minute = Column(Integer, nullable = False)
    match_id = Column(Integer, ForeignKey('matches.id'))
    player_id = Column(Integer, ForeignKey('players.id'))
    team_id = Column(Integer, ForeignKey('teams.id'))

    # Relationship with match, player and team
    matches = relationship("Match", back_populates="actions")
    players = relationship("Player", back_populates="actions")
    teams = relationship("Team", back_populates="actions")