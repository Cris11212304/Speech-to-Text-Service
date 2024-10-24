from domain.entities.user import User
from domain.repositories.user_repository import UserRepository

class UserRepositoryImpl(UserRepository):
    def __init__(self):
        self.users = {}  # Implementación en memoria usando un diccionario como ejemplo

    def get_user_by_id(self, user_id: int) -> User:
        return self.users.get(user_id)

    def save_user(self, user: User) -> None:
        self.users[user.user_id] = user

    def update_user(self, user: User) -> None:
        if user.user_id in self.users:
            self.users[user.user_id] = user

    def delete_user(self, user_id: int) -> None:
        if user_id in self.users:
            del self.users[user_id]
