// LearnerProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './learnerProfile.css';
import API_BASE_URL from '../../../config';

const LearnerProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [learnerInfo, setLearnerInfo] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [preferences, setPreferences] = useState({});

  const { authState } = useAuth();

  const fetchProfileData = async () => {
    try {
      setUserInfo(authState.user);

      // const infoResponse = await axios.get('/api/learner/profile');
      // setLearnerInfo(infoResponse.data);


      // const achievementsResponse = await axios.get('/api/learner/achievements');
      // setAchievements(achievementsResponse.data);

      // const preferencesResponse = await axios.get('/api/learner/preferences');
      // setPreferences(preferencesResponse.data);
    } catch (error) {
      console.error('Error fetching learner profile data:', error.message);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className='learner-profile-container'>
      <div className='learner-profile-container-inner'>
        <div className='learner-profile-header'>
          <h2>My Profile</h2>
          <h3>Learner</h3>
        </div>
        <div className='learner-profile-content'>
          <div className='learner-profile-content-inner'>
            <div className='learner-profile-user-basic-info'>
              <div className='learner-profile-user-basic-info-inner'>
                <div className='learner-profile-user-basic-info-left-side'>
                  <div className='learner-profile-user-basic-info-left-side-inner'>
                    <div className='learner-profile-user-profile-picture'>
                      <img alt={`profile-picture`} src={`${API_BASE_URL}get-user/profile-picture`} />
                    </div>
                    <div className='learner-profile-user-info-text'>
                      <div className='learner-profile-name-text'>{userInfo.first_name} {userInfo.last_name}</div>
                      <div className='learner-profile-username-text'>@{userInfo.username}</div>
                      <div className='learner-profile-username-text'>@{userInfo.username}</div>
                    </div>
                  </div>
                </div>
                <div className='learner-profile-user-basic-info-right-side'>

                </div>
              </div>
            </div>
            <div className='learner-profile-user-education-info'>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LearnerProfile;
