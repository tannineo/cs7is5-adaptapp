from flask import request
from flask_restplus import Namespace, Resource, fields

api = Namespace(
    'user',
    description='User Controller, register, login, logout & account settings')

register_fields = api.model(
    'register', {
        'username': fields.String(required=True, description='username'),
        'password_not_hashed': fields.String(required=True,
                                             description='password'),
        'email': fields.String(required=True, description='email'),
    })


@api.route('/register')
class UserRegister(Resource):
    @api.doc('user_register', body=register_fields)
    def post(self):
        json = request.get_json()
        print(json)

        return {'msg': 'OK'}


login_fields = api.model(
    'login', {
        'username':
        fields.String(required=True, description='username'),
        'password_not_hashed':
        fields.String(required=True, description='password'),
    })


@api.route('/login')
class UserLogin(Resource):
    @api.doc('user_login', body=login_fields)
    def post(self):
        json = request.get_json()
        print(json)

        return {'msg': 'OK'}


@api.route('/logout')
class UserLogout(Resource):
    @api.doc('user_logout')
    def get():
        return {'msg': 'OK'}
