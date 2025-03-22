from faster_whisper import WhisperModel

class transcriber():
    def __init__(self):
        self.model = WhisperModel("medium", device="cpu", compute_type="int8")

    def transcription(self, audio_path): 

        segments, _ = self.model.transcribe(audio_path, beam_size=3)

        return segments


if __name__=="__main__":
    transcriber_model = transcriber()

    segments = transcriber_model.transcription(audio_path=r"testing\test.mp3")

    for segment in segments:
        print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))