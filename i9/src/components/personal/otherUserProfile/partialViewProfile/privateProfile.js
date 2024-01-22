import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './partialViewProfile.css';
import API_BASE_URL from '../../../../config';
import ProfilePicture from '../../../../utils/getProfilePicture';
import { useAuth } from '../../../../reducers/auth/useAuth';

const PartialViewProfile = ({ profileData }) => {
    const { authState } = useAuth();
    console.log(profileData);

    const handleFollowButtonClick = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };

            const response = await axios.post(`${API_BASE_URL}personal/follow/${profileData.id}/`, config);
            console.log(response.data);
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
                                    <p>@{profileData.username}</p>
                                </div>
                                <div className='partial-view-user-profile-info-card-followers-following-count'>
                                    <p>{profileData.followers_count} followers</p>
                                    <p>{profileData.following_count} following</p>
                                </div>
                                <div className='partial-view-user-profile-info-card-follow-button'>
                                    <button onClick={handleFollowButtonClick}>Follow</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='partial-view-profile-is-private-message-container'>
                    <p>This profile is private! Follow user to view their content.</p>
                </div>
            </div>
        </div>
    );
}

export default PartialViewProfile;