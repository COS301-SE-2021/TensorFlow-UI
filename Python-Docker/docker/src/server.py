import os
import json
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'txt', 'py'}

server = Flask(__name__)
server.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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
def upload_file():
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		if file.filename == '':
			flash('No selected file')
			return redirect(request.url)
		if file and allowed_file_runnable(file.filename):
			filename = secure_filename(file.filename)
			saved_path = os.path.join(server.config['UPLOAD_FOLDER', filename])
			file.save(saved_path)

			exec(open(saved_path))

			return redirect(url_for('download_file', name=filename))

# upload script for JSON objects
# TODO convert JSON upload to python code - need structure for this to work
@server.route("/upload-json", methods=['GET', 'POST'])
def upload_file_json():
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		if file.filename == '':
			flash('No selected file')
			return redirect(request.url)
		if file and allowed_file_json(file.filename):
			filename = secure_filename(file.filename)

			runnable = generate_code(file)

			exec(open(runnable))

			return redirect(url_for('download_file', name=filename))

# function to convert JSON objects to Python code
# TODO much more on codegen side
def generate_code(file):
	data = json.loads(file)
	code = ""
	for node in data:
		if node[type] == "variable":
			# declare object
			code += "mock object declaration"
		elif node[type] == "function":
			# declare function
			code += "mock function declaration"
		elif node[type] == "library":
			# import library
			code += "mock library import"
		# somehow create connections and run functions in correct order?
		# need to find a way to order function

	return ""

if __name__ == "__main__":
	server.run(host='0.0.0.0')