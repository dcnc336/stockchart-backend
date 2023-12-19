import os
from flask import Flask, request, jsonify, send_file ,make_response,render_template
from flask_cors import CORS
from time import perf_counter

app = Flask(__name__)

CORS(app)

@app.route('/get_indicator', methods=['POST'])
def get_indicator():
    print(request)
    return make_response('test server')

if __name__ == '__main__':
    app.run(host='0.0.0.0',port='8000', debug=True)

