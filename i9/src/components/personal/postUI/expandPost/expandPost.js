import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../../reducers/auth/useAuth";
import API_BASE_URL from "../../../../config";
import './expandPost.css';
import ExpandedPostOverlay from './expandPostOverlay/expandPostOverlay';
import ExpandedPostNonOverlay from './expandPostNonOverlay/expandPostNonOverlay';

const ExpandPost = ({ overlayPostId, overlayNextPostId, overlayPreviousPostId, handleExpandPostClose }) => {
    const { authState } = useAuth();

    const [expandPostData, setExpandPostData] = useState();

    const { postId } = useParams();
    const [expandPostIdForNonOverlay, setExpandPostIdForNonOverlay] = useState(null);


    const [previousPostId, setPreviousPostId] = useState();
    const [nextPostId, setNextPostId] = useState();

    useEffect(() => {
        setPreviousPostId(overlayPreviousPostId ? overlayPreviousPostId : null);
        setNextPostId(overlayNextPostId ? overlayNextPostId : null);
    }, []);




    const perviousPostClick = () => {
        console.log("left", previousPostId);
        if (previousPostId) {
            window.history.replaceState(null, null, `/post/${previousPostId}`);
        }
    };
    const nextPostClick = () => {
        console.log("right", nextPostId);
        if (nextPostId) {
            window.history.replaceState(null, null, `/post/${nextPostId}`);
        }
    };



    const fetchPostData = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };
            const response = await axios.get(`${API_BASE_URL}posts/${overlayPostId ? overlayPostId : postId}/`, config);
            console.log(response.data)
            setExpandPostData(response.data);

        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };


    useEffect(() => {
        fetchPostData();
        setExpandPostIdForNonOverlay(postId);
    }, []);


    return (
        <div className={`expanded-post-container ${expandPostIdForNonOverlay ? 'non-overlay' : 'overlay'}`} onClick={handleExpandPostClose}>
            {expandPostIdForNonOverlay === undefined &&
                <div className='expanded-post-overlay' onClick={(e) => e.stopPropagation()}>
                    <ExpandedPostOverlay postData={expandPostData} nextPostID={overlayNextPostId} prePostID={overlayPreviousPostId} perviousPostClick={perviousPostClick} nextPostClick={nextPostClick} />
                </div>
            }
            {expandPostIdForNonOverlay !== undefined &&
                <ExpandedPostNonOverlay postData={expandPostData}/>
            }
        </div>
    );
}

export default ExpandPost;