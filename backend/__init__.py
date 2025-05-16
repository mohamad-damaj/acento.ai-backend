from flask import Flask, make_response, request, jsonify
from flask_cors import CORS, cross_origin

cors = CORS()


app = Flask(__name__)

cors.init_app(app, origins=["http://localhost:*"], methods=["GET", "POST"])

from backend import feedback
app.register_blueprint(feedback.bp, url_prefix="/feedback")

app.run(host='0.0.0.0')



