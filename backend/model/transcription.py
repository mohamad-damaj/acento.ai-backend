from faster_whisper import WhisperModel
import os


os.add_dll_directory(r"C:\Program Files\NVIDIA\CUDNN\v9.8\bin\12.8\cudnn_ops64_9.dll")

class Transcriber():
    def __init__(self):
        self.model = WhisperModel("medium", device="cpu", compute_type="int8")

    def transcription(self, audio_path): 

        segments, _ = self.model.transcribe(audio_path, beam_size=3)

        return segments


if __name__=="__main__":
    transcriber_model = Transcriber()

    segments = transcriber_model.transcription(audio_path=r"C:\Users\user\Desktop\speech-articulator\testing\test.opus")

    for segment in segments:
        print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))