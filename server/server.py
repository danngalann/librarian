from fastapi import FastAPI
from pydantic import BaseModel

from ai.chat import answer

class PredictionRequest(BaseModel):
    sentence: str


app = FastAPI()

@app.post("/predict")
def read_item(request: PredictionRequest):
    return answer(request.sentence)