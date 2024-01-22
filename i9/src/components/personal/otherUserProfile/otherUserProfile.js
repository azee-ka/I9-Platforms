import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './otherUserProfile.css';
import API_BASE_URL from '../../../config';

import PrivateProfile from './privateProfile/privateProfile';
import PublicProfile from './publicProfile/publicProfile';
import PersonalProfile from '../personalProfile/personalProfile';

import { useNavigate, useParams } from 'react-router';
import { useAuth } from '../../../reducers/auth/useAuth';

const OtherUserProfile = () => {
    const { username } = useParams();
    const { authState } = useAuth();
    const navigate = useNavigate();

    const [profileViewStatus, setProfileViewStatus] = useState('public');

    const fetchProfileData = async () => {
        try {
            const config = {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authState.token}`
              }
            };
      
            const response = await axios.get(`${API_BASE_URL}personal/profile/${username}/`, config);
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching profile data:', error);
          }
    };

    useEffect(() => {
        if(username === authState.user.username) {
            setProfileViewStatus('my-profile');
            navigate('/personal/profile', {replace: true});

        } else if(username !== authState.user.username) {
            setProfileViewStatus('other-private-profile');
            fetchProfileData();
        } else {
            setProfileViewStatus('other-public-profile');
            fetchProfileData();
        }
    }, []);



    return (profileViewStatus === 'my-profile') ? (
        <PersonalProfile />
    ) : (
        (profileViewStatus === 'other-private-profile') ? (
            <PrivateProfile />
        ) : (
            <PublicProfile />
        )
    )
}
 
export default OtherUserProfile;