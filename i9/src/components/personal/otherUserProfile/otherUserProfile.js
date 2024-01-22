import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './otherUserProfile.css';
import API_BASE_URL from '../../../config';

import PartialViewProfile from './partialViewProfile/privateProfile';
import FullViewProfile from './fullViewProfile/fullViewProfile';
import PersonalProfile from '../personalProfile/personalProfile';

import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../../reducers/auth/useAuth';

const OtherUserProfile = () => {
    const { username } = useParams();
    const { authState } = useAuth();
    const navigate = useNavigate();

    const [isFullViewProfile, setIsFullViewProfile] = useState('loading');
    
    const [profileData, setProfileData] = useState({});

    const fetchProfileData = async () => {
        try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authState.token}`
              }
            };
      
            const response = await axios.get(`${API_BASE_URL}personal/profile/${username}/`, config);
            // console.log(response.data);
            setProfileData(response.data.profile_data);
            setIsFullViewProfile(response.data.is_full_view);
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
    };

    useEffect(() => {
        if(username === authState.user.username) {
            setIsFullViewProfile('my-profile');
            navigate('/personal/profile', {replace: true});

        } else if(username !== authState.user.username) {
            fetchProfileData();
        }
    }, []);



    return (isFullViewProfile === 'loading') ? (
        <div>
            Loading
        </div>
    ) : (isFullViewProfile === 'my-profile') ? (
        <PersonalProfile />
    ) : (
        (isFullViewProfile) ? (
            <FullViewProfile profileData={profileData} />
        ) : (
            <PartialViewProfile profileData={profileData} />
        )
    )
}
 
export default OtherUserProfile;