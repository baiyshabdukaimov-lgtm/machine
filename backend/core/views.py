from django.contrib.auth import get_user_model
from django.core.cache import cache
from django.db.models import Prefetch
from django.utils.crypto import get_random_string
from django.utils import timezone
from urllib.request import urlopen
import json
from rest_framework import generics, permissions, status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView

from .models import BonusTransaction, QueueTicket, ServiceBay, ServiceStation, SupportMessage
from .serializers import (
    BonusTransactionSerializer,
    MyTokenObtainPairSerializer,
    QueueTicketSerializer,
    RegisterSerializer,
    ServiceStationSerializer,
    SupportMessageSerializer,
    UserSerializer,
)

User = get_user_model()


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class UserProfileView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def station_list(request):
    live_tickets = QueueTicket.objects.filter(status__in=['waiting', 'in_progress']).order_by('queue_number')
    stations = ServiceStation.objects.filter(is_active=True).prefetch_related(
        'bays', Prefetch('tickets', queryset=live_tickets, to_attr='live_tickets')
    )
    serializer = ServiceStationSerializer(stations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def exchange_rates(request):
    """Cached provider proxy: one upstream request per 30 minutes for all clients."""
    cached = cache.get('kgz_exchange_rates')
    if cached:
        return Response(cached)
    fallback = {'rates': {'USD': 87.45, 'EUR': 95.20}, 'updated_at': timezone.now().isoformat(), 'fallback': True}
    try:
        with urlopen('https://open.er-api.com/v6/latest/KGS', timeout=3) as response:
            data = json.load(response)
        rates = data.get('rates', {})
        payload = {
            'rates': {
                'USD': round(1 / float(rates['USD']), 2),
                'EUR': round(1 / float(rates['EUR']), 2),
            },
            'updated_at': data.get('time_last_update_utc', timezone.now().isoformat()),
            'fallback': False,
        }
    except (OSError, ValueError, KeyError, ZeroDivisionError):
        payload = fallback
    cache.set('kgz_exchange_rates', payload, timeout=30 * 60)
    return Response(payload)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def my_tickets(request):
    tickets = QueueTicket.objects.filter(user=request.user).order_by('-created_at')
    serializer = QueueTicketSerializer(tickets, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_ticket(request):
    station_id = request.data.get('station')
    bay_id = request.data.get('bay')
    if not station_id or not bay_id:
        return Response({'detail': 'Станция и бокс обязательны.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        station = ServiceStation.objects.get(id=station_id, is_active=True)
        bay = ServiceBay.objects.get(id=bay_id, station=station)
    except (ServiceStation.DoesNotExist, ServiceBay.DoesNotExist):
        return Response({'detail': 'Указанный бокс или СТО не найдены.'}, status=status.HTTP_404_NOT_FOUND)

    existing = QueueTicket.objects.filter(station=station, bay=bay).count() + 1
    ticket_code = f'AS-{get_random_string(5, allowed_chars="ABCDEFGHJKLMNPQRSTUVWXYZ23456789").upper()}'

    ticket = QueueTicket.objects.create(
        user=request.user,
        station=station,
        bay=bay,
        car_brand=request.data.get('car_brand', ''),
        car_year=request.data.get('car_year', 2000),
        problem_description=request.data.get('problem_description', ''),
        queue_number=existing,
        ticket_code=ticket_code,
        status='waiting',
    )

    serializer = QueueTicketSerializer(ticket)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def redeem_bonus(request):
    amount = int(request.data.get('amount', 0))
    if amount <= 0:
        return Response({'detail': 'Сумма списания должна быть больше нуля.'}, status=status.HTTP_400_BAD_REQUEST)
    if request.user.bonus_balance < amount:
        return Response({'detail': 'Недостаточно бонусов.'}, status=status.HTTP_400_BAD_REQUEST)

    request.user.bonus_balance -= amount
    request.user.save(update_fields=['bonus_balance'])
    BonusTransaction.objects.create(user=request.user, amount=-amount, reason='Списание бонусов')
    return Response({'detail': 'Бонусы списаны.', 'bonus_balance': request.user.bonus_balance})


@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
def create_support_message(request):
    serializer = SupportMessageSerializer(data=request.data)
    if serializer.is_valid():
        message = serializer.save(user=request.user)
        return Response(SupportMessageSerializer(message).data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def bonus_history(request):
    history = request.user.bonus_transactions.all().order_by('-created_at')
    return Response(BonusTransactionSerializer(history, many=True).data)
