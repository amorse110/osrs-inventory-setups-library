from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from extensions import db, bcrypt

from config import db

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key = True)
    first_name = db.Column(db.String(), nullable = False)
    last_name = db.Column(db.String(), nullable = False)
    email = db.Column(db.String(), unique = True, nullable = False)
    username = db.Column(db.String(), unique = True, nullable = False)
    _password = db.Column(db.String(), nullable = False)

    @validates('username')
    def validate_username(self, key, username):
        existing_user = User.query.filter(User.username == username).first()
        if existing_user is not None:
            raise ValueError('Username is unavailable')
        return username
    
    def __repr__(self):
        return f"Username: {self.username}, Password: {self._password}"


class Setup(db.Model, SerializerMixin):
    __tablename__ = "setups"

    id = db.Column(db.Integer(), primary_key = True)
    title = db.Column(db.String(), nullable = False)
    description = db.Column(db.String(), nullable = False)
    
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
    
    users = db.relationship("User", back_populates = 'setups')
    items = association_proxy('setup_items', 'item')


class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String(), nullable = False)
    slot = db.Column(db.String(), nullable = False)
    image = db.Column(db.String(), nullable = False)

    setups = association_proxy('item_setups', 'setup')

class SetupItem(db.Model, SerializerMixin):
    __tablename__ = "setupItems"

    id = db.Column(db.Integer(), primary_key = True)
    
    setup_id = db.Column(db.Integer(), db.ForeignKey('setups.id'))
    item_id = db.Column(db.Integer(), db.ForeignKey('items.id'))

    setups = db.relationship('Setup', back_populates = 'setup_items')
    items = db.relationship('Item', back_populates = 'item_setups')