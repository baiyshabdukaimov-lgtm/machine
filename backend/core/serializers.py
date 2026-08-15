from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import BonusTransaction, QueueTicket, ServiceBay, ServiceStation, SupportMessage, User

UserModel = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'password', 'phone', 'theme')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = UserModel(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('id', 'username', 'email', 'phone', 'theme', 'bonus_balance')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username
        token['email'] = user.email
        return token


class ServiceBaySerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceBay
        fields = ('id', 'name', 'category', 'description', 'is_active')


class ServiceStationSerializer(serializers.ModelSerializer):
    bays = ServiceBaySerializer(many=True, read_only=True)
    queue_count = serializers.SerializerMethodField()
    free_slots = serializers.SerializerMethodField()
    in_service = serializers.SerializerMethodField()
    current_queue = serializers.SerializerMethodField()

    class Meta:
        model = ServiceStation
        fields = (
            'id', 'name', 'address', 'city', 'latitude', 'longitude', 'rating', 'phone',
            'description', 'image', 'is_active', 'bays', 'queue_count', 'free_slots', 'in_service', 'current_queue'
        )

    def get_live_tickets(self, obj):
        return getattr(obj, 'live_tickets', [])

    def get_queue_count(self, obj):
        return sum(ticket.status == 'waiting' for ticket in self.get_live_tickets(obj))

    def get_in_service(self, obj):
        return sum(ticket.status == 'in_progress' for ticket in self.get_live_tickets(obj))

    def get_free_slots(self, obj):
        active_bays = sum(bay.is_active for bay in obj.bays.all())
        return max(active_bays - self.get_in_service(obj), 0)

    def get_current_queue(self, obj):
        return [
            {'position': ticket.queue_number, 'ticket_code': ticket.ticket_code, 'status': ticket.status}
            for ticket in self.get_live_tickets(obj)[:10]
        ]


class QueueTicketSerializer(serializers.ModelSerializer):
    station_name = serializers.SerializerMethodField()
    bay_name = serializers.SerializerMethodField()

    class Meta:
        model = QueueTicket
        fields = (
            'id', 'user', 'station', 'station_name', 'bay', 'bay_name', 'car_brand',
            'car_year', 'problem_description', 'status', 'queue_number', 'ticket_code',
            'created_at', 'updated_at', 'bonus_earned'
        )
        read_only_fields = ('user', 'status', 'queue_number', 'ticket_code', 'bonus_earned', 'created_at', 'updated_at')

    def get_station_name(self, obj):
        return obj.station.name

    def get_bay_name(self, obj):
        return obj.bay.name


class SupportMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = SupportMessage
        fields = ('id', 'subject', 'message', 'created_at')
        read_only_fields = ('created_at',)


class BonusTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = BonusTransaction
        fields = ('id', 'amount', 'reason', 'created_at')
        read_only_fields = ('created_at',)
