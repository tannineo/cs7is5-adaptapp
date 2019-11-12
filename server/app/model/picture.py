from . import db
import datetime


class Picture(db.Document):
    name = db.StringField(required=True)
    large_image = db.StringField(required=True)
    tags = db.ListField(db.StringField(max_length=50))
