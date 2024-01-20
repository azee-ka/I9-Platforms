// Layout.js
import React, { useState, useEffect } from 'react';
import './layout.css';
import Navbar from '../navbar/navbar';
import Sidebar from '../sidebar/sidebars';
import ExpandPost from '../../components/personal/postUI/expandPost/expandPost';

function Layout({ children, pageName, showSidebar, expandPostIdReciever, handleExpandPostClose }) {

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
            {expandPostIdReciever !== undefined && expandPostIdReciever !== null &&
                <ExpandPost overlayPostId={expandPostIdReciever} handleExpandPostClose={handleExpandPostClose} />
            }
        </div>
    );
}

export default Layout;
