from django.core.management.base import BaseCommand
from src.baseUser.models import BaseUser

class Command(BaseCommand):
    help = 'Delete all registered users from the database'

    def handle(self, *args, **options):
        try:
            # Get the count of CustomUser objects before deletion
            user_count_before = BaseUser.objects.count()

            # Delete all CustomUser objects
            BaseUser.objects.all().delete()

            # Get the count of CustomUser objects after deletion
            user_count_after = BaseUser.objects.count()

            # Display the count of deleted users
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {user_count_before} users. Total users now: {user_count_after}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
