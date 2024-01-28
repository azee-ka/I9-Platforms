import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './linkedProfiles.css';
import API_BASE_URL from '../../../../../config';
import { useAuth } from '../../../../../reducers/auth/useAuth';
import ProfilePicture from '../../../../../utils/getProfilePicture';
import AlertModule from '../../../../../alert/alert';

const LinkedProfiles = () => {
    const { authState, switchProfile } = useAuth();
    const [userProfilesList, setUserProfilesList] = useState([]);

    const [profileUnlinkedAlert, setProfileUnlinkedAlert] = useState('');

    const fetchLinkedProfiles = async () => {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authState.token}`
            }
        };
        try {
            const response = await axios.get(`${API_BASE_URL}get-linked-profiles/`, config);
            // console.log(response.data);
            setUserProfilesList(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchLinkedProfiles();
    }, []);


const switchProfileFromSettings = async (linkedProfileUsername) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${authState.token}`,
        },
    };

    const data = {
        linked_profile_username: linkedProfileUsername,
    };

    try {
        const response = await axios.post(`${API_BASE_URL}switch-profile/`, data, config);
        // Assuming the server returns the updated user information after switching profiles
        // Update the user context or session on the client side
        switchProfile(response.data);
    } catch (error) {
        console.error('Error switching profile:', error);
    }
};

    const unlinkProfileFromSettings = async (linkedProfileUsername) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${authState.token}`,
            },
        };

        const data = {
        };

        try {
            const response = await axios.post(`${API_BASE_URL}unlink-profile/${linkedProfileUsername}/`, data, config);
            // Assuming the server returns the updated user information after switching profiles
            // Update the user context or session on the client side
            console.log(response.data)
            setProfileUnlinkedAlert(response.data.message);
            window.location.reload();
        } catch (error) {
            console.error('Error switching profile:', error);
        }
    };

    console.log(userProfilesList);

    return (
        <div className='linked-profiles'>
            <div className='linked-profiles-list'>
                <div className='linked-profiles-container-title'>
                    <h3>Linked Profiles</h3>
                </div>
                {userProfilesList.length > 0 ? (
                    userProfilesList.map((profile, index) => (
                        <div className='linked-per-profile' key={`${index}-${profile.username}`}>
                            <div className='linked-per-profile-inner'>
                                <div className='linked-profile-profile-picture'>
                                    <ProfilePicture src={profile.profile_picture} />
                                </div>
                                <div className='linked-profile-username'>
                                    <p>{profile.username}</p>
                                    <p>{profile.email}</p>
                                </div>
                                <div className='linked-profile-buttons'>
                                    <button onClick={() => unlinkProfileFromSettings(profile.username)}>Unlink Profile</button>
                                    <button onClick={() => switchProfileFromSettings(profile.username)}>Switch to Profile</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        No Linked Profiles
                    </div>
                )}
            </div>
            {profileUnlinkedAlert !== '' && 
                <AlertModule message={profileUnlinkedAlert} setShowAlert={setProfileUnlinkedAlert} />
            }
        </div>
    );
};

export default LinkedProfiles;