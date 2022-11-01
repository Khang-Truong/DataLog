import requests
from tkinter import *
import math
from model import WeatherForecast

def get_weather():
    city_name = "Vancouver,CA"
    api_key = '26e3ab58c982deb6571267759cd689e1'
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={api_key}"
     
    response = requests.get(url).json()["list"]
    
    #getting only one weather info per day
    response_list = []

    for x in range(3,40,8):
        response_raw = response[x]["main"]
        response_raw["dt_txt"] = response[x]["dt_txt"][0:10]
        #converting temperature from kelvin to celsius
        response_raw["temp"] = response_raw["temp"] - 273.15
        response_raw["temp_min"] = response_raw["temp_min"] - 273.15
        response_raw["temp_max"] = response_raw["temp_max"] - 273.15
        response_list.append(WeatherForecast(**response_raw))

    return response_list

    
