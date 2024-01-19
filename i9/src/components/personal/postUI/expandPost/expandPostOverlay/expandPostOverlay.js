import React, { useState, useEffect } from 'react';
import './expandPostOverlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import API_BASE_URL from '../../../../../config';
import default_profile_picture from '../../../../../assets/default_profile_picture.png';
import axios from 'axios';
import { useAuth } from '../../../../../reducers/auth/useAuth';

const ExpandedPostOverlay = ({ postData }) => {
    const { authState } = useAuth();
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const [post, setPost] = useState(postData);

    const [commentTextField, setCommentTextField] = useState('');

    useEffect(() => {
        setPost(postData);
    }, [postData]);


    const handleMediaPreviousClick = () => {
        if (currentMediaIndex !== 0) {
            setCurrentMediaIndex(currentMediaIndex - 1);
        }
    };
    const handleMediaNextClick = () => {
        if (currentMediaIndex !== post.media_files.length - 1) {
            setCurrentMediaIndex(currentMediaIndex + 1);
        }
    };
    // posts/postData.id/comment/
    const handlePostCommentButton = async () => {
        const formData = new FormData();
        formData.append('text', commentTextField);
        formData.append('post_id', postData.id);

        console.log(authState)
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };
            const response = await axios.post(`${API_BASE_URL}posts/${post.id}/comment/`, formData, config);

            setCommentTextField('');
            setPost((prevPostData) => ({
                ...prevPostData,
                comments: [...prevPostData.comments, response.data],
            }));

        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    return post ? (
        <div className="expanded-post-overlay-container">
            <div className='expanded-post-overlay-user-info-comments-container'>
                <div className='expanded-post-overlay-user-info-comments-container-inner'>
                    <div className='expanded-post-overlay-user-info'>
                        <div className='expanded-post-overlay-user-info-profile-picture-contatiner'>
                            <div className='expanded-post-overlay-user-info-profile-picture-contatiner-inner'>
                                <img src={`${post ? post.user.profile_picture ? post.user.profile_picture : default_profile_picture : default_profile_picture}`} />
                            </div>
                        </div>
                        <div className='expanded-post-overlay-user-info-text-contatiner'>
                            <div className='expanded-post-overlay-user-info-username-contatiner'>
                                {post.user.username}
                            </div>
                        </div>
                    </div>
                    <div className='expanded-post-overlay-comments'>
                        <div className='expanded-post-overlay-comments-innner'>
                            {post.comments.map((commentData, index) => (
                                <div key={`${index}-${commentData.created_at}`} className='expanded-post-per-comment'>
                                    <div className='expanded-post-comments-info'>
                                        <div className='expanded-post-commenting-user-info'>
                                            <div className='expanded-post-commenting-user-profile-picture'>
                                                <div className='expanded-post-commenting-user-profile-picture-inner'>
                                                    <img src={`${post.user.profile_picture ? post.user.profile_picture : default_profile_picture}`} />
                                                </div>
                                            </div>
                                            <div className='expanded-post-commenting-user-username'>
                                                <p>{commentData.user.username}</p>
                                            </div>
                                        </div>
                                        <div className='expanded-post-comment-info'>

                                        </div>
                                    </div>
                                    <div className='expanded-post-comments-text'>
                                        <div className='expanded-post-comments-text-inner'>
                                            <p>{commentData.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }
                        </div>
                    </div>
                    <div className='expanded-post-comment-post-container'>
                        <div className='expanded-post-comment-post-button'>
                            <button onClick={handlePostCommentButton} >Post</button>
                        </div>
                        <div className='expanded-post-comment-post-container-inner'>
                            <textarea
                                value={commentTextField}
                                onChange={(e) => setCommentTextField(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className='expanded-post-overlay-post-info-img-container'>
                <div className='expanded-post-overlay-post-info-container'>

                </div>
                <div className='expanded-post-overlay-img-container'>
                    {post &&
                        <div className='expanded-post-overlay-post-img'>
                            <img src={`${API_BASE_URL}${post.media_files[currentMediaIndex].file}`} />
                        </div>
                    }
                    {post.media_files.length > 1 &&
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
                                    {currentMediaIndex !== post.media_files.length - 1 &&
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