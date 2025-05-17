from .feedback.views import bp
import os
from flask import Flask, make_response, request, jsonify
from flask_cors import CORS, cross_origin

cors = CORS()

app = Flask(__name__)
cors.init_app(app, origins=[
              "http://localhost:*", "https://acento-ai.github.io/*"], methods=["GET", "POST"])

app.register_blueprint(bp, url_prefix="/feedback")


@app.route('/')
def hello_world():
    return 'Hello, World!'


port = int(os.environ.get("PORT", 8000))
app.run(host="0.0.0.0", port=port)
