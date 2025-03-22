import google.generativeai as genai
import os
from dotenv import load_dotenv


class Gemini:
    def __innit__(self):

        load_dotenv()
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        model = genai.GenerativeModel('gemini-2.0-flash')


    def query_gemini_feedback(audio_text, situation):
        input_index = ""
        




    