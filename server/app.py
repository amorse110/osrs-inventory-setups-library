#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import *

# Views go here!

@app.route('/')
def index():
    return '<h1>Capstone Project Server</h1>'

class Signup(Resource):
    def post(self):
        username = request.get_json()['username']
        new_user = User(
            username=username,
        )
        password = request.get_json()['password']
        new_user.password_hash = password
        db.session.add(new_user)
        db.session.commit()
        session['user_id'] = new_user.id

        return new_user.to_dict()

api.add_resource(Signup, "/signup")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

