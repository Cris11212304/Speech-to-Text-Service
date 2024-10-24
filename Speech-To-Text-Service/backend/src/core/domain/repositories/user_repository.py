from abc import ABC, abstractmethod
from domain.entities.user import User

class UserRepository(ABC):

    @abstractmethod
    def get_user_by_id(self, user_id: int) -> User:
        pass

    @abstractmethod
    def save_user(self, user: User) -> None:
        pass

    @abstractmethod
    def update_user(self, user: User) -> None:
        pass

    @abstractmethod
    def delete_user(self, user_id: int) -> None:
        pass
