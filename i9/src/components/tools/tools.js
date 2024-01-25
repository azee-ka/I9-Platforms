import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './tools.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartBar, faEdit, faPlus, faCompass, faCalculator } from '@fortawesome/free-solid-svg-icons';
library.add(faChartBar, faEdit, faPlus, faCompass, faCalculator);

const Tools = () => {

    const [toolsList, setToolsList] = useState([
        {
            name: 'Calculator',
            icon: <FontAwesomeIcon icon="calculator" />,
            path: '/calculator',
        },
        {
            name: 'Workspace',
            icon: '',
            path: '/workspace',
        },
    ]);

    return (
        <div className='tools-container'>
            <div className='tools-container-inner'>
                <div className='tools-header'>
                    <h2>Tools</h2>
                </div>
                <div className='tools-container-grid-view'>
                    {toolsList.map((tool, index) => (
                        <Link to={tool.path} key={`${index}-${tool.title}`} className='custom-link'>
                            <div className='tool-widget-container'>
                                <div className='tool-widget-icon'>
                                    {tool.icon}
                                    {/* <img src={tool.icon} alt={`tool-icon`} /> */}
                                </div>
                                <div className='tool-widget-name'>
                                    {tool.name}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Tools;