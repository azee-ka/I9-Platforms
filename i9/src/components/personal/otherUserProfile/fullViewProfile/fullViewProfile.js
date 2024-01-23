import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './fullViewProfile.css';
import API_BASE_URL from '../../../../config';
import { useAuth } from '../../../../reducers/auth/useAuth';
import ProfilePicture from '../../../../utils/getProfilePicture';
import { Link } from 'react-router-dom';
import { CLIENT_BASE_URL } from '../../../../config';
import UserListOverlay from '../../personalTimeline/followListOverlay';

const FullViewProfile = ({ profileData }) => {
    const { authState } = useAuth();
    console.log(profileData);

    const [showFollowersOverlay, setShowFollowersOverlay] = useState(false);
    const [showFollowingOverlay, setShowFollowingOverlay] = useState(false);

    const handleFollowButtonClick = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };

            const data = {

            }
            const response = await axios.post(`${API_BASE_URL}personal/follow/${profileData.username}/`, data, config);
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleUnfollowButtonClick = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };

            const data = {

            }
            const response = await axios.post(`${API_BASE_URL}personal/unfollow/${profileData.username}/`, data, config);
            console.log(response.data);
            window.location.reload();
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    const handleCloseOverlay = () => {
        setShowFollowersOverlay(false);
        setShowFollowingOverlay(false);
    }

    return (
        <div className='partial-view-user-profile'>
            <div className='partial-view-user-profile-inner'>
                <div className='partial-view-user-profile-info-container'>
                    <div className='partial-view-user-profile-info-container-inner'>
                        <div className='partial-view-user-profile-info-card'>
                            <div className='partial-view-user-profile-info-card-profile-picture'>
                                <div className='partial-view-user-profile-info-card-profile-picture-inner'>
                                    <ProfilePicture src={profileData.profile_picture} />
                                </div>
                            </div>
                            <div className='partial-view-user-profile-info-card-user-text-info'>
                                <div className='partial-view-user-profile-info-card-username'>
                                    <Link to={`${CLIENT_BASE_URL}/personal/profile/${profileData.username}`} className='custom-link'>
                                        <p>@{profileData.username}</p>
                                    </Link>
                                </div>
                                <div className='partial-view-user-profile-info-card-followers-following-count'>
                                    <p onClick={() => setShowFollowersOverlay(true)}>{profileData.followers_count} followers</p>
                                    <p onClick={() => setShowFollowingOverlay(true)}>{profileData.following_count} following</p>
                                </div>
                                <div className='partial-view-user-profile-info-card-follow-button'>
                                    {profileData.is_followed_by_current_user === false ? (
                                        <button onClick={handleFollowButtonClick}>Follow</button>
                                    ) : (
                                        <button onClick={handleUnfollowButtonClick}>Unfollow</button>
                                    )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='partial-view-profile-is-private-message-container'>
                </div>
            </div>
            {showFollowersOverlay && (
                <UserListOverlay userList={profileData.followers_list} onClose={handleCloseOverlay} title={'Followers'} />
            )}
            {showFollowingOverlay && (
                <UserListOverlay userList={profileData.following_list} onClose={handleCloseOverlay} title={'Following'} />
            )}
        </div>
    );
}

export default FullViewProfile;