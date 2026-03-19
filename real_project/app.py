from flask import Flask, render_template, request, send_from_directory
import os

app = Flask(__name__, template_folder='.', static_folder='.')

# --- THE FIX FOR 404 ERRORS ---
# This tells Flask how to find your CSS, JS, and Images folder
@app.route('/<path:filename>')
def serve_static(filename):
    return send_from_directory('.', filename)

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory('images', filename)

# --- YOUR EXISTING ROUTES ---
@app.route('/')
def home():
    return render_template('hi.html')

@app.route('/contact.html')
def contact():
    return render_template('contact.html')

@app.route('/product.html')
def products():
    return render_template('product.html')

@app.route('/submit', methods=['POST'])
def handle_form():
    name = request.form.get('name')
    email = request.form.get('email')
    subject = request.form.get('subject')
    message = request.form.get('message')

    entry = f"--- NEW MESSAGE ---\nName: {name}\nEmail: {email}\nSubject: {subject}\nMessage: {message}\n\n"

    with open("messages.txt", "a", encoding="utf-8") as f:
        f.write(entry)

    return """
    <div style="text-align:center; padding:50px; font-family:sans-serif;">
        <h1 style="color:#FACC15; background:black; display:inline-block; padding:10px 20px;">Message Received!</h1>
        <p>Thank you, we will get back to you shortly.</p>
        <a href="/contact.html" style="color:black; font-weight:bold; text-decoration:none; border:2px solid black; padding:10px 20px;">Return to Site</a>
    </div>
    """

if __name__ == '__main__':
    app.run(debug=True, port=5000)