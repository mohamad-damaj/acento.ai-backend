import whisper

def transcription(audio_path): #audio must be .wav
    model = whisper.load_model("base")

    result = model.transcribe(audio_path)




