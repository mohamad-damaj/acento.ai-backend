import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()

print(os.getenv("⁠GEMINI_API_KEY"))
genai.configure(api_key=os.getenv("⁠GEMINI_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")

audio_file_path = "../testing/test.mp3"

question = """
You are a professional audio analyzer. 

First tell me how long this audio file is.

Given this audio file, give me precise analysis of the tonal shifts within
the audio file. Give me the time stamps of when different tonal qualities were
present.

Using these extracted tonal qualities, begin with compliments on how the speech was well-done then 
provide constructive criticism on how the speaker could improve their speech, especially with regards to their
tone.


"""

upload_file = genai.upload_file(audio_file_path)

response = model.generate_content([upload_file, question])

print(response.text)