// LearnerProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './learnerProfile.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';

const LearnerProfile = () => {
  const [profileData, setProfileData] = useState({});

  const [learnerEducationInfo, setaLearnerEducationInfo] = useState([
    {
      insitution: 'Ohlone College', 
      attended_from_to : 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh', 
    },
    {
      insitution: 'Ohlone College', 
      attended_from_to : 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh', 
    },
    {
      insitution: 'Ohlone College', 
      attended_from_to : 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh', 
    },
    {
      insitution: 'Ohlone College', 
      attended_from_to : 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh', 
    },
    {
      insitution: 'Ohlone College', 
      attended_from_to : 'Jun 2022 - Present',
      description: 'dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh  rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh  r hrgh rgrgrg rg grrggrgh ghrggdfshh  r hrgh rgrgrg rg grrggrgh ghrgg dfshh r hrgh rgrgrg rg grrggrgh ghrgg dfshh  dfshh   r hrgh rgrgrg rg grrggrgh  ghrgg dfshh dfshh  r hrgh rgrgrggrgrg g rgh ghrgg dfshh  rg grrggrgh ghrgg rgh rgrgrg rg grrggrgh ghrgg dfs r hrgh rgrgrg rg grrggrgh', 
    },
  ]);

  const [learnerInfo, setLearnerInfo] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [preferences, setPreferences] = useState({});

  const { authState } = useAuth();

  const fetchProfileData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authState.token}`
        }
      };
      const response = await axios.get(`${API_BASE_URL}profile/get-user-info/`, config);
      setProfileData(response.data); // Assuming the response contains the profile picture URL
    } catch (error) {
      console.error('Error fetching profile data:', error);
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
          <h3>{authState.user.role}</h3>
        </div>
        <div className='learner-profile-content'>
          <div className='learner-profile-content-inner'>
            <div className='learner-profile-user-basic-info'>
              <div className='learner-profile-user-basic-info-inner'>
                <div className='learner-profile-user-basic-info-left-side'>
                  <div className='learner-profile-user-basic-info-left-side-inner'>
                    <div className='learner-profile-user-profile-picture'>
                      <img alt={`profile-menu-icon`} src={profileData ? profileData.profilePicture ? profileData.profilePicture : default_profile_picture : default_profile_picture} />
                    </div>
                    <div className='learner-profile-user-info-text'>
                      <div className='learner-profile-name-text'>{profileData.first_name} {profileData.last_name}</div>
                      <div className='learner-profile-username-text'>@{profileData.username}</div>
                    </div>
                  </div>
                </div>
                <div className='learner-profile-user-basic-info-right-side'>

                </div>
              </div>
            </div>
            <div className='learner-profile-user-education-info'>
              <div className='learner-profile-user-education-info-inner'>
                {learnerEducationInfo.map((educationItem) => (
                    <div className='learner-profile-user-education-per-institution'>
                    <div className='learner-profile-user-educator-per-institution-inner'>
                      <div className='learner-profile-education-institution-title-container'>
                        <h3>{educationItem.insitution}</h3>
                      </div>
                      <div className='learner-profile-education-institution-date-data-container'>
                        <p>{educationItem.attended_from_to}</p>
                      </div>
                      <div className='learner-profile-education-institution-description-container'>
                        <div className='learner-eduacation-institution-description-text-container'>
                          <p>{educationItem.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default LearnerProfile;
