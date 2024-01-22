# src/user/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

def upload_to(instance, filename):
    return f'profile_pictures/{instance.username}/{filename}'


class BaseUser(AbstractUser):
    username = models.CharField(unique=True, max_length=150)
    date_of_birth = models.DateField(null=True, blank=True)
    role = models.TextField(default='any')
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    linked_profiles = models.ManyToManyField('self', symmetrical=False, related_name='%(app_label)s_%(class)s_linked_profiles')
    active_profile = models.ForeignKey('self', null=True, blank=True, on_delete=models.SET_NULL, related_name='%(app_label)s_%(class)s_active_profile')
    is_private_profile = models.BooleanField(default=True)

    def link_profile(self, profile):
        """
        Method to link a profile to the user.
        """
        self.linked_profiles.add(profile)
        # Ensure reciprocal linking
        profile.linked_profiles.add(self)

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

    def switch_active_profile(self, new_active_profile):
        """
        Method to switch the active profile for the user.
        """
        # Perform any additional logic needed for the switch
        # For example, you might want to reset certain session data or perform cleanup

        # Set the new active profile
        self.active_profile = new_active_profile
        self.save()