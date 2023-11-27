from utils.llm import summarise_pdf, df_to_json, read_pdf
from utils.functions import get_index, make_df, find_cols, make_tables, worst_df, worst_index, make_fin_tables



def process_single_pdfs(path):

    if(path == "splitted_docs/RISK_FACTORS.pdf" or path == "splitted_docs\RISK_FACTORS.pdf"):
        return summarise_pdf(path, "risk factors")

    elif(path == "splitted_docs/ABOUT_THE_COMPANY.pdf" or path == "splitted_docs\ABOUT_THE_COMPANY.pdf" or path == "splitted_docs/OUR_BUSINESS.pdf" or path == "splitted_docs\OUR_BUSINESS.pdf" ):
        return summarise_pdf(path, "about the company or our business")

    elif(path == "splitted_docs/FINANCIAL_STATEMENTS.pdf" or path == "splitted_docs\FINANCIAL_STATEMENTS.pdf" or path == "splitted_docs/FINANCIAL_INFORMATION.pdf" or path == "splitted_docs\FINANCIAL_INFORMATION.pdf"):
        print("Hi my name is", path)
        response = read_pdf(path)
        return response
        # pdf_list = make_fin_tables(path)
        # try:
        #     df_pat = find_cols("profit aft", pdf_list)[0]
        # except: 
        #     df_pat = find_cols("profit aft", pdf_list)
        # try:
        #     df_assets = find_cols("total asse", pdf_list)[0]
        # except:
        #     df_assets = find_cols("total asse", pdf_list)
        # try:
        #     df_liabilities = find_cols("liabiliti", pdf_list)[0]
        # except: 
        #     df_liabilities = find_cols("liabiliti", pdf_list)
        # try:
        #     df_income = find_cols("total inc", pdf_list)[0]
        # except: 
        #     df_income = find_cols("total inc", pdf_list)
        # try:
        #     df_expense = find_cols("total exp", pdf_list)[0]
        # except:
        #     df_expense = find_cols("total exp", pdf_list)
            #df_cashFlow = find_cols("cash fl", pdf_list)[0]
            #df_retainedEarnings = find_cols("retained e", pdf_list)[0]
            #print(f"DF PAT IS {df_pat}")
            # print(f"df income IS {df_income}")
            # string_df_1 = str(df_income)
            # print(string_df_1)
            # response = df_to_json(string_df_1)
            # return response

    elif(path == "splitted_docs/PROMOTER_GROUP.pdf" or path == "splitted_docs\PROMOTER_GROUP.pdf"):
        print("Hi my name is", path)



        response = read_pdf(path)
        return response




        pdf_list = make_tables(path)
        print(pdf_list[0])
        #go through finding the percentages and names of the promoters
        # suggested_keywords = find_extraction_params(pdf_list)
        try: 
            result_df = worst_df(pdf_list)
            # result_df = make_df(pdf_list, "percent", "Percentage", "%")
        except:
            print("ABCDEFGHIGKLMNOPQRSTUVWXYZ")
            #worst case scenario, try getting the name and designation of the promoters
        print(f"---------################################--------------------------The result df is ---------------######################################{result_df}")
        string_df = str(result_df)
        print(string_df)
        response = df_to_json(string_df)
        return response




    elif(path == "splitted_docs/OBJECTS_OF_THE_OFFER.pdf" or path == "splitted_docs\OBJECTS_OF_THE_OFFER.pdf"):
        print("Hi my name is", path)

        response = read_pdf(path)
        return response

    # splitted_docs\ABOUT_THE_COMPANY.pdf
    # splitted_docs\FINANCIAL_STATEMENTS.pdf
    # splitted_docs\PROMOTER_GROUP.pdf
    # splitted_docs\OBJECTS_OF_THE_OFFER.pdf

    print("Processing single pdfs", path)
