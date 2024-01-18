// personalProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './personalProfile.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import OverlayContent from './academic/overlayContent';
import PersonalProfileInteraction from './interaction/personalProfileInteraction';
import PersonalProfileAcademic from './academic/personalProfileAcademic';
import PerPostGrid from '../postUI/postGrid/postGrid';

const PersonalProfile = ({ handleExpandPostOpen }) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { overlay } = useParams();
  const [profileData, setProfileData] = useState({});

  const [personalProfileInfo, setPersonalProfileInfo] = useState({});

  const [isAcademicMode, setIsAcademicMode] = useState(true);


  const fetchProfileData = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authState.token}`
            }
        };
        const response = await axios.get(`${API_BASE_URL}profile/get-user-info/`, config);
        setProfileData(response.data);
    } catch (error) {
        console.error('Error fetching profile data:', error);
    }
};

useEffect(() => {
  if(window.location.pathname.includes('/interaction')) {
    setIsAcademicMode(false);
  }
}, []);

useEffect(() => {
  fetchProfileData();
}, []);

  return (
    <div className='personal-profile-container'>
      <div className='personal-profile-container-inner'>
        <div className='personal-profile-header'>
          <h2>My Profile</h2>

          <div className='personal-profile-mode-switch-tab'>
            <div className='personal-profile-mode-switch-tab-inner'>
              <div className={`personal-profile-academic-tab ${isAcademicMode ? 'active' : ''}`}>
                <button onClick={() => setIsAcademicMode(true)} >Academic</button>
              </div>
              <div className={`personal-profile-interaction-tab ${!isAcademicMode ? 'active' : ''}`}>
                <button onClick={() => setIsAcademicMode(false)} >Interaction</button>
              </div>
            </div>
          </div>

          <div className='personal-profile-description'>
            <h3>{authState.user.role}</h3>
            <div>Active since {formatDateTime(profileData.date_joined, true)}</div>
          </div>
        </div>
        {isAcademicMode ? (
            <PersonalProfileAcademic profileData={profileData} />
        ) : (
          <PersonalProfileInteraction handleExpandPostOpen={handleExpandPostOpen} />
        )
        }
      </div>
    </div>
  );
};

export default PersonalProfile;
