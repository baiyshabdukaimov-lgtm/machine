from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone


class User(AbstractUser):
    phone = models.CharField(max_length=20, blank=True, null=True)
    avatar = models.URLField(blank=True, null=True)
    theme = models.CharField(max_length=10, choices=[('light', 'Light'), ('dark', 'Dark')], default='light')
    bonus_balance = models.IntegerField(default=0)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.username or self.email or self.get_full_name() or 'User'


class ServiceStation(models.Model):
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=300)
    city = models.CharField(max_length=100, default='Бишкек')
    latitude = models.FloatField()
    longitude = models.FloatField()
    rating = models.FloatField(default=4.5)
    phone = models.CharField(max_length=30, blank=True, null=True)
    description = models.TextField(blank=True, default='')
    image = models.URLField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.name


class ServiceBay(models.Model):
    station = models.ForeignKey(ServiceStation, related_name='bays', on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    description = models.TextField(blank=True, default='')
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.station.name} - {self.name}'


class QueueTicket(models.Model):
    STATUS_CHOICES = [
        ('waiting', 'В очереди'),
        ('in_progress', 'В работе'),
        ('completed', 'Завершено'),
        ('cancelled', 'Отменено'),
    ]

    user = models.ForeignKey(User, related_name='queue_tickets', on_delete=models.CASCADE)
    station = models.ForeignKey(ServiceStation, related_name='tickets', on_delete=models.CASCADE)
    bay = models.ForeignKey(ServiceBay, related_name='tickets', on_delete=models.CASCADE)
    car_brand = models.CharField(max_length=100)
    car_year = models.IntegerField()
    problem_description = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='waiting')
    queue_number = models.IntegerField(default=1)
    ticket_code = models.CharField(max_length=20, unique=True)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    bonus_earned = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.ticket_code} - {self.user.username}'


class SupportMessage(models.Model):
    user = models.ForeignKey(User, related_name='support_messages', on_delete=models.CASCADE)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.user.username}: {self.subject}'


class BonusTransaction(models.Model):
    user = models.ForeignKey(User, related_name='bonus_transactions', on_delete=models.CASCADE)
    amount = models.IntegerField()
    reason = models.CharField(max_length=200)
    created_at = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f'{self.user.username} - {self.amount} ({self.reason})'
