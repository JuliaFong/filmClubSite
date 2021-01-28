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
        
        
@app.route('/login', methods= ['POST', 'GET'])
def login():
    id_token = request.cookies.get("token")
    claims = None
    error_message = None
    
    if id_token:
        try:
            claims = google.oauth2.id_token.verify_firebase_token(
                id_token, firebase_request_adapter
            )
            
        except ValueError as exc:
            error_message = str(exc)
            
    return render_template(
    'login.html',
        user_data=claims, error_message=error_message, id_token=id_token)
    
@app.route('/pastmovies', methods = ['POST', 'GET']) 
def pastmovies():
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
        'pastmovies.html',
            user_data=claims, error_message=error_message, id_token=id_token)  

@app.route('/suggestamovie', methods = ['POST', 'GET'])
def suggestamovie():
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
        return redirect(url_for("Login"))
    
    return render_template(
        'suggestamovie.html',
            user_data=claims, error_message=error_message, id_token=id_token)
    

 
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)
    
    