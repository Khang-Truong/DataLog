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
        response_raw["dt_txt"] = response[x]["dt_txt"]
        response_list.append(WeatherForecast(**response_raw))

    return response_list

    
