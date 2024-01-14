import React, { useState, useRef } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './sidebars.css';

const Sidebar = () => {
    const [showLargeSidebar, setShowLargeSidebar] = useState(false);
    const largeContainerRef = useRef(null);

    const handleTransitionEnd = () => {
        if (showLargeSidebar) {
            largeContainerRef.current.classList.add('visible');
        }
    };


    const privatePagesSmallSidebar = [
        { path: '/learner/dashboard', label: 'D', id: 'navbar-phrase', role: 'learner' },
        { path: '/calculator', label: 'C', id: 'navbar-phrase', role: 'learner' },
    ];
    const privatePagesLargeSidebar = [
        { path: '/learner/dashboard', label: 'Dashboard', id: 'navbar-phrase', role: 'learner' },
        { path: '/calculator', label: 'Calculator', id: 'navbar-phrase', role: 'learner' },
    ];


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
                            {privatePagesSmallSidebar.map((item) => (
                                <a key={`${item.label}-${item.role}`} href={item.path}>
                                    <li>
                                        <div className='sidebar-small-per-item'>
                                            {item.label}
                                        </div>
                                    </li>
                                </a>
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
                                {privatePagesLargeSidebar.map((item) => (
                                    <a key={`${item.label}-${item.role}`} href={item.path}>
                                        <li>
                                            <div className='sidebar-large-per-item'>
                                                {item.label}
                                            </div>
                                        </li>
                                    </a>
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
