# delete_mod.py
from django.core.management.base import BaseCommand
from src.user.personal.messages.models import Message

class Command(BaseCommand):
    help = 'Delete all modules from the database'

    def handle(self, *args, **options):
        try:
            # Get the count of Expression objects before deletion
            message_count_before = Message.objects.count()

            # Delete all Expression objects
            Message.objects.all().delete()

            # Get the count of Expression objects after deletion
            message_count_after = Message.objects.count()

            # Display the count of deleted expressions
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {message_count_before} messages. Total messages now: {message_count_after}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
