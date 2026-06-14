from repositories.email_history_repository import EmailHistoryRepository


class EmailService:
    def __init__(self, repository=None):
        self.repository = repository or EmailHistoryRepository()

    def list_histories(self, user_id=None):
        return self.repository.list(user_id)
