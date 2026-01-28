#!/usr/bin/env python3
"""
Convert Mermaid diagram files to PNG and SVG formats.

Requires: mermaid-cli (mmdc)
Install via: npm install -g @mermaid-js/mermaid-cli

For custom.css see
https://github.com/mermaid-js/mermaid-cli?tab=readme-ov-file#animating-an-svg-file-with-custom-css
"""

import subprocess
import sys
from pathlib import Path


def check_mmdc_installed() -> bool:
    """Check if mermaid-cli (mmdc) is installed."""
    try:
        subprocess.run(
            ["mmdc", "--version"],
            capture_output=True,
            check=True
        )
        return True
    except (subprocess.CalledProcessError, FileNotFoundError):
        return False


def convert_mermaid(input_file: str, output_format: str) -> bool:
    """
    Convert a Mermaid diagram file to the specified format.

    Args:
        input_file: Path to the .mmd file
        output_format: Output format ('png' or 'svg')

    Returns:
        True if conversion succeeded, False otherwise
    """
    input_path = Path(input_file)

    if not input_path.exists():
        print(f"Error: Input file '{input_file}' not found.")
        return False

    output_path = input_path.with_suffix(f".{output_format}")

    try:
        result = subprocess.run(
            [
                "mmdc",
                "-i", str(input_path),
                "-o", str(output_path),
                "-b", "transparent"  # Transparent background
            ],
            capture_output=True,
            text=True
        )

        if result.returncode == 0:
            print(f"Created: {output_path}")
            return True
        else:
            print(f"Error converting to {output_format}: {result.stderr}")
            return False

    except Exception as e:
        print(f"Error: {e}")
        return False


def main():
    input_file = "timeline.mmd"

    # Allow custom input file via command line argument
    if len(sys.argv) > 1:
        input_file = sys.argv[1]

    # Check if mmdc is installed
    if not check_mmdc_installed():
        print("Error: mermaid-cli (mmdc) is not installed.")
        print("Install it with: npm install -g @mermaid-js/mermaid-cli")
        sys.exit(1)

    print(f"Converting '{input_file}' to PNG and SVG...")

    # Convert to both formats
    png_success = convert_mermaid(input_file, "png")
    svg_success = convert_mermaid(input_file, "svg")

    if png_success and svg_success:
        print("Conversion complete!")
    else:
        print("Some conversions failed.")
        sys.exit(1)


if __name__ == "__main__":
    main()
