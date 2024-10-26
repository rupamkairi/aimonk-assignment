import os
from typing import Union
from fastapi import FastAPI
from dotenv import load_dotenv
from sqlalchemy import Text, Integer
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import create_engine
from sqlalchemy.orm import Session
from sqlalchemy import select, update, insert
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


load_dotenv()
url = os.getenv("TURSO_DATABASE_URL")
auth_token = os.getenv("TURSO_AUTH_TOKEN")


class Base(DeclarativeBase):
    pass

class Tree_Elements(Base):
    __tablename__ = "tree_elements"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    parentId: Mapped[int] = mapped_column(Integer, nullable=True)
    name: Mapped[str] = mapped_column(Text)
    data: Mapped[str] = mapped_column(Text)
    def __repr__(self) -> str:
        return f"Item(id={self.id!r}, parentId={self.parentId!r}, name={self.name!r}, data={self.data!r})"

dbUrl = f"sqlite+{url}/?authToken={auth_token}&secure=true"
engine = create_engine(dbUrl, connect_args={'check_same_thread': False}, echo=True)


app = FastAPI()
origins = [
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/tree")
async def read_all_tree():
    session = Session(engine)
    stmt = select(Tree_Elements)
    items = session.scalars(stmt)
    return {"tree": items.all()} 

class PostTree(BaseModel):
    name: str
    data: str
    parentId: int

@app.post("/api/tree")
async def create_tree(item: PostTree):
    print(item)
    session = Session(engine)
    stmt = insert(Tree_Elements).values(name=item.name, data=item.data, parentId=item.parentId)
    result = session.execute(stmt)
    session.commit()
    last_inserted_id = result.inserted_primary_key[0]
    return {"id": last_inserted_id}

class PatchTree(BaseModel):
    id: int
    name: str
    data: str

@app.patch("/api/tree")
async def update_tree(item: PatchTree):
    print("Item", item)
    session = Session(engine)
    stmt = update(Tree_Elements).where(Tree_Elements.id == item.id).values(name=item.name, data=item.data)
    session.execute(stmt)
    session.commit()
    return {}


