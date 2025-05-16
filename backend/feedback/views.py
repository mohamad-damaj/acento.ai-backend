from flask import Flask, request, Blueprint, jsonify, make_response, render_template
from backend.model.feedback import Gemini
from backend.model.word_utils import wpm, clean
from backend.model.pdf_reader import read_pdf

import io
from flask_cors import cross_origin
import traceback
import subprocess

bp = Blueprint("feedback", __name__)
feedback_model = Gemini()

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
    
    if "context" in request.files:
        context = request.files["context"]
    else:
        context = None

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
        feedback = feedback_model.query_gemini_resume_feedback(text, job, context=context)
        print(feedback)
    except Exception as e:
        response = make_response(jsonify("failed to generate feedback"))
        return response, 400
        pass

    response = make_response(jsonify(clean(feedback)))
    response.headers["Content-Type"] = "application/json"
    return response, 200

