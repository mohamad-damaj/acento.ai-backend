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
    if "audio" in request.files:
        audio = request.files["audio"]
    else:
        response = make_response(jsonify("failed to receive file"))
        return response, 400 
    print(audio.filename)
    audio.save("./file")
    audio.close()
    # remember to error handle!
    try:
        transcription = transcribe_model.transcription("./file") # issue is here
    except Exception as e:
        print("error:", e)
        response = make_response(jsonify("failed to load audio"))
        return response, 400

    try: 
        audio_text = " ".join([segment.text for segment in transcription])
        print("audio", audio_text)
        feedback = feedback_model.query_gemini_audio_feedback(audio_text, "formal", 150) # TODO: fix 2nd and 3rd parameters 
        print(feedback)
    except Exception as e:
        print("error:", e)
        response = make_response(jsonify("failed to generate feedback"))
        return response, 400

    response = make_response(jsonify({
        "feedback": feedback
    }))
    return response, 200
