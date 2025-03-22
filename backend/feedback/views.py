from flask import Flask, request, Blueprint, jsonify, make_response, render_template
from ..model.transcription import Transcriber
from ..model.feedback import Gemini
import io

# Create blueprint for endpoints
bp = Blueprint("feedback", __name__)
feedback_model = Gemini()
transcribe_model = Transcriber()

@bp.route("/", methods=["POST"])
def feedback():
    if "file" in request.files:
        audio = request.files["file"]
    else:
        response = make_response(jsonify("failed to receive file"))
        return response, 400 
    
    print(audio.read())
    # remember to error handle!
    try:
        # read the bytes into an opus
        buffer = io.BytesIO(audio.read())
        buffer.name = "file.mp3"  # this is the important line
        transcribed = transcribe_model.transcription(buffer) # issue is here
        print(transcribed)
    except Exception as e:
        print("error:", e)
        response = make_response(jsonify("failed to load audio"))
        return response, 400

    # audio_text = " ".join([segment.text for segment in transcription])
    # feedback = feedback_model.query_gemini_feedback("hey this is a test", "formal", 150)
    # print(feedback)

    # response = make_response(jsonify({
    #     "feedback": feedback
    # }))
    # return response, 200
    response = make_response(jsonify({
        "feedback": "hello world"
    }))
    return response, 200


@bp.route("/", methods=["GET"])
def index():
    return make_response({"feedback": "hello world"})