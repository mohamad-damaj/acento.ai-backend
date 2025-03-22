import google.generativeai as genai
import os
from dotenv import load_dotenv


class Gemini:
    def __init__(self):

        load_dotenv()
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-2.0-flash")


    def query_gemini_feedback(self, audio_text, situation, wpm):
        input_index = f"Role:\nYou are a speech language specialist, you are actively talking to the person, so talk using 'you' but speak like you're talking to a professor as a student, you simple words. You specalize in evaluating the \
            speech and text based on filler words, words per minute, grammar, and word choice. \n\
            Evaluation Critera:\n\
               1. Filler Words: Count common filler words (“um,” “like,” “you know,” etc.) and note how they affect clarity.\n\
               2. WPM: Give a brief explanation of how comfortable or rushed this rate might feel given the WPM.\n\
               3. Grammar: Rate speech grammar on a scale of “Poor/Fair/Good/Excellent,” and briefly explain why citing examples from the given text, \n\
                ignore puncuation and grammar that is unique to writing.\n\
               4. Word Choice: State how well the words fit the the given situation (formal, semi-formal, casual). Note if certain words improved or detracted from clarity.\n\
               5. Overall Recommendation: Keeping in mind the given situation, provide one or two sentences with an overall rating or recommendation.\n\
            Text to Evaluate: {audio_text}\n\
            Word per Minute: {wpm}\n\
            Situation: {situation}\n\
            Required Output (Immediately start from 1):\n\
                1. Summarize what filler words were used and talk about their impact on clarify given the situation.\n\
                2. Estimate WPM and discuss if it's too fast, too slow, or appropriate.\n\
                3. Assess grammar, including any mistakes, and provide a brief rating.\n\
                4. Comment on choice of words in context.\n\
                5. End with an overall recommendation or conclusion in one or two sentences."

        response = self.model.generate_content(input_index)
        return response.text
    
if __name__ == "__main__":
    Gemini_model = Gemini()
    print(Gemini_model.query_gemini_feedback("I uh um it is um nice to meet you", "formal", 150))
                            

        




    