import google.generativeai as genai
import os
from dotenv import load_dotenv



def query_gemini_feedback(audio_text):
    model = genai.GenerativeModel('gemini-2.0-flash')


    load_dotenv()
    genai.configure(api_key=os.getenv("GEMINI_API_KEY"))