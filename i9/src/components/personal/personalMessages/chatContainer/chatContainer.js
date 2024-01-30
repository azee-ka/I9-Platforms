import React, { useState, useEffect } from 'react';
import './chatContainer.css';
import API_BASE_URL from '../../../../config';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import './chatContainer.css';

const ChatContainer = ({ recipient_username }) => {
    const { authState } = useAuth();
    const [chat, setChat] = useState(null);

    const fetchMessageChatInfo = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };

            const response = await axios.get(`${API_BASE_URL}personal/get-specific-user-messages/${recipient_username}`, config);
            console.log(response.data)
            setChat(response.data.chat);
        } catch (error) {
            console.error('Error fetching chat information:', error);
        }
    };

    useEffect(() => {
        fetchMessageChatInfo();
    }, [recipient_username]);

    return recipient_username ? (
        <div className='personal-messages-chat-container'>
            {/* Display chat messages here */}
        </div>
    ) : (
        <div>
            Loading...
        </div>
    );
};

export default ChatContainer;