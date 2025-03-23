import google.generativeai as genai
import os
from dotenv import load_dotenv


class Gemini:
    def __init__(self):

        dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
        load_dotenv(dotenv_path)
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-2.0-flash")


    def query_gemini_feedback(self, audio_text, situation, wpm):
        input_index = f"""Role:
        You are a supportive speech language specialist, you are actively talking to the person, so refer to the person directly, use simple words, dont be overly formal.\
            You specalize in evaluating the speech and text based on the below evaluation critera, you will directly be given timestamps\
            for each of the sentence. 
            Evaluation Critera:
               1. Filler Words: Count common filler words (“um,” “like,” “you know,” etc.) and note how they affect clarity.
               2. WPM: Give a brief explanation of how comfortable or rushed this rate might feel given the WPM.
               3. Grammar: Rate speech grammar on a scale of Poor/Fair/Good/Excellent, and briefly explain what can be improved by citing examples (dont give any if their grammar is good)\
                from the given text and give timestamps for the examples, ignore puncuation and grammar that is unique to writing.
               4. Word Choice: State how well the words fit the the given situation (formal, semi-formal, casual). Note if certain words improved or removed from clarity.
               5. Comprehensibility: Assess how easy or difficult it is for a reader to grasp that main idea in context with the situation
               6. Content Structure: Look at how the speaker transitions between points, whether they provide signposts and if the main message is well-supported by evidence or stories.
               7. Overall Recommendation: Keeping in mind the given situation, provide one or two sentences with an overall rating or recommendation.
            Text to Evaluate: {audio_text}
            Word per Minute: {wpm}
            Situation: {situation}
            Required Output:
                1. Summarize what filler words were used and talk about their impact on clarify given the situation.
                2. Estimate WPM and discuss if it's too fast, too slow, or appropriate.
                3. Assess grammar, including any mistakes, and provide a brief rating.
                4. Comment on choice of words in context.
                5. Comment on the comprehensibility of the text, identify any elements that distract from the central message, reference them and their timestamp.
                6. Comment on the content structure and how well it is
                7. End with an overall recommendation or conclusion in one or two sentences.
            ENSURE TO RETURN THE OUTPUT IN THE FOLLOWING FORMAT: {{"filler_words":"<filler words information>", "grammar": "<grammar information>", ...\}}
                    """

        response = self.model.generate_content(input_index)
        return response.text
    

    def query_gemini_vocal_feedback(self, audio_features, situation):
        input_index = f"""You are an advanced language model specializing in acoustic analysis and speech coaching. The user wants to improve their articulation for {situation}.

                        They have provided the following summary of audio features extracted via openSMILE:

                        {audio_features}

                        Each column represents a key dimension of their speech (e.g., pitch in semitones, average loudness, spectral balance, etc.). Please analyze these metrics and determine how the speaker’s articulation, clarity, and expressiveness could be improved specifically for {situation}. 

                        In your response, please:
                        • Evaluate the user’s pitch variation, loudness, speaking rate, and overall vocal dynamics based on the provided data.
                        • Identify potential weaknesses (e.g., monotone pitch, insufficient volume, overly fast tempo).
                        • Offer clear, actionable tips to help the user become more articulate—tailoring advice to {situation}.
                        • Explain any relevant terminology (e.g., semitone, RMS loudness) in plain language so the user can understand how to adjust their speech.

                        Provide your feedback in concise paragraphs or bullet points so the user can easily follow your recommendations."""
        response = self.model.generate_content(input_index)
        return response.text
    
if __name__ == "__main__":
    Gemini_model = Gemini()
    print(Gemini_model.query_gemini_feedback("I uh um it is um nice to meet you", "formal", 150))
                            

        




    