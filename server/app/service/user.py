import md5
from app.model.user import User

from app.config import server_config

hash_secret = server_config.get


def create_user(username, password, email):
    # create a user, but check if user exists first
    if User.objects(username=username).count() > 0:
        return 'username already exists'

    # md5 hash the string
    hashed_password = md5(password + hash_secret).hexdigest()

    # save the user
    user = User(username=username, password=hashed_password, email=email)
    user.save()

    return None
