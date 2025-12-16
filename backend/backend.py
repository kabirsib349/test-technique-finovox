from flask import Flask, jsonify, send_from_directory
import os
import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "Le backend fonctionne!"

FILES_DIRECTORY = 'files'

@app.route('/api/files')
def list_files():
    files = []
    for filename in os.listdir(FILES_DIRECTORY):
        path = os.path.join(FILES_DIRECTORY, filename)
        if os.path.isfile(path):
            file_size = os.path.getsize(path)
            last_modified_timestamp = os.path.getmtime(path)
            last_modified_iso = datetime.datetime.fromtimestamp(last_modified_timestamp).isoformat()+"Z"
            files.append({
                'name': filename,
                'size': file_size,
                'last_modified': last_modified_iso
            })
    return jsonify(files)

@app.route('/download/<path:filename>')
def download_file(filename):
    return send_from_directory(FILES_DIRECTORY, filename, as_attachment=True)