# delete_expr.py
from django.core.management.base import BaseCommand
from src.calc.expression.models import Expression

class Command(BaseCommand):
    help = 'Delete all expressions from the database'

    def handle(self, *args, **options):
        try:
            # Get the count of Expression objects before deletion
            expression_count_before = Expression.objects.count()

            # Delete all Expression objects
            Expression.objects.all().delete()

            # Get the count of Expression objects after deletion
            expression_count_after = Expression.objects.count()

            # Display the count of deleted expressions
            self.stdout.write(self.style.SUCCESS(f'Successfully deleted {expression_count_before} expressions. Total expressions now: {expression_count_after}'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'An error occurred: {str(e)}'))
