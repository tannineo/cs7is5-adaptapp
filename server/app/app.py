from flask import Flask
from flask_restplus import Resource, Api
import configparser
import os

from controller.user import api as user_api

app = Flask(__name__)
api = Api(app, version='1.0.0', title='adapt-app', doc='/doc/')

todos = {}

# add namespaces (controllers) here
api.add_namespace(user_api)


@api.route('/hello')
class HelloSimple(Resource):
    def get(self):
        return {'hello': 'world'}


CONFIG_FILE = 'config.ini'
server_config = configparser.ConfigParser()
server_config.read(
    os.path.join(os.path.split(os.path.realpath(__file__))[0], CONFIG_FILE))
SERVER_HOST = server_config.get('server', 'host')
SERVER_PORT = server_config.get('server', 'port')

if __name__ == '__main__':
    app.run(debug=True, host=SERVER_HOST, port=SERVER_PORT)
