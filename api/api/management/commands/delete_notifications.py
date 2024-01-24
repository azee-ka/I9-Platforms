# delete_mod.py
from django.core.management.base import BaseCommand
from src.notification.models import Notification

class Command(BaseCommand):
    help = 'Delete all modules from the database'

    def handle(self, *args, **options):
        try:
            # Get the count of Expression objects before deletion
            notification_count_before = Notification.objects.count()

            # Delete all Expression objects
            Notification.objects.all().delete()

            # Get the count of Expression objects after deletion
            notification_count_after = Notification.objects.count()

            # Display the count of deleted expressions
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {notification_count_before} notifications. Total notifications now: {notification_count_after}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
