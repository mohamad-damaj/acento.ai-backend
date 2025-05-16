import os
from flask import Flask, make_response, request, jsonify
from flask_cors import CORS, cross_origin

cors = CORS()


app = Flask(__name__)

cors.init_app(app, origins=["http://localhost:*"], methods=["GET", "POST"])

from backend import feedback
app.register_blueprint(feedback.bp, url_prefix="/feedback")

@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)


