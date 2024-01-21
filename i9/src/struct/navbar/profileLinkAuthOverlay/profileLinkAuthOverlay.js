import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './profileLinkAuthOverlay.css';
import full_logo from '../../../assets/full-logo.png';

const ProfileAddAuthOverlay = ({ setShowAddProfileOverlay }) => {
    const [usernameFieldData, setUsernameFieldData] = useState();
    const [passwordFieldData, setPasswordFieldData] = useState();


    const [firstNameFieldData, setFirstNameFieldData] = useState();
    const [lastNameFieldData, setlastNameFieldData] = useState();
    const [emailFieldData, setEmailFieldData] = useState();


    const [showRegisterContainer, setRegisterContainer] = useState(false);

    return (
        <div className="profile-add-auth-container" onClick={() => setShowAddProfileOverlay(false)}>
            <div className='profile-add-auth-container-card' onClick={(e) => e.stopPropagation()}>
                {!showRegisterContainer ? (
                    <div className='profile-add-auth-container-card-inner-login'>
                        <div className='profile-add-auth-container-card-site-logo'>
                            <img src={`${full_logo}`} />
                        </div>
                        <h2>Sign In</h2>
                        <div className='profile-add-auth-fields-container'>
                            <div className='profile-add-auth-username-field-container'>
                                <input
                                    value={usernameFieldData}
                                    placeholder='Enter Username or Email'
                                    onChange={(e) => setUsernameFieldData(e.target.value)}
                                />
                            </div>
                            <div className='profile-add-auth-password-field-container'>
                                <input
                                    value={passwordFieldData}
                                    placeholder='Enter Password'
                                    onChange={(e) => setPasswordFieldData(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='profile-add-auth-redirect-user-to-register'>
                            <p onClick={() => setRegisterContainer(true)}>Need to sign up for the acccount? Register here</p>
                        </div>
                        <div className='profile-add-auth-submit-button'>
                            <button>Add Profile</button>
                        </div>
                    </div>
                ) : (
                    <div className='profile-add-auth-container-card-inner-login'>
                        <div className='profile-add-auth-container-card-site-logo'>
                            <img src={`${full_logo}`} />
                        </div>
                        <h2>Sign Up</h2>
                        <div className='profile-add-auth-fields-container'>
                            <div className='profile-add-auth-username-field-container'>
                                <input
                                    value={usernameFieldData}
                                    placeholder='Enter Username or Email'
                                    onChange={(e) => setUsernameFieldData(e.target.value)}
                                />
                            </div>
                            <div className='profile-add-auth-password-field-container'>
                                <input
                                    value={passwordFieldData}
                                    placeholder='Enter Password'
                                    onChange={(e) => setPasswordFieldData(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className='profile-add-auth-redirect-user-to-register'>
                            <p onClick={() => setRegisterContainer(false)}>Already have an acccount? Login here</p>
                        </div>
                        <div className='profile-add-auth-submit-button'>
                            <button>Add Profile</button>
                        </div>
                    </div>
                )
            }
            </div>
        </div>
    );
}

export default ProfileAddAuthOverlay;