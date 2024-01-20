# delete_mod.py
from django.core.management.base import BaseCommand
from src.post.models import Post

class Command(BaseCommand):
    help = 'Delete all modules from the database'

    def handle(self, *args, **options):
        try:
            # Get the count of Expression objects before deletion
            post_count_before = Post.objects.count()

            # Delete all Expression objects
            Post.objects.all().delete()

            # Get the count of Expression objects after deletion
            post_count_after = Post.objects.count()

            # Display the count of deleted expressions
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {post_count_before} posts. Total posts now: {post_count_after}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
