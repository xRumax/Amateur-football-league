from pydantic import BaseModel, Field

class PlayerBase(BaseModel):
    name: str

class PlayerCreate(PlayerBase):
    team_id: int = Field(default=None)

class PlayerUpdate(PlayerBase):
    team_id: int = Field(default=None)

class Player(BaseModel):
    id: int
    name: str
    team_id: int

    class Config:
        from_attributes = True