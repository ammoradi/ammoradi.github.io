from pathlib import Path

import pypdfium2 as pdfium


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "Amir_Mohammad_Moradi_Resume.pdf"
OUTPUT = ROOT / "public" / "resume-preview.png"


def main() -> None:
    document = pdfium.PdfDocument(SOURCE)
    if len(document) != 1:
        raise ValueError(f"Expected a one-page resume, found {len(document)} pages")

    page = document[0]
    image = page.render(scale=2.5).to_pil().convert("RGB")
    image.save(OUTPUT, format="PNG", optimize=True)


if __name__ == "__main__":
    main()
