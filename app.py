from flask_sqlalchemy import SQLAlchemy
from models import Base, Contactos
from flask import Flask, jsonify, request
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy import create_engine
from flask.ext.api import FlaskAPI
from flask.ext.cors import CORS
import json


import sys
import codecs
sys.stdout = codecs.getwriter('utf8')(sys.stdout)
sys.stderr = codecs.getwriter('utf8')(sys.stderr)

engine = create_engine('postgresql://postgres:123456@localhost/contactosdb')

Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()

app = FlaskAPI(__name__)
CORS(app)

app.debug = True

@app.route('/get_contactos', methods = ['GET'])
def get_contactos(): 
	myContacto = session.query(Contactos).all()
	myContacto = [i.serialize for i in myContacto]
	return json.dumps(myContacto) 

@app.route('/post_contacto/<string:nombre>/<string:telefono>/<string:movil>/<string:calle>/<string:colonia>/<string:cp>', methods = ['POST'])
def post_contacto(nombre, telefono, movil, calle, colonia, cp):
	contacto = Contactos(nombre, telefono, movil, calle, colonia, cp)
	session.add(contacto)
	session.commit() 
	return "Contacto Agregado"

@app.route('/delete_contacto/<int:id>', methods = ['DELETE'])
def delete_contacto(id):
	contacto = session.query(Contactos).filter_by(id = id).one()
	session.delete(contacto)
	session.commit()
	return "Contacto eliminado"

if __name__ == "__main__":
	app.run(host='127.0.0.1', port=5000)