
import openai
import vertexai
from vertexai.language_models import TextGenerationModel
import json
from PyPDF2 import PdfReader, PdfWriter
import re
import os
from dotenv import load_dotenv

# initializing the environment for Vertex AI
load_dotenv()

os.environ['OPENAI_API'] = os.getenv('OPEN_AI_API')
# Add your own OpenAI API key
openai.api_key = os.environ['OPENAI_API']

vertexai.init(project="lossperepoch-niv-hackathon", location="us-central1")
parameters = {
    "max_output_tokens": 256,
    "temperature": 0.2,
    "top_p": 0.8,
    "top_k": 40
}

# loading the model

model = TextGenerationModel.from_pretrained("text-bison@001")
object = {}

def call_openai_api(text):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {"role": "system", "content": "You are a smart financial analyst. Who understands finance and IPO's. You are given a task to analyse the following text and make it more professional and organised."},
            {"role": "user", "content": f"Please make the following text more professional and organised, improvise if possible at required places, preferably keep it in points. Try displaying numerical data as well. Please respond in markdown format\n\n: {text}."},
        ],
        max_tokens=5000,
        n=1,
        stop=None,
        temperature=0.5,
    )
    return response.choices[0]['message']['content'].strip()


def vertex_json(toc_text):
    prompt_1 = """
    You are provided with a text containing various sections related to an Initial Public Offering (IPO) document. Each section is denoted by a title and may start with different content. Your task is to identify and extract the very important sections that are crucial for in-depth analysis of an IPO. These very important sections are directly related to critical aspects such as financials statements or financial information, business operations, risk factors, our business, objects of the offer/objects of the issue, job promoters. Please include almost all of them if present in the input text.

Your goal is to generate a JSON output that maps the very important sections in the given text with their starting and ending positions. You should not include the sub-topics within the sections in the JSON, as they are not required for this task. The JSON format should be as follows: {'SECTION_NAME': [start_position, end_position], ...}.

For example, consider the following text:
"""

    prompt_2 = """

From this text, you need to extract and identify the very important sections that are crucial for analyzing an IPO. These sections primarily cover essential information about the company's operations, financials, objects of the offer/objects of the issue (or something similar) and details about the IPO offering. Do not add legal sections. Strictly take Financial Information/Financial Statements as well as Promoter Growth.

Your task is to output a JSON structure containing the ranges of these very important sections based on the page numbers provided in the input. For instance:

Always follow this way of list_of_keys = ["RISK_FACTORS", "FINANCIAL_STATEMENTS", "OUR_BUSINESS", "OBJECTS_OF_THE_OFFER", "ABOUT_THE_COMPANY", "PROMOTER_GROUP", "FINANCIAL_INFORMATION"] . Do not add any other keys to this list.

Always keep the keys with such names, if and only if the contents are categorized under these names. Never change the keys.

example_response = {"RISK_FACTORS": [6, 7], "FINANCIAL_STATEMENTS": [8, 10], "OUR_BUSINESS": [11, 12],}

Please note that the page numbers are given directly in the input after several "........". You should use these page numbers directly and not perform any calculations.

Your response should consist of the JSON output that includes the ranges of the very important sections for IPO analysis. Ensure that the property names are in double quotes and the values are in square brackets.

"""
    response = model.predict(prompt_1 + toc_text + prompt_2, **parameters)
    print(response.text)
    json_response = json.loads(response.text)

    return json_response



