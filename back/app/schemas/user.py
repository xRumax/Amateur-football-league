from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.team import Team
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

class User(BaseModel):
    id: int
    username: str
    email: str
    password: str
    team: Optional[Team] = None
    is_superuser: bool

    class Config:
        from_attribues = True
