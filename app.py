from flask import Flask, render_template, request, redirect, url_for, session
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# In-memory data storage for demonstration purposes
users = []
current_user = None

class CountdownEvent:
    def __init__(self, name, event_date):
        self.name = name
        self.event_date = event_date
        self.checklist = []
        self.comments = []
        self.photos_videos = []

class Trip:
    def __init__(self, name, profile_picture):
        self.name = name
        self.profile_picture = profile_picture
        self.countdown_events = []
        self.group_chat = []

class User:
    def __init__(self, username, password, profile_picture):
        self.username = username
        self.password = password
        self.profile_picture = profile_picture
        self.friend_list = []
        self.trips = []

@app.route('/')
def index():
    if 'username' in session:
        user = next((u for u in users if u.username == session['username']), None)
        return render_template('index.html', user=user)
    return render_template('index.html', user=None)

@app.route('/login', methods=['POST'])
def login():
    username = request.form['username']
    password = request.form['password']
    global current_user
    current_user = next((u for u in users if u.username == username and u.password == password), None)
    if current_user:
        session['username'] = username
        return redirect(url_for('index'))
    return 'Invalid credentials', 401

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect(url_for('index'))

@app.route('/signup', methods=['POST'])
def signup():
    username = request.form['username']
    password = request.form['password']
    profile_picture = request.form['profile_picture']
    new_user = User(username, password, profile_picture)
    users.append(new_user)
    return redirect(url_for('index'))

@app.route('/create_trip', methods=['POST'])
def create_trip():
    if 'username' in session:
        trip_name = request.form['trip_name']
        profile_picture = request.form['profile_picture']
        user = next((u for u in users if u.username == session['username']), None)
        new_trip = Trip(trip_name, profile_picture)
        user.trips.append(new_trip)
        return redirect(url_for('index'))
    return 'Unauthorized', 401

if __name__ == '__main__':
    app.run(debug=True)
