import requests

url = 'https://app.nanonets.com/api/v2/OCR/Model/b09dc93e-f125-4f44-a73b-6846ba2710a2/LabelFile/?async=false'

data = {'file': open('splitted_docs/PROMOTER_GROUP.pdf', 'rb')}

response = requests.post(url, auth=requests.auth.HTTPBasicAuth('a052626c-446f-11ee-b81c-4227fda8d5d8', ''), files=data)

print(response.json())