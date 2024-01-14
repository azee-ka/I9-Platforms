import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import AppLogo from '../../assets/logo.png';
import { useAuth } from '../../reducers/auth/useAuth';
import ProfileMenu from './profileMenu';
import API_BASE_URL from '../../config';
import default_profile_picture from '../../assets/default_profile_picture.png'

const Navbar = () => {
    const { authState, logout } = useAuth();
    const userRole = useSelector((state) => state.auth.user.role);


    const [profileMenuVisible, setProfileMenuVisible] = useState(false);

    const location = useLocation();
    const history = useNavigate();
    const profileMenuRef = useRef(null);

    const [profileData, setProfileData] = useState({});

    const handleProfileMenuToggle = () => {
        setProfileMenuVisible(!profileMenuVisible);
    };



    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuVisible(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    const fetchProfileData = async () => {
        const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${authState.token}`
            }
          };
        try {
            const response = await axios.get(`${API_BASE_URL}profile/get-user-info/`, config);
            setProfileData(response.data);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };


    useEffect(() => {
        if (authState.isAuthenticated) {
            fetchProfileData();
        }
    }, [authState.isAuthenticated]);

    const publicPagesNavbar = [
        { path: '/', label: 'Home', id: 'navbar-phrase', role: 'public' },
        { path: '/access', label: 'Access', id: 'navbar-access', role: 'public'  },
    ];

    const privatePagesNavbar = [
        { path: '/learner/dashboard', label: 'Dashboard', id: 'navbar-phrase', role: 'learner' },
        { path: '/calculator', label: 'Calculator', id: 'navbar-phrase', role: 'learner' },
    ];

    const handleMenuClick = (path, action) => {
        if (action) {
            action();
        } else {
            history(path);
        }
    };

    const pagesNavbar = authState.isAuthenticated ? privatePagesNavbar : publicPagesNavbar;

    return (
        <div className={`site-navbar`}>
            <div className='navbar-container'>
                <div className='navbar-inner'>
                    <div className={`app-logo`}>
                        <Link to={'/'}>
                            <img src={AppLogo} alt=''></img>
                        </Link>
                    </div>
                    <nav className={`top-nav`}>
                        <div className='menu-items-containter'>
                            <div className='right-side-menu-items'>
                                <ul className="right-menu">
                                    {pagesNavbar && pagesNavbar.map((item, index) => (
                                        (userRole === item.role || 'public') && (<li
                                            key={index}
                                            className={location.pathname === item.path ? 'active' : ''}
                                            id={item.id}
                                        >
                                            <Link to={item.path} onClick={() => handleMenuClick(item.path, item.action)}>
                                                {item.label}
                                            </Link>
                                        </li>)
                                    ))}
                                    {/* Profile Menu */}
                                    {authState.isAuthenticated && (
                                        <li
                                            className={`profile-menu ${profileMenuVisible ? 'active' : ''}`}
                                            ref={profileMenuRef}
                                        >
                                            <button onClick={handleProfileMenuToggle}>
                                                {profileData.profilePicture ?
                                                    (<img
                                                        alt={`profile-icon`}
                                                        src={`${API_BASE_URL}${profileData.profilePicture}`}
                                                        className='profile-icon'
                                                    />) : (
                                                        <img
                                                            alt={`profile-icon`}
                                                            src={default_profile_picture}
                                                            className='profile-icon'
                                                        />
                                                    )
                                                }
                                            </button>
                                            {profileMenuVisible && <ProfileMenu user={authState.user} logout={logout} profileData={profileData} />}
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
