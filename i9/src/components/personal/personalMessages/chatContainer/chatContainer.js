import React, { useState, useEffect } from 'react';
import './chatContainer.css';
import API_BASE_URL from '../../../../config';

const ChatContainer = ({ recipient_username }) => {

    const [chatUsername, setChatUsername] = useState(null);

    useEffect(() => {
        setChatUsername(recipient_username);
    }, [recipient_username]);

    const handleMessageChatAccessClick = async () => {
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