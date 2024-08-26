from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship

class MatchStatistics(Base):
    __tablename__ = "matchstatistics"

    id = Column(Integer, primary_key=True, index=True)

    goals_scored = Column(Integer, default=0)
    shots = Column(Integer, default=0)
    shots_on_target = Column(Integer, default=0)
    possession = Column(Integer, default=0)
    passes = Column(Integer, default=0)
    pass_accuracy = Column(Integer, default=0)
    fouls = Column(Integer, default=0)
    yellow_cards = Column(Integer, default=0)
    red_cards = Column(Integer, default=0)
    offsides = Column(Integer, default=0)
    corners = Column(Integer, default=0)

    match_id = Column(Integer, ForeignKey('matches.id'))
    team_id = Column(Integer, ForeignKey('teams.id'))