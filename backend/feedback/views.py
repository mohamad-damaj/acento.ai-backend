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
    audio.save("./file.ogg")
    # remember to error handle!
    try:
        transcription = transcribe_model.transcription("./file.ogg") # issue is here
    except Exception as e:
        print("error:", e)
        response = make_response(jsonify("failed to load audio"))
        return response, 400

    try: 
        audio_text = " ".join([segment.text for segment in transcription])
        feedback = feedback_model.query_gemini_feedback(audio_text, "formal", 150)
        print(feedback)
    except Exception as e:
        print("error:", e)
        response = make_response(jsonify("failed to generage feedback"))
        return response, 400

    response = make_response(jsonify({
        "feedback": feedback
    }))
    return response, 200


@bp.route("/", methods=["GET"])
def index():
    return make_response({"feedback": "hello world"})