import React, { useState, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './smallSidebar.css';
import { useActionData, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../reducers/auth/useAuth';

const SmallSidebar = ({showLargeSidebar, privatePagesSmallSidebar, handleSidebarClick}) => {
    const { authState } = useAuth();

    return (
        <div className={`sidebar-small-container ${showLargeSidebar ? 'shrink' : ''}`}>
            <div className='sidebar-small-container-content'>
                <ul>
                    {privatePagesSmallSidebar.map((item, index) => (
                        (item.role === authState.user.role || item.role === 'any') ? (
                            <button to={item.path} key={`${item.label}-${index}`} onClick={() => handleSidebarClick(item.path, item.action)}>
                                <li>
                                    <div className='sidebar-small-per-item'>
                                        {item.label}
                                    </div>
                                </li>
                            </button>
                        ) : (
                            null
                        )
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SmallSidebar;