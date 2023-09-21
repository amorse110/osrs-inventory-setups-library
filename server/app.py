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

####### FlaskRestful #########

class IndexResource(Resource):
    def get(self):
        return '<h1>Capstone Project Server</h1>'

api.add_resource(IndexResource, '/')

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

            session['logged_in'] = True
            session['user_id'] = user.id
            session['username'] = user.username
            
            return user.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {"message": str(e), "success": False}, 500

api.add_resource(SignupResource, '/signup')

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

api.add_resource(LoginResource, '/login')

class AutologinResource(Resource):
    def get(self):
        user = User.query.filter_by(id=session['user_id']).first()
        if user:
            return user.to_dict(), 200
        else:
            return {"message": "user not logged in", "success": False}, 401

api.add_resource(AutologinResource, '/autologin')

class LogoutResource(Resource):
    def delete(self):
        if 'logged_in' in session:
            session.clear()
            return {"message": "Logout successful", "success": True}, 204
        else:
            return {"message": "Logout Failed", "success": False}, 401

api.add_resource(LogoutResource, '/logout')

class ItemsResource(Resource):
    def get(self, slot):
        items = Item.query.filter_by(slot=slot).all()
        return [item.to_dict() for item in items], 200

api.add_resource(ItemsResource, '/items/<slot>')

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

api.add_resource(AddSetupResource, '/add-setup')

class UserSetupsResource(Resource):
    def get(self):
        if 'user_id' not in session:
            return {'message': 'user not logged in', 'success': False}, 401
        
        user_id = session['user_id']
        user = User.query.get(user_id)

        if not user:
            return {"message": "user not found", "success": False}, 404
        
        setups = user.setups
        serialized_setups = [setup.to_dict() for setup in setups]

        return serialized_setups, 200
    
api.add_resource(UserSetupsResource, '/user-setups')

class DeleteSetupResource(Resource):
    def delete(self, setup_id):
        # Ensure the user is logged in
        if 'user_id' not in session:
            return {'message': 'user not logged in', 'success': False}, 401
        
        # Find the setup in the database
        setup = Setup.query.filter_by(id=setup_id).first()

        # If no setup is found, return an error
        if not setup:
            return {'message': 'setup not found', 'success': False}, 404
        
        # Ensure the user owns the setup they're trying to delete
        if setup.user_id != session['user_id']:
            return {'message': 'unauthorized to delete this setup', 'success': False}, 403

        # Delete the setup
        db.session.delete(setup)
        db.session.commit()

        return {'message': 'setup deleted successfully', 'success': True}, 200

api.add_resource(DeleteSetupResource, '/delete-setup/<int:setup_id>')

# class GetSetupResource(Resource):
#     def get(self, setup_id):
#         setup = Setup.query.filter_by(id=setup_id).first()
#         if not setup:
#             return {"message": "Setup not found", "success": False}, 404

#         # Convert the setup and its items into a format suitable for your frontend
#         setup_data = setup.to_dict()  # Assuming to_dict() gives you a dict representation of your setup
#         items = {item.slot: item.item_id for item in setup.setup_items}  # Assuming a relationship from setup to items

#         return {**setup_data, **items}, 200

# api.add_resource(GetSetupResource, '/get-setup/<int:setup_id>')

class EditSetupResource(Resource):
    def patch(self, setup_id):
        data = request.json
        setup = Setup.query.filter_by(id=setup_id).first()

        if not setup:
            return {"message": "setup not found", "success": False}, 404
        
        # Ensure the user owns the setup they're trying to edit
        if setup.user_id != session['user_id']:
            return {'message': 'unauthorized to edit this setup', 'success': False}, 403

        # Update the setup details
        setup.title = data.get('title', setup.title)
        setup.description = data.get('description', setup.description)
        for setup_item_data in data.get('setup_items', []):
            item_id = setup_item_data[1][0]
            if item_id:
                setup_item = SetupItem.query.filter_by(setup_id=setup.id, item_id=item_id).first()
                if setup_item and len(setup_item_data[1]) > 1:
                    setup_item.item_id = setup_item_data[1][1]
                else:
                    # Handle the case where a SetupItem for the given slot does not exist
                    new_setup_item = SetupItem(setup_id=setup.id, item_id=item_id)
                    db.session.add(new_setup_item)

        db.session.commit()

        return {"message": "Setup edited successfully", "success": True}, 200
        
    def get(self, setup_id):
        setup = Setup.query.filter_by(id=setup_id).first()

        if not setup:
            return {"message": "setup not found"}, 404
        else:
            return setup.to_dict(), 200 

api.add_resource(EditSetupResource, '/edit-setup/<int:setup_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)