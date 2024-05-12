from pydantic import BaseModel, Field

class UserBase(BaseModel):
    username: str
    email: str

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    is_superuser: bool = Field(default=False)

class UserUpdate(UserCreate):
    password :str

class User(BaseModel):
    id: int
    username: str
    email: str
    password: str
    is_player: bool

    class Config:
        from_attribues = True