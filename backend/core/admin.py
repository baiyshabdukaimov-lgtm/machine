from django.contrib import admin

from .models import BonusTransaction, QueueTicket, ServiceBay, ServiceStation, SupportMessage, User

admin.site.register(User)
admin.site.register(ServiceStation)
admin.site.register(ServiceBay)
admin.site.register(QueueTicket)
admin.site.register(SupportMessage)
admin.site.register(BonusTransaction)
