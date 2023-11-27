import os
from PyPDF2 import PdfReader, PdfWriter
from utils.llm import vertex_json
from utils.manas import process_single_pdfs

# def adjust_page_ranges(page_ranges, reference_page):
#     adjusted_ranges = [[start + reference_page, end + reference_page] for start, end in page_ranges]
#     print("adjusted_ranges:", adjusted_ranges)
#     return adjusted_ranges

def create_new_pdf(doc, adjusted_ranges, new_file_path):
    new_doc = PdfWriter()
    
    total_pages = len(doc.pages)
    
    for start, end in adjusted_ranges:
        for page_num in range(start, end + 1):  # Include the end page
            if 0 <= page_num < total_pages:  # Check if the page number is within bounds
                new_doc.add_page(doc.pages[page_num])
            else:
                print(f"Page {page_num} does not exist in the PDF. Skipping...")
    with open(new_file_path, "wb") as new_pdf_file:
        new_doc.write(new_pdf_file)

    return new_file_path


def analyse_the_pdf(path):
    # open the pdf
    print("ME hu jiyaaaaaaaaaaaaaaaaaaaaaaaaaaaaan",path)
    with open(path, "rb") as pdf_file:
        doc = PdfReader(pdf_file)
        
        # Identify the reference page (contents page + 1)
        toc_page_number = None
        for i, page in enumerate(doc.pages):
            page_text = page.extract_text()
            if "TABLE OF CONTENTS" in page_text or "CONTENTS" in page_text:
                toc_page_number = i + 1  # Contents page number
                print("toc_page_number:", toc_page_number)
                break
        
        # if the contents page is not found, return
        if toc_page_number is None:
            return None
        
        reference_page_number = toc_page_number 
        
        # get the text of the page
        toc_page_text = doc.pages[toc_page_number - 1].extract_text()
        print(toc_page_text)
        input_sections = vertex_json(toc_page_text)

        save_folder = "splitted_docs"
        if os.path.exists(save_folder):
            for item in os.listdir(save_folder):
                item_path = os.path.join(save_folder, item)
                if os.path.isfile(item_path):
                    os.remove(item_path)
                elif os.path.isdir(item_path):
                    os.rmdir(item_path)

        # Recreate the save_folder
        os.makedirs(save_folder, exist_ok=True)  
        

        page_ranges = []
        ans = {}
        for section, pages in input_sections.items():
            page_ranges.extend(pages)
            new_file_path = os.path.join(save_folder, f'{section}.pdf')
        

            page_ranges = [pages[i:i + 2] for i in range(0, len(pages), 2)]
            print(page_ranges)
        

            # adjusted_ranges = adjust_page_ranges(page_ranges, reference_page_number)
        
        
            
        # Create a new PDF with adjusted page ranges
            # file_name = create_new_pdf(doc, adjusted_ranges, new_file_path)

            file_name = create_new_pdf(doc, page_ranges, new_file_path)
            
            print("New PDF created with file name:", file_name)
            section_item = process_single_pdfs(file_name)
            print(section_item)
            ans[section] = section_item
        
        print("New PDF created:", new_file_path)
        print("Hi, I am being called from ml_analysis.py")
        print("This is the path:", path)
        print(ans)
        return ans
        
        

