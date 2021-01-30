#!/usr/bin/python3

import random
import time
import requests
import urllib3
import warnings
warnings.simplefilter('ignore', urllib3.exceptions.SecurityWarning)

print("Make sure that the required certificate files are available or use the readme in the helm_with_istio folder to generate them")
start_time = time.time()
LOOP_EVERY = 0.01  # decrease for more requests 
REQ_RATE = 0.33  # increase for more requests
API_RATE = 0.8  # increase for more requests directly to api instead of home page
HOME_URL = 'https://10.50.100.5/'
API_URL = 'https://10.50.100.5/api/inventory/books'
while True:
    time.sleep(LOOP_EVERY - ((time.time() - start_time) % LOOP_EVERY))  # trying to execute loop every LOOP_EVERY seconds
    if random.random() < REQ_RATE: 
        dest = API_URL if random.random() < API_RATE else HOME_URL
        r = requests.get(dest, cert=('./inventory-app.example.com.crt', './inventory-app.example.com.key'), verify='./example.com.crt')
        print(dest)
