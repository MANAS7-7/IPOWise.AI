import os
from bs4 import BeautifulSoup
import requests
from utils.ml_analysis import analyse_the_pdf


def get_site_data(url):
    print("This is URL: " + url)


# id = menu-1-39ad960
def fetch_all_ipo(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    list = soup.find(id="menu-1-39ad960")
    list_of_ipo = list.find_all("li")
    only_ipo = {}
    for ipo in list_of_ipo:
        only_ipo[ipo.text] = ipo.find("a")["href"]
    return only_ipo

def get_pdf(url):
    print("This is URL where i will get the pdf: " + url)
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    if(soup.find(class_="cover") is None):
        print("No pdf found")
        return
    list = soup.find(class_="cover")
    iframe = list.find("iframe")    
    print(iframe["src"])
    pdf_url = iframe["src"]
    file_start = pdf_url.index("file=") + len("file=")
    ipo_file_url = pdf_url[file_start:]
    if not ipo_file_url.startswith("https://www.sebi.gov.in"):
        final_url = "https://www.sebi.gov.in" + ipo_file_url
        print(final_url)
        download_pdf(final_url)
    else:
        print(ipo_file_url)
        download_pdf(ipo_file_url)

def download_pdf(url):
    save_folder = "ipo_docs"
    if not os.path.exists(save_folder):
        os.makedirs(save_folder)
    response = requests.get(url)
    if response.status_code == 200:
        save_path = os.path.join(save_folder, 'ipo.pdf')
        with open(save_path, "wb") as f:
            f.write(response.content)
        print(f"File saved at {save_path}")
    else:
        print("Failed to download the file.")
    # analyse_the_pdf(save_path)
    # return save_path
    
    
# a function to send details of an IPO
def ipo_details(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    if(soup.find(class_="wp-block-table") is None):
        print("No pdf found")
        return
    table = soup.find(class_="wp-block-table")
    rows = table.find_all("tr")
    
    details = {}
    for row in rows:
        cells = row.find_all("td")
        if len(cells) == 2:
            key = cells[0].text.strip()
            value = cells[1].strong.text.strip()
            
            # Add only the specific details you're interested in
            if key in ["IPO Open:","IPO Close:","IPO Size:","IPO Price Band:", "IPO Listing on:"]:
                details[key] = value
    
    print(details)
    return details
    # return save_path
    
    
