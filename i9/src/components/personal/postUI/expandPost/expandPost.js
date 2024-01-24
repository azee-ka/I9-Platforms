import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../../reducers/auth/useAuth";
import API_BASE_URL from "../../../../config";
import './expandPost.css';
import ExpandedPostOverlay from './expandPostOverlay/expandPostOverlay';
import ExpandedPostNonOverlay from './expandPostNonOverlay/expandPostNonOverlay';

const ExpandPost = ({ overlayPostId, handleExpandPostClose, handlePreviousPostClick, handleNextPostClick }) => {
    const { authState } = useAuth();

    const [expandPostData, setExpandPostData] = useState();

    const { postId } = useParams();

    const [expandPostIdFinal, setExpandPostIdFinal] = useState(overlayPostId ? overlayPostId : postId);


    const fetchPostData = async (postId) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };
            const response = await axios.get(`${API_BASE_URL}posts/${postId}/`, config);
            setExpandPostData(response.data);
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
    };
    

    useEffect(() => {
        if (overlayPostId !== undefined) {
            fetchPostData(overlayPostId);
        }
        setExpandPostIdFinal(overlayPostId ? overlayPostId : postId);
    }, [overlayPostId, postId]);
    
    
    


    return (
        <div className={`expanded-post-container ${!overlayPostId ? 'non-overlay' : 'overlay'}`} onClick={handleExpandPostClose}>
            {overlayPostId !== undefined &&
                <div className='expanded-post-overlay' onClick={(e) => e.stopPropagation()}>
                    <ExpandedPostOverlay postId={expandPostIdFinal} handlePreviousPostClick={handlePreviousPostClick} handleNextPostClick={handleNextPostClick} />
                </div>
            }
            {overlayPostId === undefined &&
                <ExpandedPostNonOverlay postId={expandPostIdFinal}/>
            }
        </div>
    );
}

export default ExpandPost;