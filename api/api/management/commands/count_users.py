from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Count the number of registered users'

    def handle(self, *args, **options):
        try:
            # Get the count of User objects
            user_count = User.objects.count()
            self.stdout.write(self.style.SUCCESS(f'Total registered users: {user_count}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
