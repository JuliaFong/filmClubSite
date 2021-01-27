from flask import Flask, render_template, request, url_for, redirect
from google.cloud import datastore
from google.auth.transport import requests
import google.oauth2.id_token

firebase_request_adapter = requests.Request()
app = Flask(__name__)
datastore_client = datastore.Client()

@app.route('/', methods = ['POST', 'GET'])
def root():
    id_token = request.cookies.get("token")
    claims = None
    error_message = None
    
    if id_token:
        try:
            claims = google.oauth2.id_token.verify_firebase_token(
                id_token, firebase_request_adapter)
            
        except ValueError as exc:
            error_message = str(exc)
        
    else: 
        return redirect(url_for("login"))
        
        return render_template(
            'index.html',
            user_data=claims, error_message=error_message, id_token=id_token)
    
    