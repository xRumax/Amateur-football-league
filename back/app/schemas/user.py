from pydantic import BaseModel, Field
from typing import Optional, List
from app.schemas.team import Team
from app.schemas.tournament import TournamentPlayerDisplay
class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    is_superuser: bool = Field(default=False)

class UserUpdate(UserBase):
    pass

class UserLogin(BaseModel):
    email: str
    password: str

class UserChangePassword(BaseModel):
    password: str
    new_password: str
    confirm_new_password: str

class User(BaseModel):
    id: int
    username: str
    email: str
    password: str
    team: Optional[Team] = None
    is_superuser: bool
    tournaments: Optional[List[TournamentPlayerDisplay]] = None

    class Config:
        from_attribues = True
