from app.model.user import User


def create_user(username, password, email):
    """create a user, but check if user exists first"""
    if User.objects(username=username).count() > 0:
        return 'username already exists'

    user = User(username=username, password=password, email=email)
    user.save()

    return None
