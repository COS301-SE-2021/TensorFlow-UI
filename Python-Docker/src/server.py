import os
from flask import Flask, flash, request, redirect, url_for
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/uploads'
ALLOWED_EXTENSIONS = {'txt', 'py'}

server = Flask(__name__)
server.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@server.route("/")
def hello():
	return "Hello World!"

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
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(server.config['UPLOAD_FOLDER', filename]))

			# add in run file functionality here
			exec(open(os.path.join(server.config['UPLOAD_FOLDER', filename])).read())

			return redirect(url_for('download_file', name=filename))

# TODO convert JSON upload to python code
@server.route("/upload-json", methods=['GET', 'POST'])
def upload_file():
	if request.method == 'POST':
		if 'file' not in request.files:
			flash('No file part')
			return redirect(request.url)
		file = request.files['file']
		if file.filename == '':
			flash('No selected file')
			return redirect(request.url)
		if file and allowed_file(file.filename):
			filename = secure_filename(file.filename)
			file.save(os.path.join(server.config['UPLOAD_FOLDER', filename]))

			# add in run file functionality here
			exec(open(os.path.join(server.config['UPLOAD_FOLDER', filename])).read())

			return redirect(url_for('download_file', name=filename))

if __name__ == "__main__":
	server.run(host='0.0.0.0')