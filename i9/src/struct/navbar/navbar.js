import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import './navbar.css';
import AppLogo from '../../assets/logo.png';
import { useAuthContext } from '../../utils/context/authentication';

const Navbar = () => {
    const { authState, logout } = useAuthContext();

    const location = useLocation();
    const history = useNavigate();

    const publicPagesNavbar = [
        { path: '/', label: 'Home', id: 'navbar-phrase' },
        { path: '/access', label: 'Access', id: 'navbar-access' },
    ];

    const privatePagesNavbar = [
        { path: '/learner/dashboard', label: 'Dashboard', id: 'navbar-phrase' },
        { path: '/calculator', label: 'Calculator', id: 'navbar-phrase' },
        { path: '/access/login', label: 'Sign Out', id: 'navbar-access', action: logout },
    ];


    const handleMenuClick = (path, action) => {
        if (action) {
            action();
        } else {
            history(path);
        }
    };

    const pagesNavbar = authState.isAuthenticated ? privatePagesNavbar : publicPagesNavbar;

    return (
        <div className={`site-navbar`}>
            <div className='navbar-container'>
                <div className='navbar-inner'>
                    <div className={`app-logo`}>
                        <Link to={'/'}>
                            <img src={AppLogo} alt=''></img>
                        </Link>
                    </div>
                    <nav className={`top-nav`}>
                        <div className='menu-items-containter'>
                            <div className='right-side-menu-items'>
                                <ul className="right-menu">

                                    {pagesNavbar && pagesNavbar.map((item, index) => (
                                        <li
                                            key={index}
                                            className={location.pathname === item.path ? 'active' : ''}
                                            id={item.id}
                                        >
                                            <Link to={item.path} onClick={() => handleMenuClick(item.path, item.action)}>
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
