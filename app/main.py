from fastapi import FastAPI
from app.database import Base, engine
from app.routes import user, player, team, match, league

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user.router) 
app.include_router(player.router)
app.include_router(team.router)
app.include_router(match.router)
app.include_router(league.router)