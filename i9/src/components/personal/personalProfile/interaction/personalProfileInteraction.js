import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import './personalProfileInteraction.css';
import API_BASE_URL from '../../../../config';
import default_profile_picture from '.././../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../../utils/formatDateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PerPostGrid from '../../postUI/postGrid/postGrid';

const PersonalProfileInteraction = ({ handleExpandPostOpen }) => {
    const { authState } = useAuth();

    const [interactionUserData, setInteractionUserData] = useState({});
    const [postsData, setPostsData] = useState();

    const fetchProfileData = async () => {
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

    useEffect(() => {
        fetchProfileData();
    }, []);


    return (
        <div className='personal-profile-interaction-tab-content'>
            <div className='personal-profile-interaction-tab-content-inner'>
                <div className='personal-profile-interaction-tab-user-info-container'>
                    <div className='personal-profile-interaction-tab-user-info-container-inner'>
                        <div className='personal-profile-interaction-tab-user-info-container-inner-inner'>
                            <div className='personal-profile-interaction-tab-user-info-container-inner-right'>
                                <div className='personal-profile-interaction-user-profile-picture-container'>
                                    <div className='personal-profile-interaction-user-profile-picture'>
                                        <img alt={`profile-menu-icon`} src={interactionUserData ? interactionUserData.profilePicture ? interactionUserData.profilePicture : default_profile_picture : default_profile_picture} />
                                    </div>
                                </div>
                                <div className='personal-profile-interaction-user-info-text'>
                                    <div className='personal-profile-interaction-name-text'>{interactionUserData.first_name} {interactionUserData.last_name}</div>
                                    <div className='personal-profile-interaction-username-text'>@{interactionUserData.username}</div>
                                </div>
                            </div>
                            <div className='personal-profile-interaction-tab-user-info-container-inner-left'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='personal-profile-interaction-content-container'>
                    <div className='personal-profile-interaction-posts-grid'>
                        <div className='personal-profile-interaction-posts-grid-inner'>
                            <div className='personal-profile-interaction-posts-grid-inner-inner'>
                                {postsData &&
                                    postsData.map((post, index) => (
                                        <div className='grid-per-post' key={`${post.id}-${index}`}>
                                            <PerPostGrid classname={'profile'} postData={post} handleExpandPostOpen={handleExpandPostOpen} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                    <div className='personal-profile-interaction-right-sidebar'>
                        <div className='personal-profile-interaction-right-sidebar-inner'>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalProfileInteraction;