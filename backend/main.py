from fastapi import FastAPI, HTTPException

from model import Todo
from model import DailyRevenue
from model import Wastage
from model import Sentiments

from database import (
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    remove_todo,
)

#------------------------------------#

# for revenues
from revenuedb import(
    fetch_latest_revenues
)

#------------------------------------#

# for wastage
from wastagedb import(
    fetch_all_wastage,
    fetch_date_range_wastage
)

# for sentiments

from sentimentsdb import(
    fetch_all_sentiments,
    fecth_by_range_sentiments

)


# an HTTP-specific exception class  to generate exception information

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    "http://localhost:3000",
]

# what is a middleware? 
# software that acts as a bridge between an operating system or database and applications, especially on a network.

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

## APIs

#getting revenues
@app.get("/api/revenue")
async def get_revenue():
    response = await fetch_latest_revenues()
    return response

#-------------------------------------------#
#getting wastages

# all wastage
@app.get("/api/wastage")
async def get_wastage():
    response = await fetch_all_wastage()
    return response

#wastage by range
@app.get("/api/wastage/")
async def get_by_range_wastage(start_date: str ,end_date:str):
    response = await fetch_date_range_wastage(start_date,end_date)
    if response:
        return response
    raise HTTPException(404, f"There is no wastage from {start_date} and {end_date}")


#getting sentiments by count
# getting sentiments


@app.get("/api/sentiments")
async def get_sentiment():
    response = await fetch_all_sentiments()
    return response


@app.get("/api/sentiments/")
async def get_sentiment(start_date: str, end_date:str):
    response = await fecth_by_range_sentiments(start_date,end_date)
    if response:
        return response
    raise HTTPException(404, f"There is no sentiments from {start_date} and {end_date}")






#------this is for todos ---- #
@app.get("/")
async def read_root():
    return {"Hello": "World"}

@app.get("/api/todo")
async def get_todo():
    response = await fetch_all_todos()
    return response

@app.get("/api/todo/{title}", response_model=Todo)
async def get_todo_by_title(title):
    response = await fetch_one_todo(title)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {title}")

@app.post("/api/todo/", response_model=Todo)
async def post_todo(todo: Todo):
    response = await create_todo(todo.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")

@app.put("/api/todo/{title}/", response_model=Todo)
async def put_todo(title: str, desc: str):
    response = await update_todo(title, desc)
    if response:
        return response
    raise HTTPException(404, f"There is no todo with the title {title}")

@app.delete("/api/todo/{title}")
async def delete_todo(title):
    response = await remove_todo(title)
    if response:
        return "Successfully deleted todo"
    raise HTTPException(404, f"There is no todo with the title {title}")