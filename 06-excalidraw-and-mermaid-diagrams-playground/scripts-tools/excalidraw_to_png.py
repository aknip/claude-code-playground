#!/usr/bin/env python3
"""
Convert Excalidraw diagrams (.excalidraw) to PNG images.

Usage:
    python excalidraw_to_png.py input.excalidraw output.png
    python excalidraw_to_png.py input.excalidraw  # outputs input.png

Requirements:
    pip install playwright
    playwright install chromium
"""

import argparse
import base64
import json
import sys
import tempfile
from pathlib import Path

HTML_TEMPLATE = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { background: #fff; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="module">
        import * as ExcalidrawLib from "https://esm.sh/@excalidraw/excalidraw";

        const EXCALIDRAW_DATA = __EXCALIDRAW_DATA__;
        const EXPORT_PADDING = __EXPORT_PADDING__;
        const EXPORT_SCALE = __EXPORT_SCALE__;
        const EXPORT_BACKGROUND = __EXPORT_BACKGROUND__;

        async function exportToPng() {
            try {
                const elements = EXCALIDRAW_DATA.elements.filter(el => !el.isDeleted);
                const appState = EXCALIDRAW_DATA.appState || {};
                const files = EXCALIDRAW_DATA.files || {};

                // Use Excalidraw's built-in export function
                const blob = await ExcalidrawLib.exportToBlob({
                    elements: elements,
                    appState: {
                        ...appState,
                        exportWithDarkMode: false,
                        exportBackground: EXPORT_BACKGROUND,
                        exportScale: EXPORT_SCALE,
                    },
                    files: files,
                    exportPadding: EXPORT_PADDING,
                    mimeType: "image/png",
                    quality: 1,
                });

                // Convert blob to base64
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64data = reader.result.split(',')[1];
                    window.exportedPngBase64 = base64data;
                    window.exportComplete = true;
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                window.exportError = error.message;
                window.exportComplete = true;
            }
        }

        // Wait a bit for fonts to load, then export
        setTimeout(exportToPng, 500);
    </script>
</body>
</html>
"""


def convert_excalidraw_to_png(
    input_path: str,
    output_path: str | None = None,
    scale: int = 2,
    background: bool = True,
    padding: int = 20,
) -> str:
    """
    Convert an Excalidraw file to PNG using Playwright and @excalidraw/excalidraw.

    Args:
        input_path: Path to the .excalidraw file
        output_path: Path for the output PNG (default: same name with .png extension)
        scale: Export scale factor (default: 2 for high resolution)
        background: Include background color (default: True)
        padding: Padding around the diagram in pixels (default: 20)

    Returns:
        Path to the generated PNG file
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Error: playwright is required. Install with:")
        print("  pip install playwright")
        print("  playwright install chromium")
        sys.exit(1)

    input_file = Path(input_path)
    if not input_file.exists():
        raise FileNotFoundError(f"Input file not found: {input_path}")

    # Determine output path
    if output_path is None:
        output_file = input_file.with_suffix(".png")
    else:
        output_file = Path(output_path)

    # Read the excalidraw file
    print(f"Reading: {input_file}")
    with open(input_file, "r", encoding="utf-8") as f:
        excalidraw_data = json.load(f)

    # Validate it's an excalidraw file
    if excalidraw_data.get("type") != "excalidraw":
        raise ValueError("Invalid excalidraw file: missing 'type': 'excalidraw'")

    elements = [el for el in excalidraw_data.get("elements", []) if not el.get("isDeleted")]
    if not elements:
        raise ValueError("No elements found in the diagram")

    print(f"Found {len(elements)} elements")

    # Prepare HTML with embedded data
    html_content = (
        HTML_TEMPLATE
        .replace("__EXCALIDRAW_DATA__", json.dumps(excalidraw_data))
        .replace("__EXPORT_PADDING__", str(padding))
        .replace("__EXPORT_SCALE__", str(scale))
        .replace("__EXPORT_BACKGROUND__", "true" if background else "false")
    )

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context()
        page = context.new_page()

        # Create a temporary HTML file
        with tempfile.NamedTemporaryFile(
            mode="w", suffix=".html", delete=False, encoding="utf-8"
        ) as f:
            f.write(html_content)
            temp_html = f.name

        try:
            print("Rendering diagram...")
            page.goto(f"file://{temp_html}", wait_until="networkidle")

            # Wait for export to complete
            page.wait_for_function("window.exportComplete === true", timeout=30000)

            # Check for errors
            error = page.evaluate("window.exportError")
            if error:
                raise RuntimeError(f"Export failed: {error}")

            # Get the base64 PNG data
            base64_data = page.evaluate("window.exportedPngBase64")
            if not base64_data:
                raise RuntimeError("Export produced no data")

            # Decode and save
            png_data = base64.b64decode(base64_data)
            with open(output_file, "wb") as f:
                f.write(png_data)

            print(f"Saved: {output_file} ({len(png_data)} bytes)")

        finally:
            Path(temp_html).unlink(missing_ok=True)
            browser.close()

    return str(output_file)


def main():
    parser = argparse.ArgumentParser(
        description="Convert Excalidraw diagrams to PNG images",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    %(prog)s diagram.excalidraw
    %(prog)s diagram.excalidraw output.png
    %(prog)s diagram.excalidraw -s 3 --no-background
        """,
    )
    parser.add_argument("input", help="Input .excalidraw file")
    parser.add_argument("output", nargs="?", help="Output PNG file (optional)")
    parser.add_argument(
        "-s", "--scale", type=int, default=2, help="Scale factor (default: 2)"
    )
    parser.add_argument(
        "--no-background",
        action="store_true",
        help="Export with transparent background",
    )
    parser.add_argument(
        "-p", "--padding", type=int, default=20, help="Padding in pixels (default: 20)"
    )

    args = parser.parse_args()

    try:
        output = convert_excalidraw_to_png(
            args.input,
            args.output,
            scale=args.scale,
            background=not args.no_background,
            padding=args.padding,
        )
        print(f"Done: {output}")
    except FileNotFoundError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
    except ValueError as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    main()
