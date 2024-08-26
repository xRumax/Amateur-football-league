from sqlalchemy import Column, Integer, String, ForeignKey, Date
from sqlalchemy.orm import relationship
from sqlalchemy import Enum as SQLEnum
from enum import Enum
from app.database import Base

class SexEnum(Enum):
    Male = "Male"
    Female = "Female"
class Player(Base):
    __tablename__ = "players"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    last_name = Column(String)
    date_of_birth = Column(Date)
    sex = Column(SQLEnum(SexEnum))

    # Statics
    num_of_goals = Column(Integer)
    num_of_assists = Column(Integer)
    num_of_yellow_cards = Column(Integer)
    num_of_red_cards = Column(Integer)
    num_of_matches_played = Column(Integer)
    minutes_played = Column(Integer)

    # Relationship with team
    team_id  = Column(Integer, ForeignKey("teams.id"))
    team = relationship("Team", back_populates="players")
