// personalProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './overlayContent.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft, faTimes } from '@fortawesome/free-solid-svg-icons';

const OverlayContent = ({ activeEditOverlay, onClose, setModuleDataToSend, activeEditTabTitle, activeEditTabName, setTitleField, setDescriptionField, setStartDate, setEndDate, handleOverlaySubmit, titleField, descriptionField }) => {

    const [moduleOngoing, setModuleOngoing] = useState(false);

    const handleChildClick = (event) => {
        event.stopPropagation();
    };

    const handleLabelClick = (elementId) => {
        // Find the textarea element by its ID
        const textarea = document.getElementById(elementId);

        console.log(textarea);
        // Manually focus the textarea
        if (textarea) {
            textarea.focus();
        }
    };

    return (
        <div className="overlay-content" onClick={handleChildClick}>
            <div className='overlay-active-tab-title-container'>
                <h3>{activeEditTabTitle}</h3>
            </div>
            <div className="overlay-content-inner">
                <div className='overlay-add-modules-container'>
                    <div className='module-overlay-info-input-container'>
                        <div className='module-overlay-info-input-container-inner'>
                            <div className='module-overlay-title'>
                                <div className='module-overlay-title-inner'>
                                    <textarea
                                        id='moduleTitle'
                                        placeholder={`${activeEditTabName} Title`}
                                        value={titleField}
                                        onChange={(e) => setTitleField(e.target.value)}
                                    />
                                    <label htmlFor='moduleTextarea' onClick={() => handleLabelClick('moduleTitle')}>{activeEditTabName} Title</label>
                                </div>
                            </div>
                            <div className='module-overlay-duration'>
                                <div className='module-overlay-duration-inner'>
                                    <div className='module-overlay-duration-inner-inner'>
                                        <label htmlFor='startDate'>From:</label>
                                        <input
                                            type='date'
                                            id='startDate'
                                            name='startDate'
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />

                                        <label htmlFor='endDate'>To:</label>
                                        <input
                                            type='date'
                                            id='endDate'
                                            name='endDate'
                                            onChange={(e) => setEndDate(e.target.value)}
                                            disabled={moduleOngoing}
                                            style={{ color: moduleOngoing ? 'black' : 'white' }}
                                        />
                                    </div>
                                    <div className='module-overlay-checkbox'>
                                        <div>Ongoing?</div>
                                        <label className='checkbox-container'>
                                            <input type='checkbox' onClick={() => setModuleOngoing(!moduleOngoing)} />
                                            <span className='checkmark'></span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='module-overlay-description'>
                        <div className='module-overlay-description-inner'>
                            <textarea
                                id='moduleDescription'
                                placeholder={`${activeEditTabName} Description`}
                                value={descriptionField}
                                onChange={(e) => setDescriptionField(e.target.value)}
                            />
                            <label htmlFor='moduleTextarea' onClick={() => handleLabelClick('moduleDescription')}>{activeEditTabName} Description</label>
                        </div>
                    </div>
                    <div className='overlay-module-submit-button-container'>
                        <div className='overlay-module-submit-button-container-inner'>
                            <button onClick={handleOverlaySubmit}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
            <FontAwesomeIcon icon={faTimes} className="close-icon" onClick={onClose} />
        </div>
    );
};

export default OverlayContent;