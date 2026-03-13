#!/usr/bin/env python3
"""
Einzelnes Python-Script: Webserver + Chat-UI für OpenRouter API
mit Bildgenerierung via google/gemini-2.5-flash-image-preview.

Abhängigkeiten: nur Python-Standardbibliothek (>=3.8)
API-Key: Environment-Variable OPENROUTER_API_KEY

Start: python chat_llm.py
"""

import base64
import datetime
import http.client
import http.server
import json
import os
import ssl
import sys
import urllib.error
import urllib.parse
import urllib.request
import io
import xml.etree.ElementTree as ET
import zipfile
from functools import partial

PORT = 8080
MODEL = "google/gemini-3.1-flash-image-preview"
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"

HTML = r"""<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>LLM Chat – Bildgenerierung</title>
<style>
  :root {
    --bg: #0f0f0f; --surface: #1a1a1a; --border: #2a2a2a;
    --text: #e0e0e0; --text-dim: #888; --accent: #6c8cff;
    --user-bg: #1e2a40; --bot-bg: #1a1a1a;
  }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg); color: var(--text);
    height: 100vh; display: flex; flex-direction: column;
  }
  header {
    padding: 12px 20px; border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 10px;
    background: var(--surface);
  }
  header h1 { font-size: 16px; font-weight: 600; }
  header select {
    background: var(--bg); color: var(--text); border: 1px solid var(--border);
    border-radius: 6px; padding: 4px 8px; font-size: 12px; font-family: inherit;
    cursor: pointer; outline: none;
  }
  header select:focus { border-color: var(--accent); }
  #edit-label {
    font-size: 12px; color: var(--text-dim); cursor: pointer;
    display: flex; align-items: center; gap: 4px; margin-left: auto;
    user-select: none;
  }
  #edit-label:has(input:checked) { color: var(--accent); }
  #chat {
    flex: 1; overflow-y: auto; padding: 20px;
    display: flex; flex-direction: column; gap: 16px;
  }
  .msg { max-width: 80%; padding: 12px 16px; border-radius: 12px; line-height: 1.5; }
  .msg.user {
    align-self: flex-end; background: var(--user-bg);
    border-bottom-right-radius: 4px;
  }
  .msg.bot {
    align-self: flex-start; background: var(--bot-bg);
    border: 1px solid var(--border); border-bottom-left-radius: 4px;
  }
  .msg img {
    max-width: 100%; border-radius: 8px; margin-top: 8px;
    cursor: pointer;
  }
  .msg img:hover { opacity: 0.9; }
  .msg p { margin-bottom: 8px; }
  .msg p:last-child { margin-bottom: 0; }
  .msg pre {
    background: #111; padding: 10px; border-radius: 6px;
    overflow-x: auto; margin: 8px 0; font-size: 13px;
  }
  .msg code { font-family: 'SF Mono', Consolas, monospace; font-size: 13px; }
  #input-area {
    padding: 16px 20px; border-top: 1px solid var(--border);
    background: var(--surface); display: flex; gap: 10px;
  }
  #prompt {
    flex: 1; background: var(--bg); color: var(--text);
    border: 1px solid var(--border); border-radius: 8px;
    padding: 10px 14px; font-size: 14px; resize: none;
    font-family: inherit; min-height: 44px; max-height: 150px;
  }
  #prompt:focus { outline: none; border-color: var(--accent); }
  #send {
    background: var(--accent); color: #fff; border: none;
    border-radius: 8px; padding: 0 20px; font-size: 14px;
    cursor: pointer; font-weight: 600; white-space: nowrap;
  }
  #send:disabled { opacity: 0.4; cursor: default; }
  #send:hover:not(:disabled) { filter: brightness(1.15); }
  #upload-btn {
    background: var(--bg); color: var(--text-dim); border: 1px solid var(--border);
    border-radius: 8px; padding: 0 12px; font-size: 18px; cursor: pointer;
    font-family: inherit; display: flex; align-items: center; gap: 4px;
    white-space: nowrap;
  }
  #upload-btn:hover { border-color: var(--accent); color: var(--accent); }
  #upload-btn.has-file { color: var(--accent); border-color: var(--accent); }
  #upload-preview {
    display: none; position: relative; flex-shrink: 0;
  }
  #upload-preview img {
    height: 40px; border-radius: 6px; border: 1px solid var(--border);
  }
  #upload-preview .remove {
    position: absolute; top: -6px; right: -6px;
    background: #e44; color: #fff; border: none; border-radius: 50%;
    width: 18px; height: 18px; font-size: 12px; cursor: pointer;
    display: flex; align-items: center; justify-content: center; line-height: 1;
  }
  .typing { color: var(--text-dim); display: flex; gap: 6px; padding: 14px 18px; }
  .typing span {
    width: 8px; height: 8px; border-radius: 50%; background: var(--text-dim);
    animation: dot-fade 1.2s ease-in-out infinite;
  }
  .typing span:nth-child(2) { animation-delay: 0.2s; }
  .typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes dot-fade {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
  .msg .cost { font-size: 11px; color: #555; margin-top: 4px; }
  /* Lightbox */
  #lightbox {
    display: none; position: fixed; inset: 0; background: rgba(0,0,0,.85);
    z-index: 100; align-items: center; justify-content: center; cursor: zoom-out;
  }
  #lightbox.show { display: flex; }
  #lightbox img { max-width: 95vw; max-height: 95vh; border-radius: 8px; }
</style>
</head>
<body>
<header>
  <h1>ImageChat</h1>
  <select id="model-select">
    <option value="google/gemini-3.1-flash-image-preview">Nano Banana 2 - Gemini 3.1 Flash ($3)</option>
    <option value="google/gemini-3-pro-image-preview">Nano Banana Pro - Gemini 3 Pro ($12)</option>
  </select>
  <select id="size-select">
    <option value="1K">1K</option>
    <option value="0.5K">0.5K</option>
    <option value="2K">2K</option>
    <option value="4K">4K</option>
  </select>
  <select id="ratio-select">
    <option value="">-</option>
    <option value="1:1">1:1</option>
    <option value="16:9">16:9</option>
    <option value="9:16">9:16</option>
    <option value="3:2">3:2</option>
    <option value="2:3">2:3</option>
    <option value="4:3">4:3</option>
    <option value="3:4">3:4</option>
    <option value="5:4">5:4</option>
    <option value="4:5">4:5</option>
    <option value="21:9">21:9</option>
    <option value="1:4">1:4</option>
    <option value="4:1">4:1</option>
    <option value="1:8">1:8</option>
    <option value="8:1">8:1</option>
  </select>
  <select id="prompt-select">
    <option value="">Prompts…</option>
    <option value="ppt">PPT Grafiken erstellen</option>
    <option value="hallo">Hallo Welt</option>
    <option value="uidesign">UI-Design</option>
  </select>
  <button id="ppt-import-btn" style="background:#808080;color:#fff;border:1px solid var(--border);border-radius:6px;padding:4px 8px;font-size:12px;cursor:pointer;font-family:inherit;">PPT Import</button>
  <input type="file" id="ppt-file" accept=".pptx" style="display:none">
</header>
<div id="chat"></div>
<div id="input-area">
  <label id="edit-label"><input type="checkbox" id="edit-mode"> Bildkorrektur</label>
  <button id="upload-btn" title="Bild hochladen">+</button>
  <input type="file" id="upload-file" accept="image/png,image/jpeg,image/webp,image/gif" style="display:none">
  <div id="upload-preview"><img><button class="remove" title="Bild entfernen">&times;</button></div>
  <textarea id="prompt" rows="1" placeholder="Nachricht eingeben… (Shift+Enter für Zeilenumbruch)"></textarea>
  <button id="send">Senden</button>
</div>
<div id="lightbox" onclick="this.classList.remove('show')"><img></div>
<script>
const chat = document.getElementById('chat');
const prompt = document.getElementById('prompt');
const sendBtn = document.getElementById('send');
const modelSelect = document.getElementById('model-select');
const sizeSelect = document.getElementById('size-select');
const ratioSelect = document.getElementById('ratio-select');
const editMode = document.getElementById('edit-mode');
const promptSelect = document.getElementById('prompt-select');
const PROMPTS = {
  ppt: `Anbei eine Präsentation. Erstelle auf Basis der Inhalte Diagramme, die die behandelten Themen visualisieren: Übersichten, Zusammenfassungen, Detailbetrachtungen, Infografiken.
Die Diagramme sollen in die Präsentation eingefügt werden.

Stil: Präsentationen von Senior Consultant eines Beratungsunternehmens.

Regeln, die unbedingt und immer beachtet werden müssen:
- Pixelbild
- Bildformat 16:7.
- Font: Roboto
- Texte und Beschriftungen müssen immer in gemischter Groß-/Kleinschreibung erfolgen, sie darf niemals nur in Großbuchstaben (Versalien) erfolgen
- Erstelle nur die Grafik, keine Überschrift, keine Seitenzahlen, keine Firmenlogos, keine vollständige Präsentationsfolie

Workflow:
Erstelle nun das erste Diagramm nach den oben formulierten Vorgaben.
Gib zuerst immer eine Beschreibung und eine Liste der Textelemente zurück - generiere noch nicht das Diagramm.
Frage dann nach, ob Korrekturen gewünscht sind und erstelle nach der Antwort das Diagramm.
Frage anschliessend, ob dasselebe Diagramm auch nochmal mit einem farbigen Hintergrund erstellt werden soll oder das nächste Diagramm erstellt werden soll.
Wiederhole danach den Workflow für das nächste Diagramm.`,
  hallo: `Hallo Welt`,
  uidesign: `Webdesign / UI für ein Dashboard für einen Underwriter in der Industrieversicherung, Fokus Portfolioanalyse. Benutze shadcn/UI als Designvorlage.`
};
promptSelect.addEventListener('change', () => {
  const key = promptSelect.value;
  if (key && PROMPTS[key]) {
    prompt.value = PROMPTS[key];
    autoResize();
    prompt.focus();
  }
  promptSelect.value = '';
});
let history = [];      // text-only history (lightweight)
let richHistory = [];  // full multimodal history (with images)
let uploadedImageDataUrl = null; // base64 data URL of uploaded image

// Upload button
const uploadBtn = document.getElementById('upload-btn');
const uploadFile = document.getElementById('upload-file');
const uploadPreview = document.getElementById('upload-preview');
uploadBtn.addEventListener('click', () => uploadFile.click());
uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImageDataUrl = e.target.result;
    uploadPreview.querySelector('img').src = uploadedImageDataUrl;
    uploadPreview.style.display = 'block';
    uploadBtn.classList.add('has-file');
  };
  reader.readAsDataURL(file);
  uploadFile.value = '';
});
uploadPreview.querySelector('.remove').addEventListener('click', () => {
  uploadedImageDataUrl = null;
  uploadPreview.style.display = 'none';
  uploadBtn.classList.remove('has-file');
});

// PPT Import
const pptBtn = document.getElementById('ppt-import-btn');
const pptFile = document.getElementById('ppt-file');
pptBtn.addEventListener('click', () => pptFile.click());
pptFile.addEventListener('change', async () => {
  const file = pptFile.files[0];
  if (!file) return;
  pptBtn.textContent = 'Importiere…';
  pptBtn.disabled = true;
  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch('/api/pptx-text', {method: 'POST', body: formData});
    const data = await res.json();
    if (data.error) { alert('Fehler: ' + data.error); }
    else if (data.text) {
      prompt.value = prompt.value + (prompt.value ? '\n\n' : '') + data.text;
      autoResize();
      prompt.focus();
    }
  } catch (e) { alert('Upload-Fehler: ' + e.message); }
  pptBtn.textContent = 'PPT Import';
  pptBtn.disabled = false;
  pptFile.value = '';
});

// Flash-only options ausblenden wenn Pro gewählt
const flashOnlySizes = ['0.5K'];
const flashOnlyRatios = ['1:4', '4:1', '1:8', '8:1'];
modelSelect.addEventListener('change', () => {
  const isFlash = modelSelect.value.includes('flash');
  for (const opt of sizeSelect.options) {
    opt.disabled = !isFlash && flashOnlySizes.includes(opt.value);
    if (opt.disabled && opt.selected) sizeSelect.value = '1K';
  }
  for (const opt of ratioSelect.options) {
    opt.disabled = !isFlash && flashOnlyRatios.includes(opt.value);
    if (opt.disabled && opt.selected) ratioSelect.value = '1:1';
  }
});

function esc(s) {
  const d = document.createElement('div'); d.textContent = s; return d.innerHTML;
}

function renderContent(parts) {
  let html = '';
  for (const p of parts) {
    if (p.type === 'text') {
      // Simple markdown: bold, italic, code blocks, inline code
      let t = esc(p.text);
      t = t.replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
      t = t.replace(/`([^`]+)`/g, '<code>$1</code>');
      t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      t = t.replace(/\n/g, '<br>');
      html += '<p>' + t + '</p>';
    } else if (p.type === 'image_url') {
      html += '<img src="' + p.image_url.url + '" onclick="event.stopPropagation();showLightbox(this.src)">';
    }
  }
  return html;
}

function showLightbox(src) {
  const lb = document.getElementById('lightbox');
  lb.querySelector('img').src = src;
  lb.classList.add('show');
}

function addMsg(role, parts) {
  const div = document.createElement('div');
  div.className = 'msg ' + (role === 'user' ? 'user' : 'bot');
  div.innerHTML = renderContent(parts);
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
  return div;
}

function autoResize() {
  prompt.style.height = 'auto';
  prompt.style.height = Math.min(prompt.scrollHeight, 150) + 'px';
}
prompt.addEventListener('input', autoResize);

async function send() {
  const text = prompt.value.trim();
  if (!text) return;
  prompt.value = ''; autoResize();
  sendBtn.disabled = true;

  // Build user message parts (text + optional image)
  const userParts = [{type: 'text', text}];
  const userRichParts = [{type: 'text', text}];
  const attachedImage = uploadedImageDataUrl;
  if (attachedImage) {
    userParts.push({type: 'image_url', image_url: {url: attachedImage}});
    userRichParts.push({type: 'image_url', image_url: {url: attachedImage}});
    // Clear upload state
    uploadedImageDataUrl = null;
    uploadPreview.style.display = 'none';
    uploadBtn.classList.remove('has-file');
  }
  addMsg('user', userParts);
  // For text-only history: always use multimodal content format when image attached
  if (attachedImage) {
    history.push({role: 'user', content: userRichParts});
  } else {
    history.push({role: 'user', content: text});
  }
  richHistory.push({role: 'user', content: userRichParts});

  // Typing indicator
  const typing = document.createElement('div');
  typing.className = 'msg bot typing';
  typing.innerHTML = '<span></span><span></span><span></span>';
  chat.appendChild(typing);
  chat.scrollTop = chat.scrollHeight;

  try {
    const msgs = editMode.checked ? richHistory : history;
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        messages: msgs,
        model: modelSelect.value,
        has_image_input: !!attachedImage,
        image_config: Object.assign({}, sizeSelect.value ? {image_size: sizeSelect.value} : {}, ratioSelect.value ? {aspect_ratio: ratioSelect.value} : {})
      })
    });
    const data = await res.json();
    typing.remove();

    if (data.error) {
      addMsg('assistant', [{type: 'text', text: '⚠️ Fehler: ' + data.error}]);
    } else {
      const parts = data.parts;
      const msgDiv = addMsg('assistant', parts);
      if (data.cost != null) {
        const costEl = document.createElement('div');
        costEl.className = 'cost';
        costEl.textContent = '$' + data.cost.toFixed(4);
        msgDiv.appendChild(costEl);
      }
      // Store in both histories
      const textContent = parts.filter(p => p.type === 'text').map(p => p.text).join('\n');
      if (textContent) {
        history.push({role: 'assistant', content: textContent});
      }
      // Rich history: full multimodal content (text + images + reasoning)
      const richParts = [];
      for (const p of parts) {
        if (p.type === 'text') {
          richParts.push({type: 'text', text: p.text});
        } else if (p.type === 'image_url') {
          richParts.push({type: 'image_url', image_url: {url: p.image_url.url}});
        }
      }
      if (richParts.length) {
        const assistantEntry = {role: 'assistant', content: richParts};
        if (data.reasoning_details) {
          assistantEntry.reasoning_details = data.reasoning_details;
        }
        richHistory.push(assistantEntry);
      }
    }
  } catch (e) {
    typing.remove();
    addMsg('assistant', [{type: 'text', text: '⚠️ Netzwerkfehler: ' + e.message}]);
  }
  sendBtn.disabled = false;
  prompt.focus();
}

sendBtn.addEventListener('click', send);
prompt.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
});
prompt.focus();
</script>
</body>
</html>"""


