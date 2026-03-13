#!/usr/bin/env python3
"""
CLI-Variante von image_chat.py – Bildgenerierung via OpenRouter API.

Abhängigkeiten: nur Python-Standardbibliothek (>=3.8)
API-Key: Environment-Variable OPENROUTER_API_KEY

Beispiele:
  python image_cli.py "Foto Schäferhund"
  python image_cli.py "Foto Schäferhund" --model google/gemini-3-pro-image-preview --size 2K --ratio 16:9
  python image_cli.py "Beschreibe das Bild" --attachment bild.png
  python image_cli.py "Mach den Hintergrund blau" --attachment bild.png --edit
"""

import argparse
import os
import sys

from image_api import DEFAULT_MODEL, build_user_message, call_openrouter, save_images


def main():
    parser = argparse.ArgumentParser(description="CLI Bildgenerierung via OpenRouter")
    parser.add_argument("message", help="Chat-Nachricht / Prompt")
    parser.add_argument("--attachment", "-a", help="Pfad zu einem Bild oder PDF als Anhang")
    parser.add_argument("--model", "-m", default=DEFAULT_MODEL, help=f"Modell (default: {DEFAULT_MODEL})")
    parser.add_argument("--size", "-s", default="1K", choices=["0.5K", "1K", "2K", "4K"], help="Auflösung (default: 1K)")
    parser.add_argument("--ratio", "-r", default=None, help="Seitenverhältnis, z.B. 16:9, 1:1, 3:2")
    parser.add_argument("--edit", "-e", action="store_true", help="Bildkorrektur-Modus (sendet Bild in History)")

    args = parser.parse_args()

    api_key = os.environ.get("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        print("Fehler: OPENROUTER_API_KEY nicht gesetzt.", file=sys.stderr)
        sys.exit(1)

    if args.attachment and not os.path.isfile(args.attachment):
        print(f"Fehler: Datei nicht gefunden: {args.attachment}", file=sys.stderr)
        sys.exit(1)

    is_pdf = args.attachment and args.attachment.lower().endswith(".pdf")
    has_image_input = bool(args.attachment) and not is_pdf
    message = build_user_message(args.message, args.attachment)
    messages = [message]

    image_config = {}
    if args.size:
        image_config["image_size"] = args.size
    if args.ratio:
        image_config["aspect_ratio"] = args.ratio

    print(f"Modell: {args.model}")
    print("Sende Request...", flush=True)

    result = call_openrouter(
        api_key, messages, args.model,
        image_config=image_config or None,
        has_image_input=has_image_input,
    )
    parts = result["parts"]
    cost = result.get("cost")

    # Text ausgeben
    for p in parts:
        if p.get("type") == "text":
            print(f"\n{p['text']}")

    # Bilder speichern
    saved = save_images(parts, args.model)
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
