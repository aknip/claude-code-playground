# Setup

Optional:
uv venv
source .venv/bin/activate
uv pip install -r requirements.txt


# Example prompts

## 1 
create a diagram with a typical sequence diagram for a ecommerce checkout process
Set "roughness" of all elements to 0, and "fontFamily" to 6. 
All text elements of bound texts should have their x/y coordinates properly set near the container's top-left corner (with a 10px offset), and with textAlign: "center" and verticalAlign: "middle".
Convert diagram to .png by using the following command: `python3 excalidraw_to_png.py {name-of-diagram.excalidraw}`

## 2
take `whiteboard-photo.png` and create a excalidraw diagram based on it. 
Keep sizes and proportions of all elements as in the photo, but keep everything in clear 90 degree angles and harmonize paddings, margins, distances, symmetries.
Set "roughness" of all elements to 0, and "fontFamily" to 6. 
All text elements of bound texts should have their x/y coordinates properly set near the container's top-left corner (with a 10px offset), and with textAlign: "center" and verticalAlign: "middle".
Convert diagram to .png by using the following command: `python3 excalidraw_to_png.py {name-of-diagram.excalidraw}`


verify output and iterate...


![demo](ecommerce-checkout-sequence.excalidraw.png)