def summarise_pdf(path, topic):
    doc = None  # Initialize doc variable

    prompt = f""" 
            Please extract the text from the PDF and summarize it in 10 Points. You are expected to be professional, organise your response to avoid terminated answers. You may use the following points as a guide to structure your response: Avoid sudden termination of your responses. Please respond in markdown format
            - 1)
            - 2)......

        """

    try:
        with open(path, "rb") as pdf_file:
            doc = PdfReader(pdf_file)

            doc_text = ""
            total_words = 0  # Initialize a variable to keep track of the total words
            page_num = 3  # Start from page 3
            for _, page in enumerate(doc.pages[3:]):
                page_text = page.extract_text()
                doc_text = doc_text + page_text + " "
            page_text = doc_text[1:16000]
                
            #print(page_text)
            response = model.predict(prompt + page_text, **parameters)

            # print(response.text)
            # return response.text
            ans = call_openai_api(response.text)
            return ans

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        if doc is not None:
            doc.stream.close()  # Make sure to close the file stream when done


def find_extraction_params(pdf_list):
    prompt = "Please analyze the PDF content and suggest the appropriate keywords or patterns to identify columns for extraction in the format:\n- First keyword\n- Second keyword\n- Third keyword"
    print(pdf_list)
    response = model.predict(prompt, **parameters)
    suggested_keywords = response.text.strip().split("\n")
    return suggested_keywords


def df_to_json(str):
    prompt = """

    I am giving a string of a dataframe. 

    Analyse it properly and give me a JSON response with the keys as the "Name".
   
    Your response should consist of the JSON response

    """

    response = model.predict(prompt + str, **parameters)
    print(response.text)
    # matches = re.findall(r'(*}', response.text)
    # print(matches)
    json_response = json.loads(response.text)
    return json_response
    # data = json.loads(response.text)
    # print(data)
    # return data


def read_pdf(path):

    if(path == "splitted_docs/PROMOTER_GROUP.pdf" or path == "splitted_docs\PROMOTER_GROUP.pdf"):

        prompt = """
    Kindly provide a well-organized extraction of the text data pertaining to the promoters' section. Focus on identifying any information that represents the promoters themselves and any accompanying details about their share ownership, especially if expressed as percentages. Your response is expected to maintain a professional and structured tone. If needed you may list out the data in points, along with their percentage shares. Please respond in markdown format.
"""

    elif(path == "splitted_docs/FINANCIAL_STATEMENTS.pdf" or path == "splitted_docs\FINANCIAL_STATEMENTS.pdf" or path == "splitted_docs/FINANCIAL_INFORMATION.pdf" or path == "splitted_docs\FINANCIAL_INFORMATION.pdf"):
        prompt = """
    Your response is expected to maintain a professional and structured tone. Please read the following text and return me the details of the portion where the total equity and liabilities is given. Details should be the data in percentage and short explanation. Please avoid sudden termination of your responses.

    Please provide numerical values(if possible) of all the following in markdown format, in the form of a table: 

    1. profit after tax in decimal values as at the end for the financial year ended March 31,2023
    2. total assets
    3. cash and cash equivalent
    4. Financial Indebtedness
    5. Total borrowings As at and for the Financial Year ended March 31, 2023
    """
        
    elif(path == "splitted_docs/OBJECTS_OF_THE_OFFER.pdf" or path == "splitted_docs\OBJECTS_OF_THE_OFFER.pdf"):
            prompt = """
            Extract and present the details related to the utilization of net proceeds. Specifically, I am interested in any information within the 'Objects of the Offer' section that discusses the utilization for 'General corporate purposes.' Kindly organize the extracted data in a structured format for better clarity. Please respond in markdown format
            """

    try:
        with open(path, "rb") as pdf_file:
            doc = PdfReader(pdf_file)

            doc_text = ""
            total_words = 0  # Initialize a variable to keep track of the total words
            page_num = 3  # Start from page 3
            for _, page in enumerate(doc.pages[3:]):
                page_text = page.extract_text()
                doc_text = doc_text + page_text + " "
            page_text = doc_text[1:16000]
                
            #print(page_text)
            response = model.predict(prompt + page_text, **parameters)

            # print(response.text)
            ans = call_openai_api(response.text)
            return ans

    except Exception as e:
        print(f"An error occurred: {e}")

    finally:
        if doc is not None:
            doc.stream.close()  # Make sure to close the file stream when done