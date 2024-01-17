import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes, useNavigate } from 'react-router-dom';  // Import Routes from react-router-dom
import Layout from '../struct/layout/layout';
import '../App.css';

const RoleBasedRouter = ({ routes, isAuthenticated }) => {
    const userRole = useSelector((state) => {
        return state.auth.user.role;
    });

    const navigate = useNavigate();


  const [showPostOverlay, setShowPostOverlay] = useState(false);
  const [currentPostId, setCurrentPostId] = useState(null);

  const [currentIndex, setCurrentIndex] = useState(null);
  const [posts, setPosts] = useState(null);

  const [redirected, setRedirected] = useState(false);

  const handleShowPostOverlay = (postIndex, posts, currentIndex) => {
    console.log('show post ovelrclcikced')
    setShowPostOverlay(true);
    setCurrentPostId(postIndex.id);

    setCurrentIndex(currentIndex);
    setPosts(posts);
  }
  const handleExpandPostOverlayClose = (originalUrl) => {
    setShowPostOverlay(false);
    window.history.replaceState(null, originalUrl);
  };


    useEffect(() => {
        // Redirect to login if not authenticated
        if (!isAuthenticated) {
            navigate('/access/login');
        }
    }, [isAuthenticated, navigate]);

    const renderRoutes = () => {
        return routes.map((route) => {
            if (route.role === userRole || route.role === 'any') {
                const Component = route.component;
                return (
                    <Routes key={route.path}>
                        <Route
                            path={route.path}
                            element={
                                <Layout
                                    key={route.key}
                                    className={`${route.path.substring(1)}`}
                                    pageName={route.pageName}
                                    showSidebar={route.showSidebar}
                                    currentPostId={currentPostId} 
                                    posts={posts} 
                                    currentIndex={currentIndex} 
                                    handleExpandPostOverlayClose={handleExpandPostOverlayClose} 
                                    showPostOverlay={showPostOverlay} 
                                    handleShowPostOverlay={handleShowPostOverlay}
                                    
                                >
                                    <Component currentPostId={currentPostId} posts={posts} currentIndex={currentIndex} handleExpandPostOverlayClose={handleExpandPostOverlayClose} showPostOverlay={showPostOverlay} handleShowPostOverlay={handleShowPostOverlay} />
                                </Layout>
                            }
                        />
                    </Routes>
                );
            }
            return null;
        });
    };

    return (
        <div className='sub-app'>
            {isAuthenticated && renderRoutes()}
        </div>
    );
};

export default RoleBasedRouter;
