# src/user/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class BaseUser(AbstractUser):
    username = models.CharField(unique=True, max_length=150)
    date_of_birth = models.DateField(null=True, blank=True)
    role = models.TextField(default='any')
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    linked_profiles = models.ManyToManyField('self', symmetrical=False, related_name='%(app_label)s_%(class)s_linked_profiles')

    def link_profile(self, profile):
        """
        Method to link a profile to the user.
        """
        self.linked_profiles.add(profile)

    def unlink_profile(self, profile):
        """
        Method to unlink a profile from the user.
        """
        self.linked_profiles.remove(profile)

    def get_linked_profiles(self):
        """
        Method to get all linked profiles for the user.
        """
        return self.linked_profiles.all()