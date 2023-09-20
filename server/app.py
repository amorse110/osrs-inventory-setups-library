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

# @app.route('/')
# def index():
#     return '<h1>Capstone Project Server</h1>'

# ##### WORKING! #####
# @app.route('/signup', methods=['POST'])
# def signup():
#     data = request.json

#     if not data.get('username') or not data.get('password'):
#         return jsonify({"message": "Must include username and password"}), 400
    
#     user = User()
#     user.username = data.get('username')
#     user.password = data.get('password') 

#     db.session.add(user)
#     try:
#         db.session.commit()
#         return jsonify(user.to_dict()), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"message": str(e), "success": False}), 500

# @app.route('/login', methods=['POST'])
# def login():
#     data = request.json

#     user = User.query.filter_by(username=data['username']).first()
#     if user and user.check_password(data['password']):
#         session['logged_in'] = True
#         session['user_id'] = user.id
#         session['username'] = user.username
#         return jsonify(user.to_dict()), 200
#     else:
#         return jsonify({"message": "Incorrect username or password", "success": False}), 401
    
# @app.route('/autologin', methods=['GET'])
# def autologin():
#     user = User.query.filter_by(id=session['user_id']).first()
#     if user:
#         return jsonify(user.to_dict()), 200
#     else:
#         return jsonify({"message": "user not logged in", "success": False}), 401

# @app.route('/logout', methods =['DELETE'])
# def logout():
#     if 'logged_in' in session:
#         session.clear()
#         return jsonify({"message": "Logout successful", "success": True}), 204
#     else:
#         return jsonify({"message": "Logout Failed", "success": False}), 401
    
# @app.route('/items/<slot>', methods=['GET'])
# def get_items_by_slot(slot):
#     items = Item.query.filter_by(slot=slot).all()
#     return jsonify([item.to_dict() for item in items]), 200

# @app.route('/add-setup', methods=['POST'])
# def add_setup():
#     data = request.json

#     if 'user_id' not in session:
#         return jsonify({"message": "user not logged in", "success": False}), 401
    
#     user = User.query.filter_by(id=session['user_id']).first()

#     if not user:
#         return jsonify({"message": "user not found", "success": False}), 404
    
#     if user:
#         setup = Setup(title=data['title'], description=data['description'],
#                       user_id=user.id)
#         db.session.add(setup)
#         db.session.commit()
#         for slot, item_id in data.items():
#             if slot not in ['title', 'description']:
#                 setup_item = SetupItem(setup_id=setup.id, item_id=item_id)
#                 db.session.add(setup_item)
#         db.session.commit()

#         return jsonify({"message": "Setup added successfully", "success": True}), 201
#     else:
#         return jsonify({"message": "user not logged in", "success": False}), 401

# if __name__ == '__main__':
#     app.run(port=5555, debug=True)




####### FlaskRestful #########

class IndexResource(Resource):
    def get(self):
        return '<h1>Capstone Project Server</h1>'

class SignupResource(Resource):
    def post(self):
        data = request.json

        if not data.get('username') or not data.get('password'):
            return {"message": "Must include username and password"}, 400

        user = User()
        user.username = data.get('username')
        user.password = data.get('password')

        db.session.add(user)
        try:
            db.session.commit()
            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e), "success": False}, 500

class LoginResource(Resource):
    def post(self):
        data = request.json

        user = User.query.filter_by(username=data['username']).first()
        if user and user.check_password(data['password']):
            session['logged_in'] = True
            session['user_id'] = user.id
            session['username'] = user.username
            return user.to_dict(), 200
        else:
            return {"message": "Incorrect username or password", "success": False}, 401

class AutologinResource(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()
        if user:
            return user.to_dict(), 200
        else:
            return {"message": "user not logged in", "success": False}, 401

class LogoutResource(Resource):
    def delete(self):
        if 'logged_in' in session:
            session.clear()
            return {"message": "Logout successful", "success": True}, 204
        else:
            return {"message": "Logout Failed", "success": False}, 401

class ItemsResource(Resource):
    def get(self, slot):
        items = Item.query.filter_by(slot=slot).all()
        return [item.to_dict() for item in items], 200

class AddSetupResource(Resource):
    def post(self):
        data = request.json

        if 'user_id' not in session:
            return {"message": "user not logged in", "success": False}, 401

        user = User.query.filter_by(id=session['user_id']).first()

        if not user:
            return {"message": "user not found", "success": False}, 404

        if user:
            setup = Setup(title=data['title'], description=data['description'], user_id=user.id)
            db.session.add(setup)
            db.session.commit()
            for slot, item_id in data.items():
                if slot not in ['title', 'description']:
                    setup_item = SetupItem(setup_id=setup.id, item_id=item_id)
                    db.session.add(setup_item)
            db.session.commit()

            return {"message": "Setup added successfully", "success": True}, 201
        else:
            return {"message": "user not logged in", "success": False}, 401


# Associate Resources with URLs
api.add_resource(IndexResource, '/')
api.add_resource(SignupResource, '/signup')
api.add_resource(LoginResource, '/login')
api.add_resource(AutologinResource, '/autologin')
api.add_resource(LogoutResource, '/logout')
api.add_resource(ItemsResource, '/items/<slot>')
api.add_resource(AddSetupResource, '/add-setup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)