// LoginForm.js
import React, { useState, useEffect } from 'react';
import './alert.css';
import crossIcon from '../assets/cross-icon.png';
import { FaTimes } from 'react-icons/fa';

const AlertModule = ({ message, showAlert, setShowAlert }) => {

    return (
        <div className="alert-module">
            <div className="alert-module-inner">
            {showAlert &&
                <div className='alert-message-container'>
                    <div className='alert-message-container-inner'>
                        {message}
                    </div>
                    <div className='alert-message-dismiss'>
                        <FaTimes onClick={() => setShowAlert(false)}/>
                    </div>
                </div>
            }
            </div>
        </div>
    );
}

export default AlertModule;