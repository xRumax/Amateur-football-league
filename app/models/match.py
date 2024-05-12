from sqlalchemy import Column, Integer, String, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Match(Base):
    __tablename__ = "matches"

    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    result = Column(String)

    # Relacja z drużyną gospodarzy
    team_1_id = Column(Integer, ForeignKey("teams.id"))
    team_1 = relationship("Team", foreign_keys=[team_1_id], back_populates="matches_as_home")

    # Relacja z drużyną gości
    team_2_id = Column(Integer, ForeignKey("teams.id"))
    team_2 = relationship("Team", foreign_keys=[team_2_id], back_populates="matches_as_guest")