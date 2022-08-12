from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

class PredictionRequest(BaseModel):
    sentence: str


app = FastAPI()

@app.post("/predict")
def read_item(request: PredictionRequest):
    return request