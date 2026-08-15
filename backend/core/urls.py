from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView

from .views import (
    MyTokenObtainPairView,
    RegisterView,
    UserProfileView,
    bonus_history,
    create_support_message,
    create_ticket,
    exchange_rates,
    my_tickets,
    redeem_bonus,
    station_list,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('stations/', station_list, name='stations'),
    path('exchange-rates/', exchange_rates, name='exchange_rates'),
    path('tickets/', my_tickets, name='my_tickets'),
    path('tickets/create/', create_ticket, name='create_ticket'),
    path('bonus/redeem/', redeem_bonus, name='redeem_bonus'),
    path('support/', create_support_message, name='support_message'),
    path('bonus/history/', bonus_history, name='bonus_history'),
]
