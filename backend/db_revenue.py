from sqlite3 import Cursor
from typing import Collection
import motor.motor_asyncio
from model import Revenue

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://DataLog:DataLog@cluster0.jzr1zc7.mongodb.net/test')
database = client.DataLog
collection = database.Revenue


#fetch all revenues
async def fetch_all_revenue():
    sentiments = []
    # cursor = collection.find({})
    cursor = collection.find({'ymd': { "$gte": "2019-01-01", "$lte": "2019-01-31"}}) 
    async for document in cursor:
        sentiments.append(Revenue(**document))
    return sentiments

#detch revenue by range
async def fecth_by_range_revenue(start_date,end_date):
    revenues = []
    cursor = collection.find({'ymd': { "$gte": start_date, "$lte":  end_date}}) 
    async for document in cursor:
        revenues.append(Revenue(**document))
    return revenues


   
