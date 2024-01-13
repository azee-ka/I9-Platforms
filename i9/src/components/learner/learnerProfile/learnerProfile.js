// LearnerProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './learnerProfile.css';

const LearnerProfile = () => {
  const [learnerInfo, setLearnerInfo] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [preferences, setPreferences] = useState({});

  const { authState } = useAuth();

  useEffect(() => {
    // Fetch learner's profile data from your backend API
    const fetchProfileData = async () => {
      try {
        // const infoResponse = await axios.get('/api/learner/profile');
        // setLearnerInfo(infoResponse.data);
        setLearnerInfo(authState.user);


        // const achievementsResponse = await axios.get('/api/learner/achievements');
        // setAchievements(achievementsResponse.data);

        // const preferencesResponse = await axios.get('/api/learner/preferences');
        // setPreferences(preferencesResponse.data);
      } catch (error) {
        console.error('Error fetching learner profile data:', error.message);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div className='learner-profile-container'>
      <div className='learner-profile-container-inner'>
        <h2>Profile</h2>
        <div className='learner-profile-content'>
          <div className='learner-profile-content-inner'>
            <div className='learner-profile-user-basic-info'>
              <div className='learner-profile-user-basic-info-inner'>
                <div className='learner-profile-user-basic-info-left-side'>
                  
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
