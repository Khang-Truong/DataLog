# Pydantic allows auto creation of JSON Schemas from models
from pydantic import BaseModel

class Todo(BaseModel):
    title: str
    description: str


class DailyRevenueForecast(BaseModel):
    Date: str
    PredictedRevenue: int
    Flag_latest: str


#didn't really use, for noww
class Wastage(BaseModel):
    Category: str
    Product_Name: str
    Quantity: int
    Date: str

class Sentiments(BaseModel):
    Classification: str
    Date: str

class Revenue(BaseModel):
    ymd: str
    dailyRevenue: int
