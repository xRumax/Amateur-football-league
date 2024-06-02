from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base
from sqlalchemy.orm import relationship

class MatchStatistics(Base):
    __tablename__ = "matchstatistics"

    id = Column(Integer, primary_key=True, index=True)
    home_shots = Column(Integer)
    home_shots_on_target = Column(Integer)
    home_possession = Column(Integer)
    home_passes = Column(Integer)
    home_pass_accuarcy = Column(Integer)
    home_fouls = Column(Integer)
    home_yellow_cards = Column(Integer)
    home_red_cards = Column(Integer)
    home_offsides = Column(Integer)
    home_corners = Column(Integer)

    # Statystyki dla drugiej drużyny
    away_shots = Column(Integer)
    away_shots_on_target = Column(Integer)
    away_possession = Column(Integer)
    away_passes = Column(Integer)
    away_pass_accuarcy = Column(Integer)
    away_fouls = Column(Integer)
    away_yellow_cards = Column(Integer)
    away_red_cards = Column(Integer)
    away_offsides = Column(Integer)
    away_corners = Column(Integer)

    match_id = Column(Integer, ForeignKey("matches.id"))
    match = relationship("Match", back_populates="match_statistics", uselist=False)