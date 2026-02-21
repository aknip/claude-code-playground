import base64
import os
from mistralai import Mistral
from dotenv import load_dotenv


load_dotenv()
api_key = os.getenv('MISTRAL_API_KEY')

client = Mistral(api_key=api_key)

def encode_pdf(pdf_path):
    with open(pdf_path, "rb") as pdf_file:
        return base64.b64encode(pdf_file.read()).decode('utf-8')


pdf_path = "path-to-pdf.pdf"

base64_pdf = encode_pdf(pdf_path)

ocr_response = client.ocr.process(
    model="mistral-ocr-latest",
    document={
        "type": "document_url",
        "document_url": f"data:application/pdf;base64,{base64_pdf}"
    },
    table_format="markdown",  # or html
    extract_header=False,  # default is False
    extract_footer=False,  # default is False
    include_image_base64=True
)

# Concatenate all markdown from all pages
markdown_parts = []
for page in ocr_response.pages:
    if page.markdown:
        markdown_parts.append(page.markdown)

# Join with double newlines between pages
full_markdown = "\n\n".join(markdown_parts)

# Save to file
output_path = "mistral_ocr_result.md"
with open(output_path, "w", encoding="utf-8") as f:
    f.write(full_markdown)

print(f"Saved {len(ocr_response.pages)} pages to {output_path}")
