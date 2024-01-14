// LearnerProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './learnerMessages.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';

const LearnerMessages = () => {

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
        {
            server_name: 'Server 16',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 17',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 18',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 19',
            server_cover_picture: '',
        },
        {
            server_name: 'Server 20',
            server_cover_picture: '',
        },


    ])

    const [messagesList, setMessagesList] = useState([
        {
            recpienct_role: 'Learner',
            properties: [
                {
                    username: 'user',
                    profile_picture: '',
                    last_active: '',
                    last_message_info: {
                        message: '',
                        date_time: '',
                    },
                }

            ]
        },
        {
            recpienct_role: 'Learner',
            properties: [
                {
                    username: 'user',
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

    return (
        <div className='learner-messages-container'>
            <div className='learner-messages-container-inner'>
                <div className='learner-messages-header'>
                    <h2>Messages</h2>
                </div>
                <div className='learner-messages-content'>
                    <div className='learner-messages-content-inner'>
                        <div className='learner-messages-content-server-container'>
                            <div className='learner-messages-content-server-container-inner'>
                                {serversList.map((server, index) => (
                                    <div className='learner-messages-content-per-server' key={`${index}-${server.server_name}`}>
                                        <div className='learner-messages-content-per-server-inner'>
                                            <img src={`${API_BASE_URL}${server.server_cover_picture}`} alt='server-icon' />
                                            <div className='learner-messages-content-server-title'>
                                                {server.server_name}
                                            </div>
                                        </div>
                                    </div>
                                ))

                                }
                            </div>
                        </div>
                        <div className='learner-messages-content-inner-inner'>
                            <div className='learner-messages-left-container'>
                                <div className='learner-messages-list-container'>
                                    <div className='learner-messages-list-container-inner'>

                                    </div>
                                </div>
                            </div>
                            <div className='learner-messages-right-container'>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LearnerMessages;