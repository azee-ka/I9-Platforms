import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../../config';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../reducers/auth/useAuth';
import { CLIENT_BASE_URL } from '../../../config';
import ProfilePicture from '../../../utils/getProfilePicture';
import './searchSidebar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const SearchSidebar = ({ showSeachSidebar }) => {
    const { authState } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },
        {
            username: 'usrg',
            profile_picture: null
        },

    ]);

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


    return (
        <div className={`search-sidebar-container ${showSeachSidebar ? 'show' : ''}`}>
            <div className='search-sidebar-title'>
                <div className='search-sidebar-title-inner'>
                <h3>Search</h3>
                </div>
            </div>
            <div className={`sidebar-search-container`}>
            <div className='sidebar-search-bar-container'>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleInputChange}
                    />
                    {searchQuery && (
                        <FontAwesomeIcon
                            icon={faClose}
                            className="clear-search-icon"
                            onClick={() => setSearchQuery('')}
                        />
                    )}
                </div>
            </div>
            </div>

            <div className={`sidebar-search-show-users-search`}>
                <div className='sidebar-search-show-users-search-inner'>
                    {searchResults.map((thisUser, index) => (
                        <Link to={`${CLIENT_BASE_URL}/personal/profile/${thisUser.username}`} key={`${thisUser.username}-${index}`} className="custom-link">
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
        </div>
    );
};

export default SearchSidebar;