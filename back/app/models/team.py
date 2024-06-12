from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class Team(Base):
    __tablename__ = "teams"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    players = relationship("Player", back_populates="team")
    matches_played = Column(Integer)
    statics = relationship("Player", viewonly=True)

    # Relacja z meczami jako drużyna gospodarzy
    matches_as_home = relationship("Match", foreign_keys="Match.team_1_id", back_populates="team_1")

    # Relacja z meczami jako drużyna gości
    matches_as_guest = relationship("Match", foreign_keys="Match.team_2_id", back_populates="team_2")

    # Relacja z ligą
    league_id = Column(Integer, ForeignKey("leagues.id"))
    league = relationship("League", back_populates="teams")

    # Relacja do twórcy drużyny
    creator = relationship("User", back_populates="team", uselist=False)
    creator_id = Column(Integer, ForeignKey("users.id"))
