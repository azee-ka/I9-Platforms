// LearnerProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import './learnerSettings.css';
import API_BASE_URL from '../../../config';
import default_profile_picture from '../../../assets/default_profile_picture.png';
import { formatDateTime } from '../../../utils/formatDateTime';

const LearnerSettings = () => {

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
        <div className='learner-settings-container'>
            <div className='learner-settings-container-inner'>
                <div className='learner-settings-header'>
                    <h2>Preferences</h2>
                </div>
                <div className='learner-settings-content'>
                    <div className='learner-settings-content-inner'>
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
                            return null; // Render nothing if the setting is not active
                        })}
                    </div>
                    <div className='learner-settings-right-sidebar'>
                        <h3>Options</h3>
                        <div className='learner-settings-right-sidebar-inner'>
                            {settingsOptions.map((element, index) => (
                                <div className='learner-settings-right-sidebar-per-element' key={`${index}-${element.title}`} onClick={() => handleTabClick(element.title)}>
                                    <div className='learner-settings-right-sidebar-per-element-inner'>
                                        <div className='learner-settings-right-sidebar-per-element-inner-inner'>
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

export default LearnerSettings;
