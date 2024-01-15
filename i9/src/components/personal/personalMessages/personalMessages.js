// personalProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './personalMessages.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

const PersonalMessages = () => {

    const [serversList, setServersList] = useState([
        {
            server_name: 'Server 1',
            server_cover_picture: '',
            
        },
        {
            server_name: 'Server 2',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 3',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 4',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 5',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 6',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 7',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 8',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 9',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 10',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 11',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 12',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 13',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 14',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 14',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 15',
            server_cover_picture: '',
        },


    ])

    const [messagesList, setMessagesList] = useState([
        {
            recpienct_role: 'Personal',
            properties: [
                {
                    user: {
                        username: 'user',
                        first_name: 'User',
                        last_name: 'User',
                    },
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                },
                {
                    user: {
                        username: 'user',
                        first_name: 'User',
                        last_name: 'User',
                    },
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                },
                {
                    user: {
                        username: 'user',
                        first_name: 'User',
                        last_name: 'User',
                    },
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                },

            ]
        },
        {
            recpienct_role: 'Educator',
            properties: [
                {
                    user: {
                        username: 'user',
                        first_name: 'User',
                        last_name: 'User',
                    },
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                },
                {
                    user: {
                        username: 'user',
                        first_name: 'User',
                        last_name: 'User',
                    },
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                },
                {
                    user: {
                        username: 'user',
                        first_name: 'User',
                        last_name: 'User',
                    },
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                },
                {
                    user: {
                        username: 'user',
                        first_name: 'User',
                        last_name: 'User',
                    },
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                },

            ]
        },
        {
            recpienct_role: 'Admin',
            properties: [
                {
                    user: {
                        username: 'user',
                        first_name: 'User',
                        last_name: 'User',
                    },
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                }

            ]
        },
    ]);

    const [collapsed, setCollapsed] = useState(true);

    const handleCollapseToggle = () => {
        setCollapsed(!collapsed);
    };

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
                                <div className='personal-messages-list-container'>
                                    <div className='personal-messages-list-container-inner'>
                                        {messagesList.map((all_messages_by_recipient_role, index) => (
                                            <div className='personal-messages-per-list' key={`${index}-${all_messages_by_recipient_role.recpienct_role}`}>
                                                <div className='personal-messages-per-list-inner'>
                                                    <h4>{all_messages_by_recipient_role.recpienct_role}</h4>
                                                    <div className='personal-messages-all-messages-per-list'>
                                                        {all_messages_by_recipient_role.properties.map((per_message_element, index) => (
                                                            <div className='personal-messages-list-per-message' key={`${index}-${per_message_element.user.username}`}>
                                                                <div className='personal-messages-list-per-message-inner'>
                                                                    <div className='personal-messages-list-per-message-inner-inner'>
                                                                        <div className='personal-messages-per-user-profile-picture-container'>
                                                                            <img src={`${API_BASE_URL}${per_message_element.profile_picture}`} />
                                                                        </div>
                                                                        <div className='personal-messages-per-user-info'>
                                                                            <div className='personal-messages-per-user-info-inner'>
                                                                                <div>
                                                                                    {`${per_message_element.user.first_name} ${per_message_element.user.last_name}`}
                                                                                </div>
                                                                                <div>
                                                                                    @{per_message_element.user.username}
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
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className='personal-messages-right-container'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalMessages;