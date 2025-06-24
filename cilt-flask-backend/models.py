from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Scan(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String(300))
    diagnosis = db.Column(db.String(50))
    timestamp = db.Column(db.String(100))
