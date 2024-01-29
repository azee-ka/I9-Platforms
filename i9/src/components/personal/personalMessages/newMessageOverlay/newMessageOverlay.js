import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import API_BASE_URL from '../../../../config';

import './newMessageOverlay.css';

const NewMessageOverlay = ({ setSendNewMessageOverlay }) => {
    const { authState } = useAuth();
    const [sendMessageToField, setSendMessageToField] = useState('');
    const [sendMessageContentField, setSendMessageContentField] = useState('');

    const handleSubmitSendNewMessage = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };

            const data = {
                recipient_username: sendMessageToField,
                content: sendMessageContentField
            };

            const response = await axios.post(`${API_BASE_URL}personal/send-message/`, data, config);
            console.log(response.data);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className='new-message-overlay' onClick={() => setSendNewMessageOverlay(false)}>
            <div className='new-message-overlay-card' onClick={(e) => e.stopPropagation()}>
                <div className='new-message-overlay-card-inner'>
                    <div className='new-messge-card-title'>
                        <h2>New Message</h2>
                    </div>
                    <div className='new-message-card-content'>
                        <div className='new-message-card-content-inner'>
                            <div className='new-message-card-message-to-field'>
                                <input
                                    placeholder='Send Message To...'
                                    value={sendMessageToField}
                                    onChange={(e) => setSendMessageToField(e.target.value)}
                                ></input>
                            </div>
                            <div className='new-message-card-message-to-field'>
                                <textarea
                                    placeholder='Type your message here...'
                                    value={sendMessageContentField}
                                    onChange={(e) => setSendMessageContentField(e.target.value)}
                                ></textarea>
                            </div>
                            <div className='new-send-card-send-message-button'>
                                <div className='new-send-card-send-message-button-inner'>
                                    <button onClick={handleSubmitSendNewMessage}>Send Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewMessageOverlay;