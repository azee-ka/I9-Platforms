// personalProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './overlayContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

const OverlayContent = ({ activeEditOverlay, onClose, setModuleDataToSend }) => {


    return (
        <div className="overlay-content">
            <div className="overlay-content-inner">
                {activeEditOverlay === 'projects' &&
                    <div className='overlay-add-projects-container'>

                    </div>
                }
                {activeEditOverlay === 'education' &&
                    <div className='overlay-add-education-container'>

                    </div>
                }
                {activeEditOverlay === 'industry_experience' &&
                    <div className='overlay-add-industry_experience-container'>

                    </div>
                }
            </div>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
        </div>
    );
};

export default OverlayContent;