class User:
    def __init__(self, user_id: int, username: str, password: str):
        self.user_id = user_id
        self.username = username
        self.password = password

    def __str__(self):
        return f"User({self.user_id}, {self.username})"
