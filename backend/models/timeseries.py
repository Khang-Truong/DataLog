from pydantic import BaseModel
from prophet import Prophet

class TimeSeries(BaseModel):
    title: str
    description: str