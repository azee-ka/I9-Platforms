// ProfileMenu.js
import React from 'react';
import PropTypes from 'prop-types';
import './profileMenu.css';
const ProfileMenu = ({ user, logout }) => {
    const profileMenuLinks = [
        { label: 'Profile', url: '/learner/profile', role: 'learner' },
        { label: 'Settings', url: '/learner/settings', role: 'learner' },
        { label: 'Messages', url: '/learner/messages', icon: '📬', role: 'learner' },
    ];
    return (
        <div className="profile-menu-container">
            <div className='profile-menu-user-info-container'>
                <div className='profile-menu-profile-picture-container'>
                    
                </div>
                <div className='profile-menu-text-info-container'>
                    <div>Username: {user.username}</div>
                    <div>Name: {user.first_name} {user.last_name}</div>
                </div>
            </div>
            <div className="profile-menu-links">
                <ul>
                    {profileMenuLinks.map((link) => (
                        <a href={link.url} key={`${link.label}-${link.role}`}>
                            <li id='exclude-link'>
                                <div className='profile-menu-per-link'>
                                    <div className='profile-menu-link-label'>
                                        {link.label}
                                    </div>
                                    {link.icon && <span className="link-icon">{link.icon}</span>}
                                </div>
                            </li>
                        </a>
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
