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
    gender = Column(SQLEnum(SexEnum))

    # Relationship with team
    team_id  = Column(Integer, ForeignKey("teams.id"))
    team = relationship("Team", back_populates="players")

    # Relationship with actions
    actions = relationship("Action", back_populates="players")
