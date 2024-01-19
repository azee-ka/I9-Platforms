import React, { useState, useEffect } from 'react';
import './expandPostOverlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import API_BASE_URL from '../../../../../config';

const ExpandedPostOverlay = ({ postData }) => {

    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    useEffect(() => {
    }, []);


    const handleMediaPreviousClick = () => {
        if (currentMediaIndex !== 0) {
            setCurrentMediaIndex(currentMediaIndex - 1);
        }
    };
    const handleMediaNextClick = () => {
        if (currentMediaIndex !== postData.media_files.length - 1) {
            setCurrentMediaIndex(currentMediaIndex + 1);
        }
    };

    console.log(postData);

    return postData ? (
        <div className="expanded-post-overlay-container">
            <div className='expanded-post-overlay-user-info-comments-container'>
                <div className='expanded-post-overlay-user-info'>

                </div>
                <div className='expanded-post-overlay-comments'>

                </div>
            </div>

            <div className='expanded-post-overlay-post-info-img-container'>
                <div className='expanded-post-overlay-post-info-container'>

                </div>
                <div className='expanded-post-overlay-img-container'>
                    {postData &&
                        <div className='expanded-post-overlay-post-img'>
                            <img src={`${API_BASE_URL}${postData.media_files[currentMediaIndex].file}`} />
                        </div>
                    }
                    {postData.media_files.length > 1 &&
                        <div className='expanded-post-overlay-img-previous-next-buttons-container'>
                            <div className='expanded-post-overlay-img-previous-next-buttons-container-inner'>
                                <div className='expanded-post-overlay-img-previous-button-container'>
                                    {currentMediaIndex > 0 &&
                                        <div className='expanded-post-overlay-img-previous-button-container-inner' onClick={handleMediaPreviousClick}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </div>
                                    }
                                </div>
                                <div className='expanded-post-overlay-img-next-button-container'>
                                    {currentMediaIndex !== postData.media_files.length - 1 &&
                                        <div className='expanded-post-overlay-img-next-button-container-inner' onClick={handleMediaNextClick}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    }
                </div>
            </div>
            <div className='expanded-post-overlay-interaction-container'>

            </div>
        </div>
    ) : (
        <div>
            Loading...
        </div>
    );
}

export default ExpandedPostOverlay;