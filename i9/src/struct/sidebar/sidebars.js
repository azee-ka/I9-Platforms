import React, { useState, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './sidebars.css';
import { useActionData, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuth } from '../../reducers/auth/useAuth';

const Sidebar = ({ handleCreatePostOverlayOpen }) => {
    const [showLargeSidebar, setShowLargeSidebar] = useState(false);
    const largeContainerRef = useRef(null);

    const navigate = useNavigate();
    const { authState } = useAuth();

    const handleTransitionEnd = () => {
        if (showLargeSidebar) {
            largeContainerRef.current.classList.add('visible');
        }
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


    return (
        <div className={`sidebar-container ${showLargeSidebar ? 'sidebar-visible' : ''}`}>
            <div className={`sidebar-menu-toggle`}>
                <div className={`sidebar-menu-toggle-inner ${showLargeSidebar ? 'sidebar-visible' : ''}`}>
                    <div className='sidebar-menu-toggle-inner-content'>
                        <button onClick={() => setShowLargeSidebar(!showLargeSidebar)}>
                            <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                            <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                            <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                        </button>
                    </div>
                </div>
            </div>
            <div className='sidebar-content'>
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

                <div
                    ref={largeContainerRef}
                    className={`sidebar-large-container ${showLargeSidebar ? 'expand' : ''}`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {showLargeSidebar &&
                        <div className='sidebar-large-container-content'>
                            <ul>
                                {privatePagesLargeSidebar.map((item, index) => (
                                    (item.role === authState.user.role || item.role === 'any') ? (
                                        <button to={item.path} key={`${item.label}-${index}`} onClick={() => handleSidebarClick(item.path, item.action)}>
                                            <li>
                                                <div className='sidebar-large-per-item'>
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
                    }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
