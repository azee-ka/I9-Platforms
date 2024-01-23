import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './sidebars.css';
import { useActionData, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../reducers/auth/useAuth';
import LargeSidebar from './largeSidebar/largeSidebar';
import SmallSidebar from './smallSidebar/smallSidebar';
import API_BASE_URL, { CLIENT_BASE_URL } from '../../config';
import ProfilePicture from '../../utils/getProfilePicture';

const Sidebar = ({ handleCreatePostOverlayOpen }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);


    const [showLargeSidebar, setShowLargeSidebar] = useState(false);

    const navigate = useNavigate();
    const { authState } = useAuth();

    const notSearchingCurrrently = () => {
        return (searchResults.length === 0);
    }

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchQuery(inputValue);

        if (inputValue !== "") {
            handleSubmitSearch();
        } else {
            setSearchResults([]);
        }

    };

    const handleSubmitSearch = (e) => {
        // Make an API request to search for users
        axios.get(`${API_BASE_URL}personal/search/?query=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${authState.token}`,
            },
        })
            .then((response) => {
                setSearchResults(response.data);
            })
            .catch((error) => {
                console.error('Error searching for users:', error);
            });
    };


    const privatePagesSmallSidebar = [
        // Learner Links
        { path: '/learner/dashboard', label: 'D', id: 'navbar-phrase', role: 'Learner' },
        { path: '', label: 'C', id: 'navbar-phrase', role: 'Learner', action: handleCreatePostOverlayOpen },



        // Professional Links
        { path: '/professional/dashboard', label: 'D', id: 'navbar-phrase', role: 'Professional' },
        { path: '', label: '+', id: 'navbar-phrase', role: 'Professional', action: handleCreatePostOverlayOpen },
        { path: '/professional/explore', label: 'E', id: 'navbar-phrase', role: 'Professional' },




        // Personal Links
        { path: '/personal/dashboard', label: 'D', id: 'navbar-phrase', role: 'Personal' },
        { path: '', label: 'C', id: 'navbar-phrase', role: 'Personal', action: handleCreatePostOverlayOpen },
        { path: '/personal/explore', label: 'E', id: 'navbar-phrase', role: 'Personal' },


        { path: '/calculator', label: 'C', id: 'navbar-phrase', role: 'any' },
    ];

    const privatePagesLargeSidebar = [
        // Learner Links
        { path: '/learner/dashboard', label: 'Dashboard', id: 'navbar-phrase', role: 'Learner' },
        { path: '', label: 'Create Post', id: 'navbar-phrase', role: 'Learner', action: handleCreatePostOverlayOpen },



        // Professional Links
        { path: '/professional/dashboard', label: 'Dashboard', id: 'navbar-phrase', role: 'Professional' },
        { path: '', label: '+', id: 'navbar-phrase', role: 'Professional', action: handleCreatePostOverlayOpen },
        { path: '/professional/explore', label: 'EExplore', id: 'navbar-phrase', role: 'Professional' },




        // Personal Links
        { path: '/personal/dashboard', label: 'Dashboard', id: 'navbar-phrase', role: 'Personal' },
        { path: '', label: 'Create Post', id: 'navbar-phrase', role: 'Personal', action: handleCreatePostOverlayOpen },
        { path: '/personal/explore', label: 'Explore', id: 'navbar-phrase', role: 'Personal' },


        { path: '/calculator', label: 'Calculator', id: 'navbar-phrase', role: 'any' },

    ];

    const handleSidebarClick = (path, action) => {
        if (action) {
            console.log('fdagfaf')
            action();
        } else {
            navigate(path);
        }
    };

    const handleSidebarToggle = () => {
        setShowLargeSidebar(!showLargeSidebar);
        setSearchQuery('');
        setSearchResults([]);
    };

    return (
        <div className={`sidebar-container ${showLargeSidebar ? 'sidebar-visible' : ''}`}>
            <div className={`sidebar-menu-toggle`}>
                <div className={`sidebar-menu-toggle-inner ${showLargeSidebar ? 'sidebar-visible' : ''}`}>
                    <div className='sidebar-menu-toggle-inner-content'>
                        <button onClick={handleSidebarToggle}>
                            <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                            <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                            <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                        </button>
                    </div>
                </div>
                {showLargeSidebar &&
                    <div className='sidebar-search-container'>
                        <div className='sidebar-search-bar-container'>
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                }
            </div>
            <div className='sidebar-content'>
                <SmallSidebar showLargeSidebar={showLargeSidebar} privatePagesSmallSidebar={privatePagesSmallSidebar} handleSidebarClick={handleSidebarClick} />
                {showLargeSidebar && searchResults.length !== 0 &&
                    <div className={`show-users-search ${showLargeSidebar ? 'expand' : ''}`}>
                        <div className='show-users-search-inner'>
                            {searchResults.map((thisUser) => (
                                <Link to={`${CLIENT_BASE_URL}/personal/profile/${thisUser.username}`} key={thisUser.id} className="custom-link">
                                    <div className="users-search-list-item">
                                        <div className="users-search-list-item-inner">
                                            <div className="users-search-list-item-profile-picture">
                                                <div className="users-search-list-item-profile-picture-inner">
                                                    <ProfilePicture src={thisUser.profile_picture} />
                                                </div>
                                            </div>
                                            <div className="users-search-list-item-username">
                                                <p>{thisUser.username}</p>
                                            </div>
                                        </div>

                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                }
                {searchResults.length === 0 &&
                    <LargeSidebar showLargeSidebar={showLargeSidebar} privatePagesLargeSidebar={privatePagesLargeSidebar} handleSidebarClick={handleSidebarClick} searchResults={searchResults} />
                }
            </div>
        </div>
    );
};

export default Sidebar;
