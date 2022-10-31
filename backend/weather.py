import requests
from tkinter import *
import math



def get_weather():
    city_name = "Vancouver,CA"
    api_key = '26e3ab58c982deb6571267759cd689e1'
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city_name}&appid={api_key}"
    
    response = requests.get(url).json()
    
    
    
    return response
    
