from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from radar_screen.consumers import TicksSyncConsumer

websocket_urlpatterns = [
    path("ws/ticks/", TicksSyncConsumer.as_asgi()),
]