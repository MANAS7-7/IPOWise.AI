from utils.google_search import search_ipo
from utils.site_scraper import ipo_details

def analyze_selected_ipo(ipo_name, ipo_link):
    print("Analyzing IPO: ", ipo_name)
    print("Link: ", ipo_link) 

    ans = ipo_details(ipo_link)
    search_ipo(ipo_name)
    return ans