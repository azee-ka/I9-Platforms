// ProfileMenu.js
import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import PropTypes from 'prop-types';
import { useAuth } from '../../../reducers/auth/useAuth';
import './profileMenu.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png'
import ProfileAddAuthOverlay from '../profileLinkAuthOverlay/profileLinkAuthOverlay';

const ProfileMenu = ({ user }) => {
    const navigate = useNavigate();
    const { authState, logout, login, switchProfile } = useAuth();
    const userRole = useSelector((state) => state.auth.user.role);

    const [showAddProfileOverlay, setShowAddProfileOverlay] = useState(false);

    const [profileData, setProfileData] = useState({});

    // mock profile list
    const [userProfilesList, setUserProfilesList] = useState([]);

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


        const fetchLinkedProfiles = async () => {

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };
            try {
                const response = await axios.get(`${API_BASE_URL}get-linked-profiles/`, config);
                console.log(response.data);
                setUserProfilesList(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
            }
        }



        if (authState.isAuthenticated) {
            fetchProfileData();
            fetchLinkedProfiles();
        }

    }, [authState.isAuthenticated, setProfileData, setUserProfilesList]);

    const switchProfileFromMenu = async (linkedProfileUsername) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authState.token}`,
            },
        };

        const data = {
            linked_profile_username: linkedProfileUsername,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}switch-profile/`, data, config);
            // Assuming the server returns the updated user information after switching profiles
            // Update the user context or session on the client side
            switchProfile(response.data);
        } catch (error) {
            console.error('Error switching profile:', error);
        }
    };


    const profileMenuLinks = [
        { label: 'Profile', url: '/personal/profile/academic', role: 'Personal' },
        // { label: 'Profile', url: '/personal/profile/interaction', role: 'Personal' },

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
                        (userRole === link.role) && (<a href={link.url} key={`${link.label}-${link.role}`}>
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
            <div className='profile-menu-account-profiles-list'>
                <div className='profile-menu-account-profiles-list-title'>
                    <p>Profiles</p>
                    <div className='profile-menu-account-profiles-add-profile-button'>
                        <button onClick={() => setShowAddProfileOverlay(true)}>+ Add Profile</button>
                    </div>
                </div>
                {userProfilesList.length !== 0 &&
                <div className='profile-menu-account-profiles-list-content'>
                    <div className='profile-menu-account-profiles-list-content-inner'>
                        {userProfilesList.map((profile, index) => (
                            <div className='profile-menu-per-account-profile' key={`${index}-${profile.profile_role}`} onClick={() => switchProfileFromMenu(profile.username)}>
                                <div className='profile-menu-per-account-profile-inner'>
                                    <div className='profile-menu-per-account-profile-picture-container'>
                                        <div className='profile-menu-per-account-profile-picture-container-inner'>
                                            <img src={`${profile.profile_picture !== null ? profile.profile_picture : default_profile_picture}`} />
                                        </div>
                                    </div>
                                    <div className='profile-menu-per-account-profile-info-container'>
                                        <div className='profile-menu-per-account-profile-info-container-inner'>
                                            <div className='profile-menu-per-account-profile-username-email-container'>
                                                <p>{profile.username}</p>
                                                <p>{profile.email}</p>
                                            </div>
                                            <div className='profile-menu-per-account-profile-role-container'>
                                                <p>{profile.profile_role}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            </div>
            {showAddProfileOverlay &&
                <ProfileAddAuthOverlay setShowAddProfileOverlay={setShowAddProfileOverlay} />
            }
        </div>
    );
};

ProfileMenu.propTypes = {
    user: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
};

export default ProfileMenu;
