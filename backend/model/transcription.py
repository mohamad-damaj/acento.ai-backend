from faster_whisper import WhisperModel

def transcription(audio_path): 
    model = WhisperModel("large-v3", device="cpu", compute_type="int8")

    segments, info = model.transcribe(audio_path, beam_size=5)

    return (segments, info)


if __name__=="__main__":
    print(transcription(r"testing\test.mp3"))

