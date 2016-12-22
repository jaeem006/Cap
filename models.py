from sqlalchemy import Column,Integer,String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
from sqlalchemy import create_engine

Base = declarative_base()
class Contactos(Base):
  __tablename__ = 'contactos'
  id = Column(Integer, primary_key = True)
  nombre = Column(String)
  telefono = Column(String)
  movil = Column(String)
  calle = Column(String)
  colonia = Column(String)
  cp = Column(String)
  
  def __init__(self, nombre, telefono, movil, calle, colonia, cp):
    self.nombre = nombre
    self.telefono = telefono
    self.movil = movil
    self.calle = calle
    self.colonia = colonia
    self.cp = cp
    
  #Add a property decorator to serialize information from this database
  @property
  def serialize(self):
    return {
      'nombre': self.nombre,
      'telefono': self.telefono,
      'movil' : self.movil,
      'calle': self.calle,
      'colonia': self.colonia,
      'cp' : self.cp,
      'id' : self.id
      
      }

engine = create_engine('postgresql://postgres:123456@localhost/contactosdb')
 

Base.metadata.create_all(engine)