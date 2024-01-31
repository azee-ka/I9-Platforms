# views.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

def send_message_to_chat(chat_id, message):
    channel_layer = get_channel_layer()
    chat_group_name = f"chat_{chat_id}"

    async_to_sync(channel_layer.group_send)(
        chat_group_name,
        {
            'type': 'chat.message',
            'message': message,
        }
    )
