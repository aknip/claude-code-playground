#!/usr/bin/env python3
"""
Generiert ein Folienbild via OpenRouter API.

- Liest den Prompt aus _NOTES/prompt.md
- Sendet das PDF _NOTES/Folienlayout 4.pdf als Kontext mit
- Speichert das Ergebnis in images/ mit Zeitstempel

API-Key: Environment-Variable OPENROUTER_API_KEY
"""

import argparse
import os
import re
import sys

from image_api import build_user_message, call_openrouter, save_images

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROMPT_FILE = os.path.join(SCRIPT_DIR, "_NOTES", "prompt.md")
DEFAULT_IMAGES = [
    os.path.join(SCRIPT_DIR, "_NOTES", "Folienlayout 4", "Folie1.jpeg"),
    os.path.join(SCRIPT_DIR, "_NOTES", "Folienlayout 4", "Folie2.jpeg"),
    os.path.join(SCRIPT_DIR, "_NOTES", "Folienlayout 4", "Folie3.jpeg"),
    os.path.join(SCRIPT_DIR, "_NOTES", "Folienlayout 4", "Folie4.jpeg"),
]
MODEL = "google/gemini-3-pro-image-preview"


def main():
    parser = argparse.ArgumentParser(description="Folienbild via OpenRouter API generieren")
    parser.add_argument("slide", type=int, help="Foliennummer (z.B. 7)")
    parser.add_argument("--images", nargs="+", metavar="FILE",
                        help="Bild-/PDF-Dateien als Kontext (Standard: _NOTES/Folienlayout 1.png)")
    args = parser.parse_args()

    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        print("Fehler: OPENROUTER_API_KEY nicht gesetzt.", file=sys.stderr)
        sys.exit(1)

    with open(PROMPT_FILE, "r", encoding="utf-8") as f:
        prompt_text = f.read().strip()

    prompt_text = re.sub(r"Erstelle Folie \d+", f"Erstelle Folie {args.slide}", prompt_text)

    image_files = args.images if args.images else DEFAULT_IMAGES
    for img in image_files:
        if not os.path.isfile(img):
            print(f"Fehler: Datei nicht gefunden: {img}", file=sys.stderr)
            sys.exit(1)

    message = build_user_message(prompt_text, image_files)
    messages = [message]

    print(f"Modell: {MODEL}")
    print(f"Prompt: {len(prompt_text)} Zeichen aus {PROMPT_FILE}")
    for img in image_files:
        print(f"Bild:   {img}")
    print("Sende Request...", flush=True)

    result = call_openrouter(
        api_key, messages, MODEL,
        has_image_input=True,
        max_tokens=32768,
        temperature=1.0,
        top_p=0.95,
    )
    parts = result["parts"]
    cost = result.get("cost")

    for p in parts:
        if p.get("type") == "text":
            print(f"\n{p['text']}")

    # Nur das erste Bild speichern
    first_image = [p for p in parts if p.get("type") == "image_url"][:1]
    saved = save_images(first_image, MODEL)
    if saved:
        print(f"\n{len(saved)} Bild(er) gespeichert:")
        for path in saved:
            print(f"  {path}")
    else:
        print("\nKein Bild generiert.")

    if cost is not None:
        print(f"Kosten: ${cost:.4f}")


if __name__ == "__main__":
    main()
