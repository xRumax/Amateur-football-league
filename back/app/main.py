from fastapi import FastAPI
from app.database import Base, engine
from app.routes import user, player, team, match, tournament, action, tournament_table
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(user.router) 
app.include_router(player.router)
app.include_router(team.router)
app.include_router(match.router)
app.include_router(action.router)
app.include_router(tournament.router)
app.include_router(tournament_table.router)

origins = [
    "http://localhost:4200",  # Angular app
    "http://127.0.0.1:4200",  # Angular app
    "http://localhost:50662",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


