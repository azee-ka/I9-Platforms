# consumers.py

import json
from channels.generic.websocket import AsyncWebsocketConsumer

class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data['message']
        chat_id = data['chat_id']

        chat_group_name = f"chat_{chat_id}"

        await self.channel_layer.group_add(
            chat_group_name,
            self.channel_name
        )

        await self.channel_layer.group_send(
            chat_group_name,
            {
                'type': 'chat.message',
                'message': message,
            }
        )

    async def chat_message(self, event):
        message = event['message']

        await self.send(text_data=json.dumps({
            'message': message
        }))
