import React, { useState, useRef } from 'react';
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
        <div className='sidebar-container'>
            <div className='sidebar-menu-toggle'>
                <button onClick={() => setShowLargeSidebar(!showLargeSidebar)}>
                    Toggle
                </button>
            </div>
            <div className='sidebar-content'>
                <div className={`sidebar-small-container ${showLargeSidebar ? 'shrink' : ''}`}>
                    <div>Small Container</div>
                </div>
                <div
                    ref={largeContainerRef}
                    className={`sidebar-large-container ${showLargeSidebar ? 'expand' : ''}`}
                    onTransitionEnd={handleTransitionEnd}
                >
                    {showLargeSidebar && <div>Large Container</div>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
