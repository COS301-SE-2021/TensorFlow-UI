import os
import sys
import json
from flask import Flask, flash, request, redirect, url_for
from flask_cors import CORS
from io import StringIO
from contextlib import redirect_stdout
from werkzeug.utils import secure_filename

ALLOWED_EXTENSIONS = {'txt', 'py'}
UPLOAD_FOLDER = "."

server = Flask(__name__)
server.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
server.config['SECRET KEY'] = "haha very secret 123"
server.secret_key = "haha very secret 123"

CORS(server)

def allowed_file_runnable(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_file_json(filename):
	return '.' in filename and \
		filename.rsplit('.', 1)[1].lower() == 'json'

# greeting function to test connection
@server.route("/")
def hello():
	return "Hello World!"

# upload function for compiled, completed scripts
# TODO make sure console readings etc are displayed to user on webpage
@server.route("/upload", methods=['POST'])
def upload_file():
	old_stdout = sys.stdout
	sys.stdout = mystdout = StringIO()
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part')
			return "No file part"
		file = request.files['file']
		if file.filename == '':
			flash('No selected file')
			return "No selected file!"
		if file and allowed_file_runnable(file.filename):
			file.save("uploaded.py")
			print("File saved", file=sys.stderr)
			try:
				exec(open("uploaded.py").read())
				return mystdout.getvalue()
			except:
				return "Program error! Please check the program and code, and ensure its correctness."
			
			

# upload function for compiled, completed scripts
# TODO make sure console readings etc are displayed to user on webpage
@server.route("/upload-edot", methods=['POST'])
def upload_file_new():
	old_stdout = sys.stdout
	sys.stdout = mystdout = StringIO()
	flash("Getting file from request...")
	file = request.files['file']
	flash("Got file!")
	if file:
		flash("Running now...")
		filename = secure_filename(file.filename)
		saved_path = os.path.join(server.config['UPLOAD_FOLDER', filename])
		file.save("code.py")
		exec(open("code.py"))
		return mystdout.getvalue()
	else:
		return "Didn't get file!"

if __name__ == "__main__":
	server.run(host='0.0.0.0')