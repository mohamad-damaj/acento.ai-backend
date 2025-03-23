from flask import Flask, request, Blueprint, jsonify, make_response, render_template
from ..model.transcription import Transcriber
from ..model.feedback import Gemini
from ..model.smile import Smile
from ..model.word_utils import wpm
from ..model.pdf_reader import read_pdf
import io

# Create blueprint for endpoints
bp = Blueprint("feedback", __name__)
feedback_model = Gemini()
transcribe_model = Transcriber()
vocal_feature_model = Smile()

@bp.route("/audio", methods=["POST"])
def audio_feedback():
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
        audio_text = ""
        for segment in transcription:
            audio_text += "[%.2fs -> %.2fs] %s\n" % (segment.start, segment.end, segment.text)
            print("[%.2fs -> %.2fs] %s" % (segment.start, segment.end, segment.text))
        print("audio", audio_text)
        print(wpm(audio_text))
        feedback = feedback_model.query_gemini_audio_feedback(audio_text, "formal", wpm(audio_text)) # TODO: fix 2nd and 3rd parameters 
        print(feedback)
    except Exception as e:
        print("error:", e)
        response = make_response(jsonify("failed to generate feedback"))
        return response, 400

    response = make_response(jsonify({
        "feedback": feedback
    }))
    return response, 200


@bp.route("/vocal", methods=["POST"])
def vocal_feedback():
    if "vocal" in request.files:
        vocal = request.files["vocal"]
    else:
        response = make_response(jsonify("failed to receive file"))
        return response, 400 

    print(vocal.filename)
    vocal.save("./file")
    vocal.close()

    try:
        features, std = vocal_feature_model.feature_extract("./file")
        print(features)
    except Exception as e:
        print("error:", e)
        response = make_response(jsonify("failed to generate features"))
        return response, 400
    
    try:
        feedback = feedback_model.query_gemini_vocal_feedback(features, "")
        print(feedback)
    except Exception as e:
        response = make_response(jsonify("failed to generate feedback"))
        return response, 400
        pass

    response = make_response(jsonify({
        "feedback": feedback
    }))
    return response, 200


@bp.route("/resume", methods=["POST"])
def resume_feedback():
    if "resume" in request.files:
        resume = request.files["resume"]
        
    else:
        response = make_response(jsonify("failed to receive file"))
        return response, 400 
    
    if "job_description" in request.files:
        job = request.files["job_description"]
    else:
        job = None

    print(resume.filename)
    resume.save("./file")
    resume.close()

    try:
        text = read_pdf("./file")
        

    except Exception as e:
        print("error:", e)
        response = make_response(jsonify("failed to generate features"))
        return response, 400
    
    try:
        feedback = feedback_model.query_gemini_resume_feedback(text, job)
        print(feedback)
    except Exception as e:
        response = make_response(jsonify("failed to generate feedback"))
        return response, 400
        pass

    response = make_response(jsonify({
        "feedback": feedback
    }))
    return response, 200

