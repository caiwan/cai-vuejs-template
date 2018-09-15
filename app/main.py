# coding=utf-8
import logging
import os
import sys

from flask import Flask
from flask_restful import Resource, Api

BASE = '/api/'

app = Flask(__name__)
api = Api(app)

class HelloWorld(Resource):
    def get(self):
        return {'hello': 'world'}

api.add_resource(HelloWorld, BASE + 'hello/')

if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000)
    