class ChatHandler(http.server.BaseHTTPRequestHandler):
    def __init__(self, api_key, *args, **kwargs):
        self.api_key = api_key
        super().__init__(*args, **kwargs)

    def log_message(self, fmt, *args):
        # Minimal logging
        sys.stderr.write(f"[{self.log_date_time_string()}] {fmt % args}\n")

    def do_GET(self):
        if self.path == "/" or self.path == "/index.html":
            self.send_response(200)
            self.send_header("Content-Type", "text/html; charset=utf-8")
            self.end_headers()
            self.wfile.write(HTML.encode())
        elif self.path in ("/favicon.ico", "/apple-touch-icon.png",
                           "/apple-touch-icon-precomposed.png"):
            self.send_response(204)
            self.end_headers()
        else:
            self.send_error(404)

    def do_POST(self):
        if self.path == "/api/pptx-text":
            return self._handle_pptx_upload()
        if self.path != "/api/chat":
            self.send_error(404)
            return

        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length))
        messages = body.get("messages", [])
        model = body.get("model", MODEL)
        image_config = body.get("image_config")
        has_image_input = body.get("has_image_input", False)

        try:
            result = self._call_openrouter(messages, model, image_config, has_image_input)
            self._json_response(200, result)
        except urllib.error.HTTPError as e:
            error_body = e.read().decode("utf-8", errors="replace")
            sys.stderr.write(f"OpenRouter API error {e.code}: {error_body}\n")
            self._json_response(500, {"error": f"API-Fehler {e.code}: {error_body}"})
        except Exception as e:
            import traceback
            sys.stderr.write(f"Error in /api/chat: {traceback.format_exc()}\n")
            self._json_response(500, {"error": str(e)})

    def _handle_pptx_upload(self):
        try:
            content_type = self.headers.get("Content-Type", "")
            length = int(self.headers.get("Content-Length", 0))
            raw = self.rfile.read(length)

            # Parse multipart form data to extract file
            boundary = content_type.split("boundary=")[1].encode()
            parts = raw.split(b"--" + boundary)
            file_data = None
            for part in parts:
                if b"filename=" in part:
                    # Skip headers, file content starts after \r\n\r\n
                    header_end = part.find(b"\r\n\r\n")
                    if header_end != -1:
                        file_data = part[header_end + 4:]
                        # Remove trailing \r\n
                        if file_data.endswith(b"\r\n"):
                            file_data = file_data[:-2]
                    break

            if not file_data:
                self._json_response(400, {"error": "Keine Datei gefunden"})
                return

            text = self._extract_pptx_text(file_data)
            self._json_response(200, {"text": text})
        except Exception as e:
            import traceback
            sys.stderr.write(f"PPTX parse error: {traceback.format_exc()}\n")
            self._json_response(500, {"error": str(e)})

    @staticmethod
    def _extract_pptx_text(data):
        ns = {"a": "http://schemas.openxmlformats.org/drawingml/2006/main"}
        texts = []
        with zipfile.ZipFile(io.BytesIO(data)) as zf:
            slide_names = sorted(
                n for n in zf.namelist() if n.startswith("ppt/slides/slide") and n.endswith(".xml")
            )
            for slide_name in slide_names:
                slide_xml = zf.read(slide_name)
                tree = ET.fromstring(slide_xml)
                slide_texts = []
                for para in tree.iter("{http://schemas.openxmlformats.org/drawingml/2006/main}p"):
                    runs = para.findall(".//a:r/a:t", ns)
                    line = "".join(r.text or "" for r in runs).strip()
                    if line:
                        slide_texts.append(line)
                if slide_texts:
                    texts.append("\n".join(slide_texts))
        return "\n\n".join(texts)

    def _call_openrouter(self, messages, model=MODEL, image_config=None, has_image_input=False):
        body = {
            "model": model,
            "messages": messages,
        }
        # Only request image generation when no image was uploaded
        if not has_image_input:
            body["modalities"] = ["image", "text"]
        if image_config and not has_image_input:
            body["image_config"] = image_config
        payload = json.dumps(body).encode()

        parsed = urllib.parse.urlparse(OPENROUTER_URL)
        ctx = ssl.create_default_context()
        conn = http.client.HTTPSConnection(parsed.hostname, timeout=180, context=ctx)
        try:
            conn.request(
                "POST", parsed.path,
                body=payload,
                headers={
                    "Content-Type": "application/json",
                    "Content-Length": str(len(payload)),
                    "Authorization": f"Bearer {self.api_key}",
                    "HTTP-Referer": "http://localhost:8080",
                },
            )
            resp = conn.getresponse()
            # Read response in chunks to avoid IncompleteRead
            chunks = []
            while True:
                chunk = resp.read(65536)
                if not chunk:
                    break
                chunks.append(chunk)
            raw = b"".join(chunks)

            if resp.status != 200:
                sys.stderr.write(f"OpenRouter API error {resp.status}: {raw[:500]}\n")
                raise urllib.error.HTTPError(
                    OPENROUTER_URL, resp.status, raw.decode("utf-8", errors="replace"),
                    resp.headers, None
                )
        finally:
            conn.close()
        data = json.loads(raw)

        choice = data["choices"][0]["message"]
        sys.stderr.write(f"API response keys: {list(choice.keys())}\n")
        sys.stderr.write(f"content type: {type(choice.get('content'))}\n")
        content_preview = str(choice.get("content", ""))[:300]
        sys.stderr.write(f"content preview: {content_preview}\n")
        content = choice.get("content", "")

        parts = []
        has_images = False

        # Primary: images array (OpenRouter/Gemini image generation)
        images = choice.get("images")
        if images:
            for img in (images if isinstance(images, list) else [images]):
                if isinstance(img, dict) and img.get("type") == "image_url":
                    url = img.get("image_url", {}).get("url", "")
                    if url:
                        parts.append({
                            "type": "image_url",
                            "image_url": {"url": url}
                        })
                        has_images = True

        # Fallback: content array (only extract images if not already found)
        if isinstance(content, list):
            for item in content:
                if item.get("type") == "text":
                    parts.append({"type": "text", "text": item["text"]})
                elif item.get("type") == "image_url" and not has_images:
                    parts.append({
                        "type": "image_url",
                        "image_url": {"url": item["image_url"]["url"]}
                    })
        elif isinstance(content, str) and content:
            parts.append({"type": "text", "text": content})

        if not parts:
            parts.append({"type": "text", "text": "(Keine Antwort vom Modell)"})

        # Save images to disk
        short_name = model.split("/")[-1].replace("-preview", "")
        ts = datetime.datetime.now().strftime("%Y-%m-%d-%H-%M-%S")
        img_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "images")
        os.makedirs(img_dir, exist_ok=True)
        img_count = 0
        for p in parts:
            if p.get("type") == "image_url":
                url = p["image_url"]["url"]
                if url.startswith("data:"):
                    b64_data = url.split(",", 1)[1]
                    img_bytes = base64.b64decode(b64_data)
                    suffix = f"_{img_count}" if img_count else ""
                    fname = f"{ts}{suffix}_{short_name}.png"
                    fpath = os.path.join(img_dir, fname)
                    with open(fpath, "wb") as f:
                        f.write(img_bytes)
                    sys.stderr.write(f"Bild gespeichert: {fpath}\n")
                    img_count += 1

        result = {"parts": parts}
        cost = data.get("usage", {}).get("cost")
        if cost is not None:
            result["cost"] = cost
        # Pass reasoning_details for selective image editing
        reasoning = choice.get("reasoning_details")
        if reasoning:
            result["reasoning_details"] = reasoning
        return result

    def _json_response(self, code, obj):
        body = json.dumps(obj).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


def main():
    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        print("Fehler: Environment-Variable OPENROUTER_API_KEY ist nicht gesetzt.")
        print("  echo 'export OPENROUTER_API_KEY=\"sk-or-DEIN_KEY\"' | tee -a ~/.zshrc >> ~/.bashrc ")
        sys.exit(1)

    handler = partial(ChatHandler, api_key)
    server = http.server.HTTPServer(("0.0.0.0", PORT), handler)
    print(f"Server gestartet: http://localhost:{PORT}")
    print(f"Modell: {MODEL}")
    print("Beenden mit Ctrl+C")

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServer beendet.")
        server.server_close()


if __name__ == "__main__":
    main()
