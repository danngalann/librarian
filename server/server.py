from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

from ai.chat import answer

class PredictionRequest(BaseModel):
    sentence: str


app = FastAPI()
origins = [
    os.getenv("FRONTEND_URL"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict")
def read_item(request: PredictionRequest):
    return answer(request.sentence)