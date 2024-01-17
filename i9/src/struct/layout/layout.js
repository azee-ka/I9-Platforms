// Layout.js
import React, { useState, useEffect } from 'react';
import './layout.css';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebars';
import CreatePost from '../../components/personal/createPost/createPost';
import PostFrame from '../../components/personal/personalProfile/postFrame/postFrame';

function Layout({ children, pageName, showSidebar, currentPostId, posts, currentIndex, handleExpandPostOverlayClose, showPostOverlay }) {
    const [showCreatePostOverlay, setShowCreatePostOverlay] = useState(false);
    const [originalUrl, setOriginalUrl] = useState(null);

    useEffect(() => {
        setOriginalUrl(window.location.href);
    }, []);

    return (
        <div className={`parent-layout`}>
            <div className='layout'>
                <div className='layout-navbar'>
                    <Navbar />
                </div>
                <div className='layout-page'>
                    {showSidebar &&
                        <div className='layout-sidebar'>
                            <Sidebar />
                        </div>
                    }
                    <div className='layout-page-content'>
                        {children}
                    </div>
                </div>
            </div>
            {showCreatePostOverlay &&
                <CreatePost originalUrl={originalUrl} setShowCreatePostOverlay={setShowCreatePostOverlay} />
            }
            {showPostOverlay &&
                <PostFrame postIdForOverlay={currentPostId} posts={posts} currentIndex={currentIndex} onClose={handleExpandPostOverlayClose} originalUrl={originalUrl} />
            }
        </div>
    );
}

export default Layout;
