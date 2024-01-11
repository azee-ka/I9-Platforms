// Layout.js
import React, { useState } from 'react';
import './layout.css';
import Navbar from '../navbar/navbar';

function Layout({ children, pageName }) {


    return (
        <div className={`parent-layout`}>
            <div className='layout'>
                <div className='layout-navbar'>
                    <Navbar />
                </div>
                <div className='layout-page'>
                    <div className='layout-page-content'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Layout;
