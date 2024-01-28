import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profilePrivacy.css';
import API_BASE_URL from '../../../../../config';
import { useAuth } from '../../../../../reducers/auth/useAuth';

const ProfilePrivacy = () => {
    const { authState } = useAuth();
    const [isProfilePrivate, setIsProfilePrivate] = useState(false);

    const handleToggle = () => {
        setIsProfilePrivate(!isProfilePrivate);
        handleChangeProfileVisiblity();
    };

    const handleChangeProfileVisiblity = async () => {
        try {
            const privacy = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authState.token}`
              }
            };
      
            const data = {
                is_profile_private: isProfilePrivate,
            };
      
            const response = await axios.post(`${API_BASE_URL}toggle-profile-visibility/`, data, privacy);
            console.log(response.data);

          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
    }


    const fetchUserProfileVisiblity = async () => {
        try {
            const privacy = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authState.token}`
              }
            };

            const response = await axios.get(`${API_BASE_URL}get-profile-visibility/`, privacy);
            console.log(response.data);
            setIsProfilePrivate(response.data.visibility === 'private' ? true : false);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
    };

    useEffect(() => {
        fetchUserProfileVisiblity();
    }, []);

    return (
        <div className='settings-profile-privacy-tab'>
            <div className='settings-profile-privacy-tab-inner'>
                <div className='settings-profile-profile-privacy-container'>
                    <h3>Profile Privacy</h3>
                    <div className='settings-profile-profile-privacy-content'>
                        <h4>Profile Visibility</h4>
                        <div className='settings-profile-profile-privacy-content-toggle-visibility-container'>
                            <div className='settings-profile-profile-privacy-content-toggle-visibility-description-container'>
                                <p>
                                    Adjust the visibility of your profile to control who can view your content. When set to private,
                                    only your followers will have access to your content. A public profile allows anyone to view your
                                    content. When toggled on, the profile is set to private mode.
                                </p>
                            </div>
                            <div className='settings-profile-profile-privacy-content-toggle-visibility-button-container'>
                                {/* Toggle Slider */}
                                <label className='toggle-switch'>
                                    <input type='checkbox' checked={isProfilePrivate} onChange={handleToggle} />
                                    <span className='slider round'></span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePrivacy;
