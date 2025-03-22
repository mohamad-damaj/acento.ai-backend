from flask import Flask, make_response, request, jsonify
from flask_cors import CORS, cross_origin

cors = CORS()

def create_app():
    app = Flask(__name__)
    
    cors.init_app(app, origins=["http://localhost:*"], methods=["GET", "POST"])

    from backend import feedback
    app.register_blueprint(feedback.bp, url_prefix="/feedback")

    return app


