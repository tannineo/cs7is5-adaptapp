from flask import Flask
from flask_restplus import Resource, Api

from controller.user import api as user_api
from config import server_config

app = Flask(__name__)
api = Api(app, version='1.0.0', title='adapt-app', doc='/doc/')

todos = {}

# add namespaces (controllers) here
api.add_namespace(user_api)


@api.route('/hello')
class HelloSimple(Resource):
    def get(self):
        return {'hello': 'world'}


SERVER_HOST = server_config.get('server', 'host')
SERVER_PORT = server_config.get('server', 'port')

if __name__ == '__main__':
    app.run(debug=True, host=SERVER_HOST, port=SERVER_PORT)
