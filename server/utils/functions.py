
# pip install tabula-py
import tabula
import camelot
import pdftables_api
import pandas as pd

pdfTables = pdftables_api.Client("jb5feswb5xwi")


def make_fin_tables(path):
    pdf_path = path
    pdf_list = []
    
    size_of_pdf = len(tabula.read_pdf(pdf_path, stream=True, pages="all"))
    
    for pages in range(1, size_of_pdf + 1):
        try:
            dfs = tabula.read_pdf(pdf_path, stream=True, pages=pages)
            if dfs:
                pdf_list.append(dfs[0])
        except IndexError:  # Catch the specific exception
            print(f"Skipping page {pages} - Page not found.")
            continue
    
    print(f"--------------------------The type is -------------------------------------------------------{type(pdf_list)}")
    # print(pdf_list)
    df = [pdf_list[i] for i in range(len(pdf_list)) if len(pdf_list[i]) > 0]

    return df


def make_tables(path):

    # pdfTables.xlsx(path, 'output.xlsx') 
    # #read the excel file
    # df = pd.read_excel('output.xlsx')
    # print(df)
    # return df


    pdf_path = path #r"C:\Users\hrida\Desktop\Split PDF\Financial_Information.pdf"
    pdf_list=[]
    size_of_pdf = len(tabula.read_pdf(pdf_path, stream=True, pages="all"))
    for pages in range(1, size_of_pdf+1):
        try:
            dfs = tabula.read_pdf(pdf_path, stream=True, pages=pages)
            pdf_list.append(dfs[0])
        except:
            continue
    print(f"--------------------------The type is -------------------------------------------------------{type(pdf_list)}")
    print(pdf_list)
    return pdf_list
    


def get_index(pdf_list, cols_to_find1,cols_to_find2, cols_to_find3):
    for i in range(len(pdf_list)):
        for x in list(pdf_list[i].columns):
            if cols_to_find1 in x.lower() or cols_to_find2 in x.lower() or cols_to_find3 in x.lower() :
                return i

def make_df(pdf_list, *keywords):    
    columns=[]
    for cols in list(pdf_list[get_index(pdf_list, *keywords)].columns):
    #     if "Name" in cols:
    #         columns.append(cols)
    #     if "Percent" in cols or "%" in cols:
    #         columns.append(cols)
    #     result_df = pdf_list[get_index(pdf_list, cols_to_find1, cols_to_find2, cols_to_find3)][columns]
    #     result_df.dropna(inplace=True)
    # return result_df
        if "Name" in cols:
            columns.append(cols)
        if any(keyword in cols for keyword in keywords):
            columns.append(cols)
        result_df = pdf_list[get_index(pdf_list, *keywords)][columns]
        result_df.dropna(inplace=True)
    return result_df
        
        
#dataframe(pdf_list, "percent")

def find_cols(target, pdf_list):
    r=[]
    for i in range(len(pdf_list)):
        df=pdf_list[i]
        result = df[df.applymap(lambda cell: target in str(cell).lower()).any(axis=1)]
        r.append(result)
    a=[r[i] for i in range(len(r)) if len(r[i])>0]
    return a


def worst_index(pdf_list):
        for i in range(len(pdf_list)):
            if len(pdf_list[i]) >0:
                for x in list(pdf_list[i].columns):
                    if "name" in x.lower() or "person" in x.lower():
                        # print(i)
                        return i

def worst_df(pdf_list):
    return pdf_list[worst_index(pdf_list)]


#r=find_cols("profit aft", pdf_list)[0] 


# Sure, I can help you modify the code to incorporate the dynamic selection of extraction parameters using the LLM (Language Model). Here's how you can implement this:

# 1. Define a function to find extraction parameters using the LLM. This function will take the PDF content as input and return a dictionary of parameters (e.g., keywords, columns) based on the LLM's response.

# ```python
# def find_extraction_params(pdf_content):
#     # Use the LLM to find extraction parameters based on the PDF content
#     # Return a dictionary of parameters, e.g. {"keyword": "percent", "column": "Percent"}
#     # You can interact with the LLM using its capabilities to analyze the content and generate parameters
#     params = {
#         "keyword": "percent",
#         "column": "Percent"
#     }
#     return params
# ```

# 2. Modify your extraction code to use the parameters obtained from the LLM:

# ```python
# elif path.endswith("PROMOTER_GROUP.pdf"):
#     print("Hi my name is", path)
#     pdf_list = make_tables(path)
#     extraction_params = find_extraction_params(pdf_content)  # Call the function to get parameters
#     try:
#         result_df = make_df(pdf_list, **extraction_params)
#     except:
#         # Handle the case where extraction fails
#         result_df = worst_index(pdf_list)
#     print(f"The result df is {result_df}")
# ```

# 3. Make sure to pass the PDF content to the `find_extraction_params` function. You can extract the content using the same approach you're using to extract text from the PDF.

# This way, you're dynamically obtaining extraction parameters based on the content of the PDF by leveraging the LLM's capabilities. This makes your code more adaptable to variations in keywords or columns across different PDFs. Just ensure that the `find_extraction_params` function interacts with the LLM correctly to get relevant parameters.