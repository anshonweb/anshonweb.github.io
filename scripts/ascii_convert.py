#!/usr/bin/env python3
import argparse
from PIL import Image

ASCII_CHARS = "@%#*+=-:. "


def pixel_to_ascii(pixel: int) -> str:
    return ASCII_CHARS[int(pixel / 256 * len(ASCII_CHARS))]


def image_to_ascii(image_path: str, width: int = 120) -> str:
    img = Image.open(image_path).convert("L")
    orig_w, orig_h = img.size
    aspect = orig_h / orig_w
    height = int(width * aspect * 0.45)
    img = img.resize((width, height))
    pixels = list(img.getdata())
    rows = []
    for i in range(height):
        row = "".join(pixel_to_ascii(pixels[i * width + j]) for j in range(width))
        rows.append(row)
    return "\n".join(rows)


def main():
    parser = argparse.ArgumentParser(description="Convert image to ASCII art")
    parser.add_argument("--input", required=True, help="Path to input image")
    parser.add_argument("--output", default="ascii_output.txt", help="Output text file")
    parser.add_argument("--width", type=int, default=120, help="Width in characters")
    args = parser.parse_args()

    ascii_art = image_to_ascii(args.input, args.width)

    with open(args.output, "w", encoding="utf-8") as f:
        f.write(ascii_art)

    row_count = ascii_art.count("\n") + 1
    print(f"Saved to: {args.output}")
    print(f"Dimensions: {args.width} cols x {row_count} rows")


if __name__ == "__main__":
    main()
