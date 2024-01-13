import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './sidebars.css';

const Sidebar = () => {
    const [showLargeSidebar, setShowLargeSidebar] = useState(false);
    const largeContainerRef = useRef(null);

    const handleTransitionEnd = () => {
        if (showLargeSidebar) {
            largeContainerRef.current.classList.add('visible');
        }
    };

    return (
        <div className={`sidebar-container ${showLargeSidebar ? 'sidebar-visible' : ''}`}>
            <div className={`sidebar-menu-toggle`}>
                <div className={`sidebar-menu-toggle-inner ${showLargeSidebar ? 'sidebar-visible' : ''}`}>
                    <button onClick={() => setShowLargeSidebar(!showLargeSidebar)}>
                        <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                        <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                        <span className={`icon-bar ${showLargeSidebar ? 'rotate' : ''}`}></span>
                    </button>
                </div>
            </div>
            <div className='sidebar-content'>
                <div className={`sidebar-small-container ${showLargeSidebar ? 'shrink' : ''}`}>
                    <div className='sidebar-small-container-content'>
                        Small Container
                    </div>
                </div>
                <div
                    ref={largeContainerRef}
                    className={`sidebar-large-container ${showLargeSidebar ? 'expand' : ''}`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {showLargeSidebar &&
                        <div className='sidebar-large-container-content'>
                            Large Container
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
