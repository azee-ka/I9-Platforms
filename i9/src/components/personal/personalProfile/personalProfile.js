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
import PostsGrid from '../postUI/postGrid/postGrid';
import ProfilePictureEditor from '../utils/profilePictureEditor/profilePictureEditor';
import ProfilePicture from '../../../utils/getProfilePicture';
import UserListOverlay from '../utils/userListOverlay/userListOverlay';

const PersonalProfile = ({ handleExpandPostOpen }) => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  const [showFollowingListOverlay, setShowFollowingListOverlay] = useState(false);
  const [showFollowersListOverlay, setShowFollowersListOverlay] = useState(false);

  const { overlay } = useParams();
  const [profileData, setProfileData] = useState({});

  const [showProfilePictureEditor, setShowProfilePictureEditor] = useState(false);
  const [personalProfileInfo, setPersonalProfileInfo] = useState({});

  const [currentProfilePicture, setCurrentProfilePicture] = useState(null);
  const [selectedProfilePicture, setSelectedProfilePicture] = useState("default");

  const [interactionUserData, setInteractionUserData] = useState({});
  const [postsData, setPostsData] = useState();

  const fetchProfileDataSpecific = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authState.token}`
        }
      };
      const response = await axios.get(`${API_BASE_URL}personal/get-profile/`, config);
      setInteractionUserData(response.data);
      setPostsData(response.data.my_posts);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };


  const fetchProfileData = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authState.token}`
        }
      };

      const response = await axios.get(`${API_BASE_URL}personal/get-profile/`, config);
      setProfileData(response.data);
      console.log(response.data)
      setCurrentProfilePicture(response.data.profile_picture === null ? default_profile_picture : response.data.profile_picture);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };


  useEffect(() => {
    fetchProfileData();
    fetchProfileDataSpecific();
  }, []);


  const handleUserListOverlayClose = () => {
    setShowFollowersListOverlay(false);
    setShowFollowingListOverlay(false);
  }

  const handleProfilePictureOverlayClickOpen = () => {
    console.log('open')
    setShowProfilePictureEditor(true);
  };
  const handleProfilePictureOverlayClickClose = () => {
    console.log('close')
    setShowProfilePictureEditor(false);
  };

  const handleProfilePictureUpdate = async (croppedImage) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authState.token}`
        }
      };

      const data = {
        profile_picture: croppedImage,
      };

      const response = await axios.patch(`${API_BASE_URL}update-profile-picture/`, data, config);
      console.log(response.data);
      // console.log(`${API_BASE_URL}${response.data.profile_picture}`);
      // setCurrentProfilePicture(response.data.profile_picture);
      window.location.reload();
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

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
        <div className='personal-profile-interaction-tab-content'>
          <div className='personal-profile-interaction-tab-content-inner'>
            <div className='personal-profile-interaction-tab-user-info-container'>
              <div className='personal-profile-interaction-tab-user-info-container-inner'>
                <div className='personal-profile-interaction-tab-user-info-container-inner-inner'>
                  <div className='personal-profile-interaction-tab-user-info-container-inner-right'>
                    <div className='personal-profile-interaction-user-profile-picture-container'>
                      <div className='personal-profile-interaction-user-profile-picture'>
                        <ProfilePicture src={currentProfilePicture} onClick={handleProfilePictureOverlayClickOpen} />
                      </div>
                    </div>
                    <div className='personal-profile-interaction-user-info-text'>
                      <div className='personal-profile-interaction-name-text'>{interactionUserData.first_name} {interactionUserData.last_name}</div>
                      <div className='personal-profile-interaction-username-text'>@{interactionUserData.username}</div>
                    </div>
                  </div>
                  <div className='personal-profile-interaction-tab-user-info-container-inner-left'>
                    <div className='personal-profile-user-info-followers-following-posts-counts-widget-container'>
                      <div className='personal-profile-posts-count-container'>
                        <p>{profileData.my_posts && profileData.my_posts.length} posts</p>
                      </div>
                      <div className='personal-profile-followers-following-count-container'>
                        <p onClick={() => setShowFollowersListOverlay(true)}>{profileData.followers_count} followers</p>
                        <p onClick={() => setShowFollowingListOverlay(true)}>{profileData.following_count} following</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='personal-profile-interaction-content-container'>
              <div className='personal-profile-interaction-posts-grid'>
                <div className='personal-profile-interaction-posts-grid-inner'>
                  {postsData &&
                    <PostsGrid classname={'profile'} postsData={postsData} handleExpandPostOpen={handleExpandPostOpen} />
                  }
                </div>
              </div>
              <div className='personal-profile-interaction-right-sidebar'>
                <div className='personal-profile-interaction-right-sidebar-inner'>

                </div>
              </div>
            </div>
          </div>
          {showProfilePictureEditor &&
            <ProfilePictureEditor
              selectedProfilePicture={selectedProfilePicture}
              setSelectedProfilePicture={setSelectedProfilePicture}
              onClose={handleProfilePictureOverlayClickClose}
              onSave={handleProfilePictureUpdate}
              currentProfilePicture={currentProfilePicture}
              setCurrentProfilePicture={setCurrentProfilePicture}
            />
          }
          {showFollowersListOverlay &&
            <UserListOverlay userList={profileData.followers_list} title={'Followers'} onClose={handleUserListOverlayClose} />
          }
          {showFollowingListOverlay &&
            <UserListOverlay userList={profileData.following_list} title={'Following'} onClose={handleUserListOverlayClose} />
          }
        </div>
      </div>
    </div>
  );
};

export default PersonalProfile;
