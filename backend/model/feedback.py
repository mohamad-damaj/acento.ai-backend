import google.generativeai as genai
import os
from dotenv import load_dotenv


class Gemini:
    def __init__(self):

        load_dotenv()
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-2.0-flash")


    def query_gemini_feedback(self, audio_text, situation, wpm):
        input_index = f"Role:\nYou are a supportive speech language specialist, you are actively talking to the person, so refer to the person directly, use simple words, dont be overly formal.\
            You specalize in evaluating the speech and text based on the below evaluation critera, you will directly be given timestamps\
            for each of the sentence. \n\
            Evaluation Critera:\n\
               1. Filler Words: Count common filler words (“um,” “like,” “you know,” etc.) and note how they affect clarity.\n\
               2. WPM: Give a brief explanation of how comfortable or rushed this rate might feel given the WPM.\n\
               3. Grammar: Rate speech grammar on a scale of Poor/Fair/Good/Excellent, and briefly explain what can be improved by citing examples (dont give any if their grammar is good)\
                from the given text and give timestamps for the examples, ignore puncuation and grammar that is unique to writing.\n\
               4. Word Choice: State how well the words fit the the given situation (formal, semi-formal, casual). Note if certain words improved or removed from clarity.\n\
               5. Comprehensibility: Assess how easy or difficult it is for a reader to grasp that main idea in context with the situation\n\
               6. Content Structure: Look at how the speaker transitions between points, whether they provide signposts and if the main message is well-supported by evidence or stories.\n\
               7. Overall Recommendation: Keeping in mind the given situation, provide one or two sentences with an overall rating or recommendation.\n\
            Text to Evaluate: {audio_text}\n\
            Word per Minute: {wpm}\n\
            Situation: {situation}\n\
            Required Output (Immediately start from 1):\n\
                1. Summarize what filler words were used and talk about their impact on clarify given the situation.\n\
                2. Estimate WPM and discuss if it's too fast, too slow, or appropriate.\n\
                3. Assess grammar, including any mistakes, and provide a brief rating.\n\
                4. Comment on choice of words in context.\n\
                5. Comment on the comprehensibility of the text, identify any elements that distract from the central message, reference them and their timestamp.\n\
                6. Comment on the content structure and how well it is\n\
                7. End with an overall recommendation or conclusion in one or two sentences."

        response = self.model.generate_content(input_index)
        return response.text
    
if __name__ == "__main__":
    Gemini_model = Gemini()
    print(Gemini_model.query_gemini_feedback("I uh um it is um nice to meet you", "formal", 150))
                            

        




    