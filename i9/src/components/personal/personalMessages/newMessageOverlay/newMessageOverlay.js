import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import API_BASE_URL from '../../../../config';
import './newMessageOverlay.css';
import ProfilePicture from '../../../../utils/getProfilePicture';

const NewMessageOverlay = ({ setSendNewMessageOverlay }) => {
    const { authState } = useAuth();
    const [sendMessageToField, setSendMessageToField] = useState('');

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const [sendMessageContentField, setSendMessageContentField] = useState('');

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchQuery(inputValue);

        if (inputValue !== "") {
            handleSubmitSearch();
        } else {
            setSearchResults([]);
        }

    };

    const handleSubmitSearch = (e) => {
        // Make an API request to search for users
        axios.get(`${API_BASE_URL}personal/search/?query=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${authState.token}`,
            },
        })
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.error('Error searching for users:', error);
            });
    };


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

    console.log(searchResults);

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
                                    value={searchQuery}
                                    onChange={handleInputChange}
                                ></input>
                            </div>
                            <div className='new-message-user-search-list'>
                                {searchResults.map((thisUser, index) => (
                        <div className="users-search-list-item" key={`${thisUser.username}-${index}`}>
                            <div className="users-search-list-item-inner">
                                <div className="users-search-list-item-profile-picture">
                                    <div className="users-search-list-item-profile-picture-inner">
                                        <ProfilePicture src={thisUser.profile_picture} />
                                    </div>
                                </div>
                                <div className="users-search-list-item-username">
                                    <p>{thisUser.username}</p>
                                </div>
                            </div>
                        </div>
                    ))}
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