from django.core.management.base import BaseCommand
from src.baseUser.models import BaseUser

class Command(BaseCommand):
    help = 'List all user usernames'

    def handle(self, *args, **options):
        try:
            # Get all User objects and extract usernames
            usernames = BaseUser.objects.values_list('username', flat=True)
            self.stdout.write(self.style.SUCCESS('Usernames:\n' + '\n'.join(usernames)))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
