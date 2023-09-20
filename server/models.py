from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates
from config import db, bcrypt

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer(), primary_key = True)
    username = db.Column(db.String(), unique = True, nullable = False)
    _password = db.Column(db.String(), nullable = False)

    setups = db.relationship('Setup', back_populates='user', cascade='all, delete-orphan')

    serialize_rules=("-setups.user",)

    @validates('username')
    def validate_username(self, key, username):
        existing_user = User.query.filter(User.username == username).first()
        if existing_user is not None:
            raise ValueError('Username is unavailable')
        return username
    
    @property           ##### Raises AttributeError if someone tries to access password of a User
    def password(self):
        raise AttributeError('passwords cannot be viewed')

    @password.setter    ##### Stores the hashed password in the _password attribute
    def password(self, password):
        self._password = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):     ##### Checks entered password against the hashed password from the database
        return bcrypt.check_password_hash(self._password, password)

    def __repr__(self):
        return f"Username: {self.username}"


class Setup(db.Model, SerializerMixin):
    __tablename__ = "setups"

    id = db.Column(db.Integer(), primary_key = True)
    title = db.Column(db.String(), nullable = False)
    description = db.Column(db.String(), nullable = False)

    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'))

    setup_items = db.relationship('SetupItem', back_populates='setup', cascade="all, delete-orphan")
    user = db.relationship("User", back_populates = 'setups')

    serialize_rules=("-setup_items.setup",)

class Item(db.Model, SerializerMixin):
    __tablename__ = "items"

    id = db.Column(db.Integer(), primary_key = True)
    name = db.Column(db.String(), nullable = False)
    slot = db.Column(db.String(), nullable = False)
    image = db.Column(db.String(), nullable = False)
    
    item_setups = db.relationship('SetupItem', back_populates='item', overlaps="items")
    serialize_rules=("-item_setups.item", "-item_setups.setup")

class SetupItem(db.Model, SerializerMixin):
    __tablename__ = "setupItems"

    id = db.Column(db.Integer(), primary_key = True)
    
    setup_id = db.Column(db.Integer(), db.ForeignKey('setups.id'))
    item_id = db.Column(db.Integer(), db.ForeignKey('items.id'))

    setup = db.relationship('Setup', back_populates='setup_items', overlaps="items, setups")
    item = db.relationship('Item', back_populates='item_setups', overlaps="items, setups")