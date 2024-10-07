from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from app.association_tables import team_tournament


class Tournament(Base):
    __tablename__ = "tournaments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True)
    amount_of_teams = Column(Integer)

    #Many-to-many relationship with teams
    teams = relationship("Team", secondary=team_tournament, back_populates="tournaments")
    team_id = Column(Integer, ForeignKey("teams.id"))
    