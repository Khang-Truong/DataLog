from fastapi import Depends, FastAPI, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from jose import jwt, JWTError

from models.model import DailyRevenueForecast, Wastage, Sentiments, ProductQuantityForecast, User, UserInDB, Token, TokenData
from models.ml_model_regression import save_model_to_db, load_saved_model_from_db
from authentication import get_db_names, create_access_token, ACCESS_TOKEN_EXPIRE_MINUTES, SECRET_KEY, ALGORITHM, client, oauth2_scheme, pwd_context
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

@app.get('/api/get-users')
async def get_users(db):
    response = get_db_users(db)
    if response:
        return response
    raise HTTPException(400, f"Something went wrong")


@app.post("/token", response_model=Token)
async def login_for_access_token(db: str, form_data: OAuth2PasswordRequestForm = Depends()):
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
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


async def get_current_user(db:str, token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception

    mydb = client[db]
    mycol = mydb["users"]
    cursor = mycol.find({}, {'_id': 0})
    users = list(cursor)
    
    user_found = next((u for u in users if u['username'] == token_data.username), {})

    if token_data.username in user_found.get('username'):
        user_dict = user_found
        user = UserInDB(**user_dict)
    else:
        raise credentials_exception
    return user


async def get_current_active_user(current_user: User = Depends(get_current_user)):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user


@app.get("/users/me/", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user


@app.get("/users/me/items/")
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
