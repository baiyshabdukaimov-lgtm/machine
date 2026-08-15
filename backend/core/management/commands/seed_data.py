from django.core.management.base import BaseCommand

from core.models import ServiceBay, ServiceStation


class Command(BaseCommand):
    help = 'Seed service stations for Bishkek'

    def handle(self, *args, **kwargs):
        stations_data = [
            {
                'name': 'AutoMax Service', 'address': 'ул. Чуй 215, Бишкек', 'latitude': 42.8746, 'longitude': 74.6122,
                'rating': 4.8, 'phone': '+996 555 111 222', 'description': 'Сервис и диагностика',
                'bays': [
                    {'name': 'Бокс №1', 'category': 'Ремонт моторов', 'description': 'Двигатели и диагностика'},
                    {'name': 'Бокс №2', 'category': 'Малярка и покраска', 'description': 'Кузовные работы'},
                    {'name': 'Бокс №3', 'category': 'Ходовая', 'description': 'Подвеска и рулевое'}
                ]
            },
            {
                'name': 'Bishkek Drive', 'address': 'пр. Манаса 42, Бишкек', 'latitude': 42.8610, 'longitude': 74.5850,
                'rating': 4.7, 'phone': '+996 555 333 444', 'description': 'Автоцентр с шиномонтажем',
                'bays': [
                    {'name': 'Бокс №1', 'category': 'Шиномонтаж', 'description': 'Ремонт колес'},
                    {'name': 'Бокс №2', 'category': 'Салон', 'description': 'Ремонт салона'},
                    {'name': 'Бокс №3', 'category': 'Электрика', 'description': 'Электронные системы'}
                ]
            },
            {
                'name': 'City Auto Care', 'address': 'ул. Ибраимова 18, Бишкек', 'latitude': 42.8487, 'longitude': 74.6190,
                'rating': 4.6, 'phone': '+996 555 555 666', 'description': 'Кузовной и покрасочный центр',
                'bays': [
                    {'name': 'Бокс №1', 'category': 'Кузов', 'description': 'Сварка и выправка'},
                    {'name': 'Бокс №2', 'category': 'Покраска', 'description': 'Локальная покраска'},
                    {'name': 'Бокс №3', 'category': 'Диагностика', 'description': 'Компьютерная диагностика'}
                ]
            },
            {
                'name': 'Turbo Garage', 'address': 'ул. Лермонтова 31, Бишкек', 'latitude': 42.8831, 'longitude': 74.5906,
                'rating': 4.9, 'phone': '+996 555 777 888', 'description': 'Спортивный и тюнинг сервис',
                'bays': [
                    {'name': 'Бокс №1', 'category': 'Турбонаддув', 'description': 'Настройка турбины'},
                    {'name': 'Бокс №2', 'category': 'Двигатель', 'description': 'Ремонт мотора'},
                    {'name': 'Бокс №3', 'category': 'Тюнинг', 'description': 'Внешние элементы'}
                ]
            },
            {
                'name': 'Green Mile Auto', 'address': 'ул. Токтогула 77, Бишкек', 'latitude': 42.8385, 'longitude': 74.5986,
                'rating': 4.5, 'phone': '+996 555 222 444', 'description': 'Плановый техосмотр и ремонт',
                'bays': [
                    {'name': 'Бокс №1', 'category': 'ТО', 'description': 'Плановое обслуживание'},
                    {'name': 'Бокс №2', 'category': 'Ходовая', 'description': 'Подвески и коробка'},
                    {'name': 'Бокс №3', 'category': 'Масло', 'description': 'Масляные работы'}
                ]
            },
            {
                'name': 'Nord Auto', 'address': 'ул. Турусбекова 6, Бишкек', 'latitude': 42.8768, 'longitude': 74.6484,
                'rating': 4.8, 'phone': '+996 555 444 222', 'description': 'Сервис для семейных автомобилей',
                'bays': [
                    {'name': 'Бокс №1', 'category': 'Сервис', 'description': 'Регулярный сервис'},
                    {'name': 'Бокс №2', 'category': 'Охлаждение', 'description': 'Система охлаждения'},
                    {'name': 'Бокс №3', 'category': 'Климат', 'description': 'Сплит-системы и кондиционер'}
                ]
            },
            {
                'name': 'RoadFix Center', 'address': 'ул. Абдрахманова 14, Бишкек', 'latitude': 42.8615, 'longitude': 74.6234,
                'rating': 4.7, 'phone': '+996 555 666 777', 'description': 'Ремонт ходовой и электроники',
                'bays': [
                    {'name': 'Бокс №1', 'category': 'Ходовая', 'description': 'Амортизаторы и подвеска'},
                    {'name': 'Бокс №2', 'category': 'Электрика', 'description': 'Проводка и датчики'},
                    {'name': 'Бокс №3', 'category': 'Сцепление', 'description': 'Ремонт трансмиссии'}
                ]
            },
            {
                'name': 'Kyrgyz Motor House', 'address': 'ул. Советская 55, Бишкек', 'latitude': 42.8904, 'longitude': 74.6068,
                'rating': 4.9, 'phone': '+996 555 998 112', 'description': 'Премиум сервис и шиномонтаж',
                'bays': [
                    {'name': 'Бокс №1', 'category': 'Премиум', 'description': 'Сервис премиум класса'},
                    {'name': 'Бокс №2', 'category': 'Шины', 'description': 'Шиномонтаж и балансировка'},
                    {'name': 'Бокс №3', 'category': 'Ремонт', 'description': 'Капитальные ремонты'}
                ]
            },
        ]

        for data in stations_data:
            station, created = ServiceStation.objects.get_or_create(
                name=data['name'],
                defaults={
                    'address': data['address'],
                    'city': 'Бишкек',
                    'latitude': data['latitude'],
                    'longitude': data['longitude'],
                    'rating': data['rating'],
                    'phone': data['phone'],
                    'description': data['description'],
                    'is_active': True,
                }
            )
            if created:
                for bay in data['bays']:
                    ServiceBay.objects.create(station=station, **bay)

        self.stdout.write(self.style.SUCCESS('Seeded 8 service stations with bays.'))
