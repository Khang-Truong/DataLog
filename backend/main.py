from fastapi import Depends, FastAPI, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta

from models.model import DailyRevenueForecast, Wastage, Sentiments, ProductQuantityForecast, User, UserInDB, Token
from models.ml_model_regression import save_model_to_db, load_saved_model_from_db
from authentication import get_db_names, create_access_token, get_current_active_user, ACCESS_TOKEN_EXPIRE_MINUTES, client, pwd_context
from api_weather import get_weather

from model import Todo
from model import DailyRevenueForecast
from model import Wastage
from model import Sentiments
from model import ProductQuantityForecast

from database import (
    fetch_one_todo,
    fetch_all_todos,
    create_todo,
    update_todo,
    remove_todo,
)

#------------------------------------#

# for revenues
from forecast_revenuedb import(
    fetch_latest_forecast_revenues
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

from revenuedb import(
    fetch_all_revenue,
    fecth_by_range_revenue
)

from forecast_productquantitydb import(
    fetch_latest_forecast_quantity
)
from weather import(
    get_weather
)

from model_test import(
    save_model_to_db,
     load_saved_model_from_db

)


# an HTTP-specific exception class  to generate exception information
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()

origins = [
    "http://localhost:3000",
    'hhtp://localhost'
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

# APIs

#-------------------------------------------#
# authentication


@app.get('/api/get-dbs')
async def get_dbs():
    response = get_db_names()
    if response:
        return response
    raise HTTPException(400, f"Something went wrong")


@app.post('/token', response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    db = form_data.client_id
    mydb = client[db]
    mycol = mydb["users"]
    cursor = mycol.find({}, {'_id': 0})
    users = list(cursor)
    
    user_found = next((u for u in users if u['username'] == form_data.username), {})

    if form_data.username in user_found.get('username'):
        user_dict = user_found
        user = UserInDB(**user_dict)
    else:
       raise HTTPException(status_code=400,detail="Incorrect username") 

    if pwd_context.verify(form_data.password, user.password):
        user
    else:
        raise HTTPException(status_code=400,detail="Incorrect password")

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={'username': user.username, 'db':user.db}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/api/users/me/items/")
async def read_own_items(current_user: User = Depends(get_current_active_user)):
    return [{"item_id": "Foo", "owner": current_user.username}]



#-------------------------------------------#
# getting wastages

# all wastage


@app.get("/api/wastage")
async def get_wastage():
    response = await fetch_all_wastage()
    return response

# wastage by range


@app.get("/api/wastage/")
async def get_by_range_wastage(start_date: str, end_date: str):
    response = await fetch_date_range_wastage(start_date, end_date)
    if response:
        return response
    raise HTTPException(
        404, f"There is no wastage from {start_date} and {end_date}")

#-------------------------------------------#
# getting sentiments by count
# getting sentiments


@app.get("/api/sentiments")
async def get_sentiment():
    response = await fetch_all_sentiments()
    return response


@app.get("/api/sentiments/")
async def get_sentiment_by_range(start_date: str, end_date: str):
    response = await fecth_by_range_sentiments(start_date, end_date)
    if response:
        return response
    raise HTTPException(
        404, f"There is no sentiments from {start_date} and {end_date}")

#inserting sentiments


@app.post("/api/insert_sentiments/", response_model=Sentiments)
async def post_todo(sentiments: Sentiments):
    response = await create_todo(sentiments.dict())
    if response:
        return response
    raise HTTPException(400, "Something went wrong")


#-------------------------------------------#
# revenue


@app.get("/api/revenues")
async def get_revenues():
    response = await fetch_all_revenue()
    return response


@app.get("/api/revenues/")
async def get_revenue_by_range(start_date: str, end_date: str):
    response = await fecth_by_range_revenue(start_date, end_date)
    if response:
        return response
    raise HTTPException(
        404, f"There is no revenues from {start_date} and {end_date}")


@app.get("/api/quantity_forecast")
async def get_quantity_forecast():
    response = await  fetch_latest_forecast_quantity()
    return response


#-------------------------------------------#
# weather api

@app.get("/api/forecasted_weather")
def get_weather_forecast():
    response = get_weather()
    return response

#-------------------------------------------#
# model api


@app.get("/api/model_regression")
async def put_model():
    response = save_model_to_db()
    if response:
        return response
    raise HTTPException(400, f"Something went wrong")

@app.get("/api/model_regression_result")
async def put_model():
    response = load_saved_model_from_db(get_weather())
    if response:
        return response
    raise HTTPException(400, f"Something went wrong")







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