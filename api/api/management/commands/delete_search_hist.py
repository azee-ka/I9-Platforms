# delete_expr.py
from django.core.management.base import BaseCommand
from src.user.personal.userSearchHistory.models import SearchHistory

class Command(BaseCommand):
    help = 'Delete all users search history from the database'

    def handle(self, *args, **options):
        try:
            # Get the count of SearchHistory objects before deletion
            search_history_user_count_before = SearchHistory.objects.count()

            # Delete all SearchHistory objects
            SearchHistory.objects.all().delete()

            # Get the count of Expression objects after deletion
            search_history_user_count_after = SearchHistory.objects.count()

            # Display the count of deleted expressions
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {search_history_user_count_before} users in search history. Total users in search history now: {search_history_user_count_after}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
