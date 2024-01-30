// personalProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './personalMessages.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import NewMessageOverlay from './newMessageOverlay/newMessageOverlay';
import ChatContainer from './chatContainer/chatContainer';

const PersonalMessages = () => {
    const { authState } = useAuth();
    const [serversList, setServersList] = useState([])

    const [messagesList, setMessagesList] = useState([]);

    const [chatToViewUsername, setChatToViewUsername] = useState(null);

    const [collapsed, setCollapsed] = useState(true);

    const [sendNewMessageOverlay, setSendNewMessageOverlay] = useState(false);



    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };



    const fetchUserMessagesList = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };
            const response = await axios.get(`${API_BASE_URL}personal/get-user-messages/`, config);
            setMessagesList(response.data);
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchUserMessagesList();
    }, []);

    return (
        <div className={`personal-messages-container`}>
            <div className='personal-messages-container-inner'>
                <div className='personal-messages-header'>
                    <h2>Messages</h2>
                    <div className='server-container-closer-icon-container'>
                        <div className='server-container-closer-icon-container-inner' onClick={handleCollapseToggle}>
                            <FontAwesomeIcon icon={faChevronUp} className={`chevron-icon ${collapsed ? 'collapsed' : ''}`} />
                        </div>
                    </div>
                </div>
                <div className='personal-messages-content'>
                    <div className='personal-messages-content-inner'>
                        {serversList.length !== 0 &&
                            <div className={`personal-messages-content-server-container ${collapsed ? 'collapsed' : ''}`}>
                                <div className={`personal-messages-content-server-container-inner`}>
                                    {serversList.map((server, index) => (
                                        <div className='personal-messages-content-per-server' key={`${index}-${server.server_name}`}>
                                            <div className='personal-messages-content-per-server-inner'>
                                                <img src={`${API_BASE_URL}${server.server_cover_picture}`} alt='server-icon' />
                                                <div className='personal-messages-content-server-title'>
                                                    {server.server_name}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        }
                        <div className={`personal-messages-content-inner-inner`}>
                            <div className='personal-messages-left-container'>
                                <div className='personal-messages-send-new'>
                                    <div className='personal-messages-send-new-inner'>
                                        <FontAwesomeIcon
                                            className='send-new-message-icon'
                                            icon={faPaperPlane}
                                            onClick={() => setSendNewMessageOverlay(true)}
                                        />
                                    </div>
                                </div>
                                <div className='personal-messages-list-container'>
                                    <div className='personal-messages-per-list'>
                                        <div className='personal-messages-per-list-inner'>
                                            {messagesList.map((per_message_element, index) => (
                                                <div className='personal-messages-list-per-message' onClick={() => setChatToViewUsername(per_message_element.recipient.username)} key={`${index}-${per_message_element.recipient.username}`}  >
                                                    <div className='personal-messages-list-per-message-inner'>
                                                        <div className='personal-messages-list-per-message-inner-inner'>
                                                            <div className='personal-messages-per-user-profile-picture-container'>
                                                                <img src={`${API_BASE_URL}${per_message_element.recipient.profile_picture}`} />
                                                            </div>
                                                            <div className='personal-messages-per-user-info'>
                                                                <div className='personal-messages-per-user-info-inner'>
                                                                    <div>
                                                                        {`${per_message_element.recipient.first_name} ${per_message_element.recipient.last_name}`}
                                                                    </div>
                                                                    <div>
                                                                        @{per_message_element.recipient.username}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='personal-messages-right-container'>
                                {chatToViewUsername ? (
                                    <ChatContainer recipient_username={chatToViewUsername} />
                                    ) : (
                                    <div></div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {sendNewMessageOverlay &&
                <NewMessageOverlay setSendNewMessageOverlay={setSendNewMessageOverlay} />
            }
        </div>
    );
};

export default PersonalMessages;