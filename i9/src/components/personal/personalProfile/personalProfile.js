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
import OverlayContent from './overlayContent';

const PersonalProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { overlay } = useParams();
  const [profileData, setProfileData] = useState({});


  const [titleField, setTitleField] = useState('');
  const [descriptionField, setDescriptionField] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [personalProfileInfo, setPersonalProfileInfo] = useState({});


  const handleOverlaySubmit = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${authState.token}`
      }
    };

    const dataToSend = {
      // 'user': authState.user.id,
      'module_title': activeEditTabName,
      'details': descriptionField
      // [
      //   {
      //     'association_name': titleField,
      //     'start_date': startDate,
      //     'end_date': endDate,
      //     'description': descriptionField,
      //   }
      // ]
    };

    try {
      console.log(dataToSend);
      console.log(authState.token);

      const response = await axios.post(`${API_BASE_URL}personal/module/create/`, dataToSend, config);
      console.log(response.data);
      // personalProfileInfo(response.data)
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };




  const editTabs = [
    {
      edit_tab_title: 'Add Projects',
      value: 'projects',
      name: 'Project'
    },
    {
      edit_tab_title: 'Add Education',
      value: 'education',
      name: 'Education'
    },
    {
      edit_tab_title: 'Add Industry Experience',
      value: 'industry_experience',
      name: 'Industry Experience'
    },
  ];

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

      const response_module = await axios.get(`${API_BASE_URL}personal/module/get-data/`, config);
      console.log(response_module.data);
      setPersonalProfileInfo(response_module.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };



  const [editBarCollapsed, setEditBarCollapsed] = useState(true);

  const [activeEditOverlay, setActiveEditOverlay] = useState(null);
  const [activeEditTabTitle, setActiveEditTabTitle] = useState(null);
  const [activeEditTabName, setActiveEditTabName] = useState(null);

  const [isOverlayVisible, setIsOverlayVisible] = useState(false);

  const openOverlay = () => {
    setIsOverlayVisible(true);
  };

  const closeOverlay = () => {
    setIsOverlayVisible(false);
    navigate(null, { replace: true });
  };



  const handleEditBarClick = (activeBar, activeBarTtitle, activeBarName) => {
    setActiveEditOverlay(activeBar);
    navigate(`#${activeBar}`, { replace: true });
    setActiveEditTabTitle(activeBarTtitle);
    setActiveEditTabName(activeBarName);
    openOverlay();
  };


  useEffect(() => {
    fetchProfileData();
  }, []);


  useEffect(() => {
    const hasOverlayParam = editTabs.some((tab) => location.hash.includes(tab.value));
    // Conditionally open the overlay based on the parameter
    if (hasOverlayParam) {
      openOverlay();
      setEditBarCollapsed(false);
      setActiveEditOverlay(location.hash.replace('#', ''));

      const activeTabObject = editTabs.find((tab) => tab.value === (location.hash.replace('#', '')));
      setActiveEditTabTitle(activeTabObject ? activeTabObject.edit_tab_title : null);
      setActiveEditTabName(activeTabObject ? activeTabObject.name : null);
    }
  }, []);


  return (
    <div className='personal-profile-container'>
      <div className='personal-profile-container-inner'>
        <div className='personal-profile-header'>
          <h2>My Profile</h2>
          <div className='personal-profile-description'>
            <h3>{authState.user.role}</h3>
            <div>Active since {formatDateTime(profileData.date_joined, true)}</div>
          </div>
        </div>
        <div className='personal-profile-content'>
          <div className='personal-profile-content-left'>
            <div className='personal-profile-user-basic-info'>
              <div className='personal-profile-user-basic-info-inner'>
                <div className='personal-profile-user-basic-info-left-side'>
                  <div className='personal-profile-user-basic-info-left-side-inner'>
                    <div className='personal-profile-user-profile-picture'>
                      <img alt={`profile-menu-icon`} src={profileData ? profileData.profilePicture ? profileData.profilePicture : default_profile_picture : default_profile_picture} />
                    </div>
                    <div className='personal-profile-user-info-text'>
                      <div className='personal-profile-name-text'>{profileData.first_name} {profileData.last_name}</div>
                      <div className='personal-profile-username-text'>@{profileData.username}</div>
                    </div>
                  </div>
                </div>
                <div className='personal-profile-user-basic-info-right-side'>

                </div>
              </div>
            </div>
            {/* {personalProfileInfo && console.log(personalProfileInfo) && ( */}
              {/* {personalProfileInfo.map((item, index) => (
                <div className='personal-profile-module-content' key={`${index}-${item.module_title}`}>
                  <div className='personal-profile-user-module-info-title-container'>
                    <h2>{item.module_title}</h2>
                  </div>
                  <div className='personal-profile-user-module-info'>
                    <div className='personal-profile-user-module-info-inner'>
                      {item.property.map((property, propertyIndex) => (

                        <div className='personal-profile-user-module-per-institution' key={`${propertyIndex}-${property.association_name}`}>
                          <div className='personal-profile-user-educator-per-institution-inner'>
                            <div className='personal-profile-module-institution-title-container'>
                              <h3>{property.association_name}</h3>
                            </div>
                            <div className='personal-profile-module-institution-date-data-container'>
                              <p>{property.duration}</p>
                            </div>
                            <div className='personal-profile-module-institution-description-container'>
                              <div className='personal-eduacation-institution-description-text-container'>
                                <p>{property.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))} */}
          </div>
          <div className='personal-profile-content-right'>
            <div className='personal-profile-content-right-sub'>
              <div className='personal-profile-right-edit-bar-toggle-chevron'>
                <div className='personal-profile-right-edit-bar-toggle-chevron-inner' onClick={() => setEditBarCollapsed(!editBarCollapsed)}>
                  <FontAwesomeIcon icon={faChevronRight} className={`chevron-icon ${editBarCollapsed ? 'collapsed' : ''}`} />
                </div>
              </div>
              <div className={`personal-profile-content-right-inner ${editBarCollapsed ? 'collapsed' : ''}`}>
                <div className='personal-profile-content-right-inner-inner'>
                  {editTabs.map((tab, index) => (
                    <div className='personal-profile-edit-per-tab' key={`${index}-${tab.edit_tab_title}`} onClick={() => handleEditBarClick(tab.value, tab.edit_tab_title, tab.name)} >
                      <div className='personal-profile-edit-per-tab-inner'>
                        {tab.edit_tab_title}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOverlayVisible && (
        <div className="overlay-container" onClick={closeOverlay}>
          <OverlayContent activeEditOverlay={activeEditOverlay} onClose={closeOverlay} activeEditTabTitle={activeEditTabTitle} activeEditTabName={activeEditTabName} setTitleField={setTitleField} setDescriptionField={setDescriptionField} setStartDate={setStartDate} setEndDate={setEndDate} handleOverlaySubmit={handleOverlaySubmit} titleField={titleField} descriptionField={descriptionField} />
        </div>
      )}
    </div>
  );
};

export default PersonalProfile;
