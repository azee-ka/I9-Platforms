import React, { useState, useEffect } from 'react';
import './chatContainer.css';
import API_BASE_URL from '../../../../config';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import './chatContainer.css';
import ProfilePicture from '../../../../utils/getProfilePicture';

const ChatContainer = ({ chat_info }) => {
    const { authState } = useAuth();
    const [chat, setChat] = useState(null);
    const [messageToSend, setMessageToSend] = useState('');
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);

    const fetchMessageChatInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };

            const response = await axios.get(`${API_BASE_URL}personal/chats/${chat_info.id}/messages/`, config);
            console.log(response.data);
            setChat(response.data.chat);
        } catch (error) {
            console.error('Error fetching chat information:', error);
        }
    };

    useEffect(() => {
        fetchMessageChatInfo();
    }, [chat_info]);


    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8000/ws/messages/inbox/');
        // const socket = new WebSocket(`ws://messages/inbox/`);

        socket.onopen = () => {
            console.log('WebSocket connected');
        };

        // socket.onmessage = (event) => {
        //     const message = JSON.parse(event.data);
        //     console.log('Received message:', message);
        //     setMessages((prevMessages) => [...prevMessages, message]);
        // };

        // socket.onerror = (error) => {
        //     console.error('WebSocket error:', error);
        // };


        setSocket(socket);

        // Cleanup function
        return () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                socket.close();
            }
        };
    }, []);



    const handleSendMessage = () => {
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket connection not open.');
            return;
        }

        // Send the message to the server
        socket.send(JSON.stringify({
            chat_id: chat_info.id,
            message: messageToSend
        }));

        // Clear the message input
        setMessageToSend('');
    };


    useEffect(() => {
        if (!socket) return;

        // Listen for incoming messages from the server
        socket.onmessage = (event) => {
            const message = JSON.parse(event.data);

            // Handle incoming messages
            console.log('Received message:', message);

            // Update messages state with the new message
            setMessages((prevMessages) => [...prevMessages, message]);
        };

        return () => {
            // Clean up event listeners when the component unmounts
            socket.onmessage = null;
        };
    }, [socket]);

    return chat_info ? (
        <div className='personal-messages-chat-container'>
            <div className='chat-user-info'>
                <div className='chat-user-info-profile-picture'>
                    <ProfilePicture src={chat_info.other_user.profile_picture} />
                </div>
                <div className='chat-user-info-username'>
                    <p>{chat_info.other_user.username}</p>
                </div>
            </div>
            <div className='chat-messages-container'>
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message-bubble ${message.sender === authState.user.id ? 'sent-message' : 'received-message'}`}>
                        {message.content}
                    </div>
                ))}
            </div>
            <div className='chat-message-new-message-field'>
                <div className='new-message-input-field'>
                    <textarea
                        placeholder='Message...'
                        value={messageToSend}
                        onChange={(e) => setMessageToSend(e.target.value)}
                    />
                </div>
                <div className='new-message-send-button-container'>
                    <button onClick={handleSendMessage}>Send</button>
                </div>
            </div>
        </div>
    ) : (
        <div>
            Loading...
        </div>
    );
};

export default ChatContainer;