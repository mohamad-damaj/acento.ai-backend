import re

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


    



