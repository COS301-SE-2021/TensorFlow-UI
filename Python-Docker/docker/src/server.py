import os
import sys
import json
import random
from flask import Flask, flash, request, redirect, url_for
from io import StringIO
from contextlib import redirect_stdout
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'txt', 'py'}

server = Flask(__name__)
server.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
server.config['SESSION_TYPE'] = 'memcached'
server.config['SECRET_KEY'] = 'super secret key'

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
@server.route("/upload", methods=['GET', 'POST'])
def upload():
	old_stdout = sys.stdout
	sys.stdout = mystdout = StringIO()

	if 'file' not in request.files:
		print(request.files)
		flash('No file part')
		return "Not in files!"
	file = request.files['file']
	# If the user does not select a file, the browser submits an
	# empty file without a filename.
	if file.filename == '':
		flash('No selected file')
		return redirect(request.url)
	if file and allowed_file_runnable(file.filename):
		# file.save(os.path.join(server.config['UPLOAD_FOLDER'], file.filename))
		file.save("test.py")
		with redirect_stdout(mystdout):
			exec(open("test.py").read())
		return mystdout.getvalue()
	elif request.method == 'GET':
		return "Hello! Please use a POST method!"

if __name__ == "__main__":
	print("Server running!")
	server.run(host='0.0.0.0')