import os
from datetime import datetime, timedelta
from fastapi import FastAPI, File, Form, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

# importing files from utils folder


from utils.google_search import google_search_new
from utils.site_scraper import fetch_all_ipo
from utils.analyze_selected_ipo import analyze_selected_ipo
from utils.ml_analysis import analyse_the_pdf


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

list_of_ipo = {}
last_fetch_time = None
cache_duration = timedelta(hours=24)


def search(query):
    return google_search_new(query)

def fetch_ipo_data():
    global last_fetch_time, list_of_ipo
    
    current_time = datetime.now()
    
    # Check if data is cached and cache duration has not expired
    if list_of_ipo and last_fetch_time and (current_time - last_fetch_time) <= cache_duration:
        return
    
    url = "https://ipowatch.in/upcoming-ipo-calendar-ipo-list/"
    list_of_ipo = fetch_all_ipo(url)  # fetches all IPOs from the site
    last_fetch_time = current_time

@app.get("/getIPO")
def get_ipo():
    fetch_ipo_data()
    return JSONResponse(content=list_of_ipo)

@app.post("/processIPO")
async def process_ipo(data: dict):
    # global file_path
    fetch_ipo_data()
    index = data['IPOIndex']
    keys_list = list(list_of_ipo.keys())  # Get a list of keys
    values_list = list(list_of_ipo.values())  # Get a list of values
    items_list = list(list_of_ipo.items())  # Get a list of key-value pairs
    analyzed_data = analyze_selected_ipo(keys_list[index], values_list[index])
    print(analyzed_data)
    return JSONResponse(content=analyzed_data)

@app.get("/analyseIPO")
async def analyse_ipo():
    our_dict = analyse_the_pdf("ipo_docs/ipo.pdf")
    return JSONResponse(content=our_dict)



if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

