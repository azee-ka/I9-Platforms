// personalProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './personalSettings.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';

import ProfileConfiguration from './settingsComponents/profileConfiguration/profileConfiguration';
import LinkedProfiles from './settingsComponents/linkedProfiles/linkedProfiles';
import ProfilePrivacy from './settingsComponents/profilePrivacy/profilePrivacy';

const PersonalSettings = () => {

    const handleTabClick = (tabTitle) => {
        setActiveTab(tabTitle);
    };

    const [settingsOptions, setSettingOptions] = useState([
        {
            title: 'Profile Congifuration',
            contentComponent: ProfileConfiguration,
        },
        {
            title: 'Profile Privacy',
            contentComponent: ProfilePrivacy,
        },
        {
            title: 'Manage Linked Profiles',
            contentComponent: LinkedProfiles,
        },
    ]);

    const [activeTab, setActiveTab] = useState(settingsOptions[0].title);

    return (
        <div className='personal-settings-container'>
            <div className='personal-settings-container-inner'>
                <div className='personal-settings-header'>
                    <h2>Preferences</h2>
                </div>
                <div className='personal-settings-content'>
                    <div className='personal-settings-content-inner'>
                        {settingsOptions.map((settingOption, index) => {
                            if (settingOption.title === activeTab) {
                                const ContentComponent = settingOption.contentComponent;
                                return (
                                    <div className='profile-settings-per-tab-content' key={`${settingOption.title}-${index}`}>
                                        <ContentComponent />
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <div className='personal-settings-right-sidebar'>
                        <h3>Options</h3>
                        <div className='personal-settings-right-sidebar-inner'>
                            {settingsOptions.map((element, index) => (
                                <div className='personal-settings-right-sidebar-per-element' key={`${index}-${element.title}`} onClick={() => handleTabClick(element.title)}>
                                    <div className='personal-settings-right-sidebar-per-element-inner'>
                                        <div className='personal-settings-right-sidebar-per-element-inner-inner'>
                                            {element.title}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalSettings;
