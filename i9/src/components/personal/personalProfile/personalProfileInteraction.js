import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './personalProfileInteraction.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import PerPostGrid from './perPostGrid';

const PersonalProfileInteraction = ({ profileData, handleShowPostOverlay }) => {
    const { authState } = useAuth();

    return (
        <div className='personal-profile-interaction-tab-content'>
            <div className='personal-profile-interaction-tab-content-inner'>
                <div className='personal-profile-interaction-tab-user-info-container'>
                    <div className='personal-profile-interaction-tab-user-info-container-inner'>
                        <div className='personal-profile-interaction-tab-user-info-container-inner-inner'>
                            <div className='personal-profile-interaction-tab-user-info-container-inner-right'>
                                <div className='personal-profile-interaction-user-profile-picture-container'>
                                    <div className='personal-profile-interaction-user-profile-picture'>
                                        <img alt={`profile-menu-icon`} src={profileData ? profileData.profilePicture ? profileData.profilePicture : default_profile_picture : default_profile_picture} />
                                    </div>
                                </div>
                                <div className='personal-profile-interaction-user-info-text'>
                                    <div className='personal-profile-interaction-name-text'>{profileData.first_name} {profileData.last_name}</div>
                                    <div className='personal-profile-interaction-username-text'>@{profileData.username}</div>
                                </div>
                            </div>
                            <div className='personal-profile-interaction-tab-user-info-container-inner-left'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='personal-profile-interaction-posts-grid'>
                    <PerPostGrid cl={"profile"} handleShowPostOverlay={handleShowPostOverlay} />
                </div>
            </div>
        </div>
    );
};

export default PersonalProfileInteraction;