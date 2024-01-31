# delete_mod.py
from django.core.management.base import BaseCommand
from src.user.personal.messages.models import Chat

class Command(BaseCommand):
    help = 'Delete all chats from the database'

    def handle(self, *args, **options):
        try:
            # Get the count of Expression objects before deletion
            chat_count_before = Chat.objects.count()

            # Delete all Expression objects
            Chat.objects.all().delete()

            # Get the count of Expression objects after deletion
            chat_count_after = Chat.objects.count()

            # Display the count of deleted expressions
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {chat_count_before} chats. Total chats now: {chat_count_after}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
