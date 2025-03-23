import re
import json

def count(text):

    lines = text.splitlines()
    
    total_word_count = 0
    
    for line in lines:
        line_without_brackets = re.sub(r'\[.*?\]', '', line)
        
        words = line_without_brackets.strip().split()
        
        total_word_count += len(words)
    
    return total_word_count


def extract(text):


    end_times = re.findall(r'->\s*([\d.]+)s\]', text)

    end_times_float = [float(t) for t in end_times]
    
    return max(end_times_float)/60

def wpm(text):

    return int(count(text)/extract(text))

def clean(text):
    cleaned_text = re.sub(r'^```json\s*', '', text, flags=re.IGNORECASE)
    cleaned_text = re.sub(r'```$', '', cleaned_text, flags=re.IGNORECASE).strip()
    
    # Parse the cleaned text into a JSON object
    print(cleaned_text)
    json_obj = json.loads(cleaned_text)

    return json_obj

if __name__ == "__main__":
    text = """```json
    {
    "Filler_words": "I didn't notice any filler words, so your speech is nice and clear!",
    "WPM": "Your pace at 194 WPM seems pretty good and comfortable for a formal setting.",
    "Grammar": "Your grammar is excellent! I don't see any errors.",
    "Word_Choice": "Your word choices are spot-on for a formal presentation. You're using sophisticated language that fits the context well.",
    "Comprehensibility": "The ideas are really easy to follow. The details you include, like the 'typewriter landing page' [0.00s -> 4.00s] and the 'navigation bar' [10.00s -> 17.00s], help me picture exactly what you're describing.",
    "Content_Structure": "You're doing a good job of laying out the features of the website in a logical order, which makes it easy to understand how each part contributes to the overall design.",
    "Overall_Recommendation": "Keep up the excellent work! Your clear and well-structured presentation is easy to follow and understand."
    }
    ```"""
    
    word = clean(text)
    print(word)



