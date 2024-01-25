import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './tools.css';

const Tools = () => {

    const [toolsList, setToolsList] = useState([
        {
            name: 'Calculator',
            icon: '',
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
                                    <img src={tool.path} alt={`tool-icon`} />
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