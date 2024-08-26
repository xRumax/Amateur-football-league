from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.database import Base

class League(Base):
    __tablename__ = "leagues"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String)
    rules = Column(String)

    # Relationship with teams in the league
    teams = relationship("Team", back_populates="league")
