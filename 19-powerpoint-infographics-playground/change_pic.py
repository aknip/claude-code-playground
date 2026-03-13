#!/usr/bin/env python3
"""
Ändert ein Bild via OpenRouter API.

- Sendet das Bild _NOTES/dog.png mit dem Prompt "Ändere Halsbandfarbe auf rot"
- Speichert das Ergebnis in images/ mit Zeitstempel

API-Key: Environment-Variable OPENROUTER_API_KEY
"""

import os
import sys

from image_api import build_user_message, call_openrouter, save_images

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROMPT_TEXT = "Ändere Halsbandfarbe auf rot"
IMAGE_FILE = os.path.join(SCRIPT_DIR, "_NOTES", "dog.png")
MODEL = "google/gemini-3-pro-image-preview"


def main():
    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        print("Fehler: OPENROUTER_API_KEY nicht gesetzt.", file=sys.stderr)
        sys.exit(1)

    if not os.path.isfile(IMAGE_FILE):
        print(f"Fehler: Bild nicht gefunden: {IMAGE_FILE}", file=sys.stderr)
        sys.exit(1)

    message = build_user_message(PROMPT_TEXT, IMAGE_FILE)
    messages = [message]

    print(f"Modell: {MODEL}")
    print(f"Prompt: {PROMPT_TEXT}")
    print(f"Bild:   {IMAGE_FILE}")
    print("Sende Request...", flush=True)

    result = call_openrouter(
        api_key, messages, MODEL,
        has_image_input=True,
        max_tokens=32768,
        temperature=1,
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
