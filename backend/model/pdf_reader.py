import pymupdf4llm as pdfReader


def read_pdf(pdf):
    if pdf is None:
        return None

    md_text = pdfReader.to_markdown(pdf)

    return md_text



