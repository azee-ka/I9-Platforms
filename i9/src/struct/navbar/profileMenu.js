// ProfileMenu.js
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useAuth } from '../../reducers/auth/useAuth';
import './profileMenu.css';
import API_BASE_URL from '../../config';
import default_profile_picture from '../../assets/default_profile_picture.png'


const ProfileMenu = ({ user, logout }) => {
    const { authState } = useAuth();
    const userRole = useSelector((state) => state.auth.user.role);

    const [profileData, setProfileData] = useState({});


    useEffect(() => {
        const fetchProfileData = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };
            try {
                const response = await axios.get(`${API_BASE_URL}profile/get-user-info/`, config);
                // console.log(response.data);
                setProfileData(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        };

        if (authState.isAuthenticated) {
            fetchProfileData();
        }
    }, [authState.isAuthenticated, setProfileData]);

    const profileMenuLinks = [
        { label: 'Profile', url: '/personal/profile', role: 'Personal' },
        { label: 'Settings', url: '/personal/preferences', role: 'Personal' },
        { label: 'Messages', url: '/personal/messages', role: 'Personal' },

        { label: 'Profile', url: '/learner/profile', role: 'Learner' },
        { label: 'Preferences', url: '/learner/preferences', role: 'Learner' },
        { label: 'Messages', url: '/learner/messages', icon: '📬', role: 'Learner' },

        { label: 'Profile', url: '/educator/profile', role: 'educator' },
        { label: 'Settings', url: '/educator/preferences', role: 'educator' },
        { label: 'Messages', url: '/educator/messages', icon: '📬', role: 'educator' },
    ];
    return (
        <div className="profile-menu-container">
            <div className='profile-menu-user-info-container'>
                <div className='profile-menu-profile-picture-container'>
                    <div className='learner-profile-menu-user-profile-picture'>
                        <img alt={`profile-menu-icon`} src={profileData ? profileData.profilePicture ? profileData.profilePicture : default_profile_picture : default_profile_picture} />
                    </div>
                    <div className='learner-profile-menu-user-info-text'>
                        <div className='learner-profile-menu-name-text'>{profileData.first_name} {profileData.last_name}</div>
                        <div className='learner-profile-menu-username-text'>@{user.username}</div>
                    </div>
                </div>
            </div>
            <div className="profile-menu-links">
                <ul>
                    {profileMenuLinks.map((link) => (
                        (userRole === link.role) &&(<a href={link.url} key={`${link.label}-${link.role}`}>
                            <li id='exclude-link'>
                                <div className='profile-menu-per-link'>
                                    <div className='profile-menu-link-label'>
                                        {link.label}
                                    </div>
                                    {link.icon && <span className="link-icon">{link.icon}</span>}
                                </div>
                            </li>
                        </a>
                        )
                    ))}
                </ul>
            </div>
            <div className='profile-menu-sign-out-button-container'>
                <button onClick={logout}>Sign Out</button>
            </div>
        </div>
    );
};

ProfileMenu.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default ProfileMenu;
