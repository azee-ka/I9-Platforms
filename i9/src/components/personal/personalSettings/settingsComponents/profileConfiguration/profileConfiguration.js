import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profileConfiguration.css';
import API_BASE_URL from '../../../../../config';
import { useAuth } from '../../../../../reducers/auth/useAuth';

const ProfileConfiguration = () => {
    const { authState } = useAuth();
    const [profileData, setProfileData] = useState([]);

    const fetchProfileSpecs = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`,
                },
            };
            const response = await axios.get(`${API_BASE_URL}profile/get-user-info/`, config);
            setProfileData(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileSpecs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const saveNewProfileSpecs = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`,
                },
            };
            const response = await axios.patch(`${API_BASE_URL}update-user-profile/`, profileData, config);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return (
        <div className='settings-profile-config-tab'>
            <div className='settings-profile-config-tab-inner'>
                <div className='settings-profile-profile-config-container'>
                    <h3>Profile Configuration</h3>
                    <div className='settings-profile-profile-config-content'>
                        <div className='settings-profile-spec-fields'>
                            <div className='settings-profile-edit-fields'>
                                <div className='settings-profile-edit-fields-inner'>
                                    <div className='settings-profile-name-fields'>
                                        <input
                                            name='first_name'
                                            value={profileData.first_name || ''}
                                            placeholder='First Name'
                                            onChange={handleInputChange}
                                        />
                                        <input
                                            name='last_name'
                                            value={profileData.last_name || ''}
                                            placeholder='Last Name'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className='settings-profile-display-name-field'>
                                        <input
                                            name='display_name'
                                            value={profileData.display_name || ''}
                                            placeholder='Display Name'
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='settings-profile-update-save-button'>
                            <button onClick={saveNewProfileSpecs}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileConfiguration;
