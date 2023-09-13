#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, db

# Views go here!


@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    user = User(
        first_name=data['first_name'],
        last_name=data['last_name'],
        email=data['email'],
        username=data['username']
    )
    user.password = data['password']
    
    db.session.add(user)
    db.session.commit()

    return jsonify({"User registered successfully"})

@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

