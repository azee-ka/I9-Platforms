// personalProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './personalSettings.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';

const PersonalSettings = () => {

    const handleTabClick = (tabTitle) => {
        setActiveTab(tabTitle);
        console.log(tabTitle);
    };

    const [settingsOptions, setSettingOptions] = useState([
        {
            title: 'Appearance',
        },
        {
            title: 'Appearance 1',
        },
        {
            title: 'Appearance 2',
        },

    ]);


    const [settingsContent, setSettingsContent] = useState([
        {
            settings_title: 'Appearance',
            configuration: [
                {
                    sub_title: 'Appearance Mode',
                    properties: [
                        {
                            dark: '',
                            light: '',
                        },
                    ],
                    sub_title: 'Background Color',
                    properties: [
                        {
                            choose_color: '',
                        },
                    ],
                },
                {
                    sub_title: 'Brightness',
                    properties: [
                        {

                        },
                    ],
                },
            ]
        },
        {
            settings_title: 'Appearance 1',
            configuration: [
                {
                    sub_title: 'Appearance Mode',
                    properties: [
                        {
                            dark: '',
                            light: '',
                        },
                    ],
                    sub_title: 'Background Color',
                    properties: [
                        {
                            choose_color: '',
                        },
                    ],
                },
                {
                    sub_title: 'Brightness',
                    properties: [
                        {

                        },
                    ],
                },
            ]
        }
    ])

    const [activeTab, setActiveTab] = useState(settingsOptions[0].title);

    return (
        <div className='personal-settings-container'>
            <div className='personal-settings-container-inner'>
                <div className='personal-settings-header'>
                    <h2>Preferences</h2>
                </div>
                <div className='personal-settings-content'>
                    <div className='personal-settings-content-inner'>
                        {settingsContent.map((setting) => {
                            if (setting.settings_title === activeTab) {
                                return (
                                    <div key={setting.settings_title}>
                                        {/* Render content based on the properties of the active tab */}
                                        {setting.configuration.map((config, configIndex) => (
                                            <div key={configIndex}>
                                                <h3>{config.sub_title}</h3>
                                                {/* Render properties of the configuration */}
                                                {config.properties.map((property, propertyIndex) => (
                                                    <div key={propertyIndex}>
                                                        {/* Render each property */}
                                                        {Object.keys(property).map((key) => (
                                                            <div key={key}>
                                                                {key}: {property[key]}
                                                            </div>
                                                        ))}
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
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
