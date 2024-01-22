// Layout.js
import React, { useState, useEffect } from 'react';
import './layout.css';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebars';
import ExpandPost from '../../components/personal/postUI/expandPost/expandPost';
import CreatePost from '../../components/personal/createPost/createPost';
import { useNavigate } from 'react-router';

function Layout({ children, pageName, showSidebar, expandPostIdReciever, handleExpandPostClose }) {
    const navigate = useNavigate();

    const [showCreatePostOverlay, setShowCreatePostOverlay] = useState(false);
    const [originalUrlBeforeCreatePostOverlay, setOriginalUrlBeforeCreatePostOverlay] = useState(null);

    const handleCreatePostOverlayOpen = () => {
        if (window.location.pathname !== '/personal/create-post') {
            setOriginalUrlBeforeCreatePostOverlay(window.location.pathname);
            setShowCreatePostOverlay(true);
            window.history.replaceState(null, null, `/personal/create-post`);
        }
    };

    const handleCreatePostOverlayClose = () => {
        setShowCreatePostOverlay(false);
        navigate(originalUrlBeforeCreatePostOverlay);
    }

    return (
        <div className={`parent-layout`}>
            <div className='layout'>
                <div className='layout-navbar'>
                    <Navbar />
                </div>
                <div className='layout-page'>
                    {showSidebar &&
                        <div className='layout-sidebar'>
                            <Sidebar handleCreatePostOverlayOpen={handleCreatePostOverlayOpen} />
                        </div>
                    }
                    <div className='layout-page-content'>
                        {children}
                    </div>
                </div>
            </div>
            {expandPostIdReciever !== undefined && expandPostIdReciever !== null &&
                <ExpandPost overlayPostId={expandPostIdReciever} handleExpandPostClose={handleExpandPostClose} />
            }
            {showCreatePostOverlay &&
                <CreatePost originalUrl={originalUrlBeforeCreatePostOverlay} handleCreatePostOverlayClose={handleCreatePostOverlayClose} />
            }
        </div>
    );
}

export default Layout;
