#!/usr/bin/env python3
"""
Generiert ein Folienbild via OpenRouter API.

- Liest den Prompt aus _NOTES/prompt.md
- Sendet das Bild _NOTES/Folienlayout 1.png als Kontext mit
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
IMAGE_FILE = os.path.join(SCRIPT_DIR, "_NOTES", "Folienlayout 1.png")
MODEL = "google/gemini-3-pro-image-preview"


def main():
    parser = argparse.ArgumentParser(description="Folienbild via OpenRouter API generieren")
    parser.add_argument("slide", type=int, help="Foliennummer (z.B. 7)")
    args = parser.parse_args()

    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        print("Fehler: OPENROUTER_API_KEY nicht gesetzt.", file=sys.stderr)
        sys.exit(1)

    with open(PROMPT_FILE, "r", encoding="utf-8") as f:
        prompt_text = f.read().strip()

    prompt_text = re.sub(r"Erstelle Folie \d+", f"Erstelle Folie {args.slide}", prompt_text)

    if not os.path.isfile(IMAGE_FILE):
        print(f"Fehler: Bild nicht gefunden: {IMAGE_FILE}", file=sys.stderr)
        sys.exit(1)

    message = build_user_message(prompt_text, IMAGE_FILE)
    messages = [message]

    print(f"Modell: {MODEL}")
    print(f"Prompt: {len(prompt_text)} Zeichen aus {PROMPT_FILE}")
    print(f"Bild:   {IMAGE_FILE}")
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

    saved = save_images(parts, MODEL)
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
