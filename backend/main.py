from fastapi import Depends, FastAPI, HTTPException, BackgroundTasks, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm

from models.model import DailyRevenueForecast, Wastage, Sentiments, ProductQuantityForecast, User, UserInDB
from models.ml_model_regression import save_model_to_db, load_saved_model_from_db
from authentication import get_db_names, get_db_users, client
from api_weather import get_weather

from dbs.db_forecast_revenue import fetch_latest_forecast_revenues
from dbs.db_wastage import fetch_all_wastage, fetch_date_range_wastage
from dbs.db_sentiments import fetch_all_sentiments, fecth_by_range_sentiments
from dbs.db_revenue import fetch_all_revenue, fecth_by_range_revenue
from dbs.db_forecast_productquantity import fetch_latest_forecast_quantity

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

# APIs

#-------------------------------------------#
# authentication


@app.get('/api/get-dbs')
async def get_dbs():
    response = get_db_names()
    if response:
        return response
    raise HTTPException(400, f"Something went wrong")

# @app.post('/api/selected-db')
# async def selectedDB(db: str, background_tasks: BackgroundTasks):
#     response = get_db_names()
#     if db in response:
#         background_tasks.add_task(get_db_users(db))
#         return db
#     raise HTTPException(400, f"Something went wrong")


@app.get('/api/get-users')
async def get_users(db):
    response = get_db_users(db)
    if response:
        return response
    raise HTTPException(400, f"Something went wrong")


@app.post("/token")
async def login(db: str, form_data: OAuth2PasswordRequestForm = Depends()):
    mydb = client[db]
    mycol = mydb["users"]
    cursor = mycol.find({}, {'_id': 0})
    users = list(cursor)

    usernames = []

    for u in users:
        usernames.append(u.get('username'))

    user_dict = next((u for u in users if u['username'] == form_data.username), {})
    if not user_dict:
        raise HTTPException(status_code=400)
    user = UserInDB(**user_dict)
    hashed_password = "fakehashed" + form_data.password
    if not hashed_password == user.password:
        raise HTTPException(status_code=400,detail="Incorrect username or password")

    return {"access_token": user.username, "token_type": "bearer"}


def get_user(db, username: str):
    if username in db:
        user_dict = db[username]
        return UserInDB(**user_dict)


def fake_decode_token(db, token):
    mydb = client[db]
    mycol = mydb["users"]
    cursor = mycol.find({}, {'_id': 0})
    users = list(cursor)
    user = get_user(users, token)
    return user


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


async def get_current_user(db, token: str = Depends(oauth2_scheme)):
    user = fake_decode_token(db, token)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.get("/users/me")
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user

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

#-------------------------------------------#
# product quantity


@app.get("/api/quantity_forecast")
async def get_quantity_forecast():
    response = await fetch_latest_forecast_quantity()
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
