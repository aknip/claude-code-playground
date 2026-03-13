"""
Gemeinsame Library für OpenRouter Image-API Aufrufe.
Wird von image_chat.py und image_cli.py genutzt.
"""

import base64
import datetime
import http.client
import json
import mimetypes
import os
import ssl
import sys
import urllib.error
import urllib.parse

OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_MODEL = "google/gemini-3.1-flash-image-preview"


def build_file_part(data_url_or_path, mime=None):
    """Baut ein content-part für eine Datei (Bild oder PDF).
    Akzeptiert entweder einen data-URL-String oder einen Dateipfad."""
    # Wenn bereits ein data-URL, direkt verwenden
    if isinstance(data_url_or_path, str) and data_url_or_path.startswith("data:"):
        data_url = data_url_or_path
        mime = data_url.split(";")[0].split(":")[1]
    else:
        # Dateipfad
        path = data_url_or_path
        if not mime:
            mime, _ = mimetypes.guess_type(path)
            if not mime:
                mime = "application/octet-stream"
        with open(path, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
        data_url = f"data:{mime};base64,{b64}"

    if mime == "application/pdf":
        filename = "document.pdf"
        if not isinstance(data_url_or_path, str) or not data_url_or_path.startswith("data:"):
            filename = os.path.basename(data_url_or_path)
        return {"type": "file", "file": {"filename": filename, "file_data": data_url}}
    else:
        return {"type": "image_url", "image_url": {"url": data_url}}


def build_user_message(text, attachment_path=None):
    """Baut die User-Message mit optionalem Dateianhang (Bild, PDF oder Liste davon)."""
    if not attachment_path:
        return {"role": "user", "content": text}

    # Einzelnen Pfad in Liste normalisieren
    paths = attachment_path if isinstance(attachment_path, list) else [attachment_path]

    content = [{"type": "text", "text": text}]
    for p in paths:
        content.append(build_file_part(p))

    return {"role": "user", "content": content}


def call_openrouter(api_key, messages, model=DEFAULT_MODEL, image_config=None, has_image_input=False,
                     max_tokens=None, temperature=None, top_p=None):
    """Einzelner API-Call an OpenRouter, gibt dict mit parts, cost, reasoning_details zurück."""
    body = {"model": model, "messages": messages}
    if not has_image_input:
        body["modalities"] = ["image", "text"]
    if image_config and not has_image_input:
        body["image_config"] = image_config
    if max_tokens is not None:
        body["max_tokens"] = max_tokens
    if temperature is not None:
        body["temperature"] = temperature
    if top_p is not None:
        body["top_p"] = top_p

    payload = json.dumps(body).encode()
    parsed = urllib.parse.urlparse(OPENROUTER_URL)
    ctx = ssl.create_default_context()
    conn = http.client.HTTPSConnection(parsed.hostname, timeout=180, context=ctx)

    try:
        conn.request(
            "POST",
            parsed.path,
            body=payload,
            headers={
                "Content-Type": "application/json",
                "Content-Length": str(len(payload)),
                "Authorization": f"Bearer {api_key}",
                "HTTP-Referer": "http://localhost:8080",
            },
        )
        resp = conn.getresponse()
        chunks = []
        while True:
            chunk = resp.read(65536)
            if not chunk:
                break
            chunks.append(chunk)
        raw = b"".join(chunks)

        if resp.status != 200:
            raise urllib.error.HTTPError(
                OPENROUTER_URL, resp.status, raw.decode("utf-8", errors="replace"),
                resp.headers, None
            )
    finally:
        conn.close()

    data = json.loads(raw)
    choice = data["choices"][0]["message"]
    content = choice.get("content", "")

    parts = []
    has_images = False

    # Primary: images array (OpenRouter/Gemini image generation)
    images = choice.get("images")
    if images:
        for img in images if isinstance(images, list) else [images]:
            if isinstance(img, dict) and img.get("type") == "image_url":
                url = img.get("image_url", {}).get("url", "")
                if url:
                    parts.append({"type": "image_url", "image_url": {"url": url}})
                    has_images = True

    # Fallback: content array
    if isinstance(content, list):
        for item in content:
            if item.get("type") == "text":
                parts.append({"type": "text", "text": item["text"]})
            elif item.get("type") == "image_url" and not has_images:
                parts.append({"type": "image_url", "image_url": {"url": item["image_url"]["url"]}})
    elif isinstance(content, str) and content:
        parts.append({"type": "text", "text": content})

    if not parts:
        parts.append({"type": "text", "text": "(Keine Antwort vom Modell)"})

    result = {"parts": parts}
    cost = data.get("usage", {}).get("cost")
    if cost is not None:
        result["cost"] = cost
    reasoning = choice.get("reasoning_details")
    if reasoning:
        result["reasoning_details"] = reasoning
    return result


def save_images(parts, model, base_dir=None):
    """Speichert alle Bilder aus parts ins images/-Verzeichnis. Gibt Liste der Pfade zurück."""
    if base_dir is None:
        base_dir = os.path.dirname(os.path.abspath(__file__))
    short_name = model.split("/")[-1].replace("-preview", "")
    ts = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
    img_dir = os.path.join(base_dir, "images")
    os.makedirs(img_dir, exist_ok=True)

    saved = []
    img_count = 0
    for p in parts:
        if p.get("type") == "image_url":
            url = p.get("image_url", {}).get("url", "")
            if url.startswith("data:"):
                b64_data = url.split(",", 1)[1]
                img_bytes = base64.b64decode(b64_data)
                suffix = f"_{img_count}" if img_count else ""
                fname = f"{ts}{suffix}_{short_name}.png"
                fpath = os.path.join(img_dir, fname)
                with open(fpath, "wb") as f:
                    f.write(img_bytes)
                saved.append(fpath)
                img_count += 1
    return saved
