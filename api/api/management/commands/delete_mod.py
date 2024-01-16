# delete_mod.py
from django.core.management.base import BaseCommand
from src.module.models import Module

class Command(BaseCommand):
    help = 'Delete all modules from the database'

    def handle(self, *args, **options):
        try:
            # Get the count of Expression objects before deletion
            module_count_before = Module.objects.count()

            # Delete all Expression objects
            Module.objects.all().delete()

            # Get the count of Expression objects after deletion
            module_count_after = Module.objects.count()

            # Display the count of deleted expressions
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {module_count_before} modules. Total modules now: {module_count_after}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
