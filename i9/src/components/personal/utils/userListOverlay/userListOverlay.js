// followListOverlay.js
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import API_BASE_URL from '../../../../config';
import './userListOverlay.css'; // Import the CSS file
import crossIcon from '../../../../assets/cross-icon.png';
import { useAuth } from '../../../../reducers/auth/useAuth';
import default_profile_picture from '../../../../assets/default_profile_picture.png';

const UserListOverlay = ({ userList, onClose, title }) => {
    const { authState } = useAuth();
    const user = authState.user;

    useEffect(() => {
        document.addEventListener('mousedown', handleCloseOverlay);
        return () => document.removeEventListener('mousedown', handleCloseOverlay);
    }, []);

    const handleCloseOverlay = (event) => {
        if (event.target.classList.contains('follow-list-overlay')) {
            onClose();
        }
    };


    const myUsernameIsNotSameUser = (thisUser) => {
        return !(user.username === thisUser);
    }

    return (
        <div id="follow-list-overlay" className="follow-list-overlay">
            <div className='follow-list-container'>
                <button className="follow-close-button" onClick={onClose}>
                    <img src={crossIcon} alt="Clear" />
                </button>
                <div className="follow-list-header">
                    <h2>{title}</h2>
                    <div className='follow-overlay-line-seperator'></div>
                </div>
                {userList.length !== 0 && (
                    <div className="follow-list">
                        {userList.map((thisUser, index) => (
                            <a href={myUsernameIsNotSameUser(thisUser.username) ? `http://localhost:3000/profile/${thisUser.username}` : `http://localhost:3000/profile`} key={`${thisUser.id}-${index}`}>
                                <div className="follow-list-item">
                                    <div className='profile-picture-img-container-user-list-overlay'>
                                    <img src={`${thisUser.profile_picture !== null ? API_BASE_URL + thisUser.profile_picture : default_profile_picture}`} alt={thisUser.username} />

                                    </div>
                                    <span>{thisUser.username}</span>
                                </div>
                            </a>
                        ))}
                    </div>
                )}


                {userList.length === 0 &&
                    <div className="no-follow">
                        <p>{`No ${title}`}</p>
                    </div>
                }
            </div>
        </div>
    );
};

export default UserListOverlay;
