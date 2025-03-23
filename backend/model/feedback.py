import google.generativeai as genai
import os
from dotenv import load_dotenv


class Gemini:
    def __init__(self):

        dotenv_path = os.path.join(os.path.dirname(__file__), ".env")
        load_dotenv(dotenv_path)
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = genai.GenerativeModel("gemini-2.0-flash")


    def query_gemini_audio_feedback(self, audio_text, situation, wpm, context=None):
        input_index = f"""Role:
        You are a supportive speech language specialist, you are actively talking to the person, so refer to the person directly, use simple words, dont be overly formal.\
            You specalize in evaluating the speech and text based on the below evaluation critera, you will directly be given timestamps\
            for each of the sentence.

            Context:
            The user has received the following previous feedback:
            {context}

            Do not repeat that same feedback. Instead, refine or expand upon it if there are new insights to add.
            If no changes are necessary, confirm that the user can proceed with the guidance already shared. 
            Evaluation Critera:
               1. Filler Words: Count common filler words (“um,” “like,” “you know,” etc.) and note how they affect clarity.
               2. WPM: Give a brief explanation of how comfortable or rushed this rate might feel given the WPM.
               3. Grammar: Rate speech grammar on a scale of Poor/Fair/Good/Excellent, and briefly explain what can be improved by citing examples (dont give any if their grammar is good)\
                from the given text and give timestamps for the examples, ignore punctuation and grammar that is unique to writing.
               4. Word Choice: State how well the words fit the the given situation (formal, semi-formal, casual). Note if certain words improved or removed from clarity.
               5. Comprehensibility: Assess how easy or difficult it is for a reader to grasp that main idea in context with the situation
               6. Content Structure: Look at how the speaker transitions between points, whether they provide signposts and if the main message is well-supported by evidence or stories.
               7. Overall Recommendation: Keeping in mind the given situation, provide one or two sentences with an overall rating or recommendation.
            Text to Evaluate: {audio_text}
            Word per Minute: {wpm}
            Situation: {situation}
            IMPORTANT:
            You must return your answer in EXACTLY the following JSON format (no extra keys, text, or commentary):
            Required Output:
                1. Summarize what filler words were used and talk about their impact on clarify given the situation.
                2. Estimate WPM and discuss if it's too fast, too slow, or appropriate.
                3. Assess grammar, including any mistakes, and provide a brief rating.
                4. Comment on choice of words in context.
                5. Comment on the comprehensibility of the text, identify any elements that distract from the central message, reference them and their timestamp using [].
                6. Comment on the content structure and how well it is
                7. End with an overall recommendation or conclusion in one or two sentences.
                Reference any timestamp using []
            ENSURE TO RETURN THE OUTPUT IN THE FOLLOWING FORMAT: {{"Filler_words":"<filler words information>", "Grammar": "<grammar information>", ...\}}
                    """

        response = self.model.generate_content(input_index)
        return response.text
    

    def query_gemini_vocal_feedback(self, audio_features, situation, context=None):
        input_index = f"""Role:
        You are a supportive speech-language specialist, speaking directly to the user in simple, informal language.
        You specialize in analyzing machine-collected speech metrics that the user does not fully understand, so do not reference specific numbers.
        Instead, interpret it for them in plain language.

        The user wants to improve their articulation for: {situation}.
        Context:
        The user has received the following previous feedback:
        {context}

        Do not repeat that same feedback. Instead, refine or expand upon it if there are new insights to add.
        If no changes are necessary, confirm that the user can proceed with the guidance already shared.

        Required Output:
            1. Evaluate the user's pitch variation, loudness, speaking rate, and overall vocal dynamics based on the provided data.
            2. Identify potential weaknesses (e.g., monotone pitch, insufficient volume, overly fast tempo).
            3. Offer concise, actionable tips to help the user become more articulate, specifically for {situation}.

        Audio Feature Data: {audio_features}

        IMPORTANT:
        You must return your answer in EXACTLY the following JSON format (no extra keys, text, or commentary):

        {{
        "Vocal Dynamics": "<Summarize how the user sounds overall>",
        "Weaknesses": "<Highlight their potential weaknesses>",
        "Advice": "<Give clear suggestions for improvement>"
        }}"""
        response = self.model.generate_content(input_index)
        return response.text
    
    def query_gemini_resume_feedback(self, resume, job_description = None):
        
        input_index = f"""You are a ResumeChecker, an expert in optimizing resumes for recruitment. Prove a deep analysis of the following resume:
        
        Resume = {resume}
        Job Description (if applicable): {job_description}

        Required Output:
        Your Strengths: List key strengths of the resume.
        Improvements: Suggest specific improvements with specific appliable recommendations.
        Brevity: Rate the brevity of the writing out of 10
        Style: Rate the word style out of 10
        Strucuture: Rate the strucutre of the resume out of 10
        Skills: Rate the skills present in the resume out of 10
        ATS Compatibility: Give an ATS compatibility score out of 100 with respect to job description, if it is None, then do it with respect to a generic job in the field
        ATS Improvements: Suggest specific improvements to increase ATS score.
        IMPORTANT:
        You must return your answer in EXACTLY the following JSON format (no extra keys, text, or commentary):
        
        ENSURE TO RETURN THE OUTPUT IN THE FOLLOWING FORMAT: 
        {{"Your Strengths":"<strengths information>", "Improvements": "<improvement information>", ...\}}

        """
        response = self.model.generate_content(input_index)
        return response.text


    


if __name__ == "__main__":
    Gemini_model = Gemini()
    print(Gemini_model.query_gemini_feedback("I uh um it is um nice to meet you", "formal", 150, """{"filler_words": "Okay, I noticed you used "uh" and "um" quite a bit. In a formal setting, these can make you sound a little less confident. Try to pause instead – it can give you time to think and make you sound more in control.", "WPM": "Your pace is at 150 words per minute, which is a pretty good speed. It's not too fast, so people should be able to follow you easily.", "grammar": "Your grammar is good! I don't see any errors that need fixing.", "word_choice": "The phrase "nice to meet you" is perfectly fine and appropriate for a formal introduction. Good job!", "comprehensibility": "The message is very simple and easy to understand. However, the filler words at the beginning ("I uh um it is um nice to meet you") might distract your listener in a formal setting.", "content_structure": "Since this is a short greeting, there isn't much structure to discuss. It's direct and to the point, which is good.", "overall_recommendation": "Focus on minimizing those filler words to boost your confidence. Overall, you're off to a good start!"}"""))
                            

        




    