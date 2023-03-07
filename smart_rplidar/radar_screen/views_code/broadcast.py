from django.conf import settings

import channels.layers
from asgiref.sync import async_to_sync

import json

def broadcast_ticks(ticks):
    channel_layer = channels.layers.get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        settings.TICKS_GROUP_NAME, {
            "type": 'new_ticks',
            "content": json.dumps(ticks),
        })