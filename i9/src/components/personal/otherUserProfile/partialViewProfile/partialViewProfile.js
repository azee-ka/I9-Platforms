import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './partialViewProfile.css';
import API_BASE_URL, { CLIENT_BASE_URL } from '../../../../config';
import ProfilePicture from '../../../../utils/getProfilePicture';
import { useAuth } from '../../../../reducers/auth/useAuth';
import { Link } from 'react-router-dom';
import AlertModule from '../../../../alert/alert';

const PartialViewProfile = ({ profileData }) => {
    const { authState } = useAuth();
    console.log(profileData);
    const [followRequested, setFollowRequested] = useState(false);

    const [followErrorMessage, setFollowErrorMessage] = useState('');

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
            if(response.data.message === 'Request to follow was sent! Pending approval.') {
                setFollowRequested(true)
            } else if(response.data.message === 'Your previous request to follow is still pending! Wait for the approval.') {
                setFollowErrorMessage(response.data.message);
            }
                        // window.location.reload();
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
                                    <p>{profileData.followers_count} followers</p>
                                    <p>{profileData.following_count} following</p>
                                </div>
                                <div className='partial-view-user-profile-info-card-follow-button'>
                                    {profileData.is_followed_by_current_user === false ? (
                                        followRequested ? (
                                            <button onClick={handleFollowButtonClick}>Requested</button>
                                        ) : (
                                            <button onClick={handleFollowButtonClick}>Follow</button>
                                        )
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
                    <p>This profile is private! Follow user to view their content.</p>
                </div>
            </div>
            {followErrorMessage !== '' &&
                <AlertModule message={followErrorMessage} showAlert={followErrorMessage} setShowAlert={setFollowErrorMessage} />
            }
        </div>
    );
}

export default PartialViewProfile;