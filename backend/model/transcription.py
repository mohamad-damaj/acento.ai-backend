from faster_whisper import WhisperModel

def transcription(audio_path): 
    model = WhisperModel("large-v3", device="cpu", compute_type="int8")

    segments, info = model.transcribe(audio_path, beam_size=5, word_timestamps=True)

    return segments


if __name__=="__main__":
    segments = transcription(r"testing\test.mp3")

    for segment in segments:
        print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))

