import React, { useState, useEffect } from 'react';
import './chatContainer.css';
import API_BASE_URL from '../../../../config';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import './chatContainer.css';

const ChatContainer = ({ recipient_username }) => {
    const { authState } = useAuth()
    const [chatUsername, setChatUsername] = useState(null);

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
        } catch (error) {

        }
    };

    useEffect(() => {
        setChatUsername(recipient_username);
        fetchMessageChatInfo();
    }, [recipient_username]);


    return chatUsername ? (
        <div className='personal-messages-chat-container'>
            <div className='chat-container'>

            </div>
        </div>
    ) : (
        <div>
            Loading...
        </div>
    )
};

export default ChatContainer;