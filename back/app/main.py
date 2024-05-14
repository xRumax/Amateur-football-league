from fastapi import FastAPI
from app.database import Base, engine
from app.routes import user, player, team, match, league
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user.router) 
app.include_router(player.router)
app.include_router(team.router)
app.include_router(match.router)
app.include_router(league.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


