import React, { useState, useEffect } from 'react';
import './expandPostNonOverlay.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/css/all.css';
import API_BASE_URL from '../../../../../config';
import default_profile_picture from '../../../../../assets/default_profile_picture.png';
import axios from 'axios';
import { useAuth } from '../../../../../reducers/auth/useAuth';
import { timeAgo } from '../convertDateTime';
import ExpandedPostLoading from '../expandedPostLoading/expandedPostLoading';
import unliked from '../../../../../assets/unliked.png';
import undisliked from '../../../../../assets/undisliked.png';
import liked from '../../../../../assets/liked.png';
import disliked from '../../../../../assets/disliked.png';
import VideoPlayer from '../../../utils/videoPlayer';
import UserListOverlay from '../../../utils/userListOverlay/userListOverlay';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

const ExpandedPostNonOverlay = ({ postId }) => {

    const navigate = useNavigate();
    const { authState } = useAuth();
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const [post, setPost] = useState(null);

    const [commentTextField, setCommentTextField] = useState('');

    const [postLiked, setPostLiked] = useState(false);
    const [postDisliked, setPostDisliked] = useState(false);

    const [showLikesOverlay, setShowLikesOverlay] = useState(false);
    const [showDislikesOverlay, setShowDislikesOverlay] = useState(false);



    

    useEffect(() => {
        // Fetch explore page posts from your Django backend using Axios with the token in the headers
        axios.get(`${API_BASE_URL}posts/${postId}`, {
          headers: {
            Authorization: `Token ${authState.token}` // Include the token in headers for authentication
          }
        })
          .then(response => {
            console.log(response.data);
            setPost(response.data);
          })
          .catch(error => {
            console.error('Error fetching timeline page posts:', error);
          });
      }, []);


    useEffect(() => {    
        // Fetch initial like/dislike status when component mounts
        const fetchInitialLikeStatus = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}posts/${postId}/like-status/`, {
                    headers: {
                        'Authorization': `Token ${authState.token}`,
                    },
                });
                const { liked, disliked } = response.data;
                setPostLiked(liked);
                setPostDisliked(disliked);
            } catch (error) {
                console.error('Error fetching like status:', error);
            }
        };
    
            
        if(post) {
            fetchInitialLikeStatus();
        }
    
    }, [authState.token, post]);

    const handleCloseOverlay = () => {
        setShowLikesOverlay(false);
        setShowDislikesOverlay(false);
    }


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


    const handlePostCommentButton = async () => {
        const formData = new FormData();
        formData.append('text', commentTextField);
        formData.append('post_id', postId);

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



    const handlePostLike = () => {
        setPostLiked(!postLiked);
        setPostDisliked(false);

        const handleLike = () => {
            const method = (postLiked === true) ? 'DELETE' : 'POST';
            fetch(`${API_BASE_URL}posts/${post.id}/like/`, {
                method: method,
                headers: {
                    'Authorization': `Token ${authState.token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setPost(data);
                })
                .catch(error => console.error('Error toggling like:', error));
        };

        handleLike();

    };

    const handlePostDislike = () => {
        setPostDisliked(!postDisliked);
        setPostLiked(false);

        const handleDislike = () => {
            const method = (postDisliked === true) ? 'DELETE' : 'POST';
            fetch(`${API_BASE_URL}posts/${post.id}/dislike/`, {
                method: method,
                headers: {
                    'Authorization': `Token ${authState.token}`,
                },
            })
                .then(response => response.json())
                .then(data => {
                    setPost(data);
                })
                .catch(error => console.error('Error toggling like:', error));
        };

        handleDislike();
    };


    const handleDeletePost = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };
            await axios.delete(`${API_BASE_URL}posts/${post.id}/delete/`, config);
            navigate(null);
            window.location.reload();

        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };



    const renderMediaContent = (mediaFile, onEnded) => {
        // console.log(mediaFile)
        if (mediaFile.media_type === 'mp4' || mediaFile.media_type === 'MOV') {
            return (
                <VideoPlayer
                    mediaFile={mediaFile}
                    onEnded={onEnded}
                    playable={true}
                />
            );
        } else {
            return (
                <img src={`${API_BASE_URL}${mediaFile.file}`} alt={mediaFile.id} />
            );
        }
    };

    return post ? (
        <div className="expanded-post-non-overlay-container">
            <div className='expanded-post-non-overlay-container-inner'>
            <div className='expanded-post-non-overlay-user-info-comments-container'>
                <div className='expanded-post-non-overlay-user-info-comments-container-inner'>
                    <div className='expanded-post-non-overlay-user-info'>
                        <div className='expanded-post-non-overlay-user-info-profile-picture-contatiner'>
                            <div className='expanded-post-non-overlay-user-info-profile-picture-contatiner-inner'>
                                <img src={`${post ? post.user.profile_picture ? post.user.profile_picture : default_profile_picture : default_profile_picture}`} />
                            </div>
                        </div>
                        <div className='expanded-post-non-overlay-user-info-text-contatiner'>
                            <div className='expanded-post-non-overlay-user-info-username-contatiner'>
                                {post.user.username}
                            </div>
                        </div>
                    </div>
                    <div className='expanded-post-non-overlay-comments'>
                        <div className='expanded-post-non-overlay-comments-innner'>
                            {post.comments.length !== 0 ?
                                (post.comments.map((commentData, index) => (
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
                                                <p>Posted {timeAgo(commentData.created_at)}</p>
                                            </div>
                                        </div>
                                        <div className='expanded-post-comments-text'>
                                            <div className='expanded-post-comments-text-inner'>
                                                <p>{commentData.text}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))) : (
                                    <div className='expanded-post-no-comments'>
                                        No Comments
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className='expanded-post-comment-post-container'>
                        <div className={`expanded-post-comment-post-button ${commentTextField !== '' ? 'active': ''}`}>
                            {commentTextField !== '' &&
                                <button onClick={handlePostCommentButton} >Post</button>
                            }
                        </div>
                        <div className='expanded-post-comment-post-container-inner'>
                            <textarea
                                placeholder='Comment here...'
                                value={commentTextField}
                                onChange={(e) => setCommentTextField(e.target.value)}
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div className='expanded-post-non-overlay-post-info-img-container'>
                <div className='expanded-post-non-overlay-post-info-container'>
                    <div className='expanded-post-non-overlay-post-info-container-inner'>
                        <div className='expanded-post-non-overlay-post-creation-time'>
                            <p>Posted {timeAgo(post.created_at)}</p>
                        </div>
                        <div className='expanded-post-non-overlay-post-info-likes-unlikes-comments-count'>
                            <p >{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</p>
                            <p onClick={() => setShowLikesOverlay(!showLikesOverlay)}>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</p>
                            <p onClick={() => setShowDislikesOverlay(!showDislikesOverlay)}>{post.dislikes.length} {post.dislikes.length === 1 ? 'dislike' : 'dislikes'}</p>
                        </div>
                    </div>
                </div>
                <div className='expanded-post-non-overlay-img-container'>
                    {post &&
                        <div className='expanded-post-non-overlay-post-img'>
                            {renderMediaContent(post.media_files[currentMediaIndex])}
                            {/* <img src={`${API_BASE_URL}${post.media_files[currentMediaIndex].file}`} /> */}
                        </div>
                    }
                    {post.media_files.length > 1 &&
                        <div className='expanded-post-non-overlay-img-previous-next-buttons-container'>
                            <div className='expanded-post-non-overlay-img-previous-next-buttons-container-inner'>
                                <div className='expanded-post-non-overlay-img-previous-button-container'>
                                    {currentMediaIndex > 0 &&
                                        <div className='expanded-post-non-overlay-img-previous-button-container-inner' onClick={handleMediaPreviousClick}>
                                            <FontAwesomeIcon icon={faChevronLeft} />
                                        </div>
                                    }
                                </div>
                                <div className='expanded-post-non-overlay-img-next-button-container'>
                                    {currentMediaIndex !== post.media_files.length - 1 &&
                                        <div className='expanded-post-non-overlay-img-next-button-container-inner' onClick={handleMediaNextClick}>
                                            <FontAwesomeIcon icon={faChevronRight} />
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>

                    }
                </div>
            </div>
            <div className='expanded-post-non-overlay-interaction-container'>
                <div onClick={handlePostLike}>
                    <img src={postLiked ? liked : unliked} />
                </div>
                <div onClick={handlePostDislike}>
                    <img src={postDisliked ? disliked : undisliked} />
                </div>
                {post.user.username === authState.user.username &&
                    <div onClick={handleDeletePost} className='expanded-post-overlay-delete-post'>
                        <i className='fa fa-trash' id="delete-icon" />
                    </div>
                }
            </div>
            {showLikesOverlay && (
                <UserListOverlay userList={post.likes} onClose={handleCloseOverlay} title={'Likes'} username={authState.user.username} />
            )}
            {showDislikesOverlay && (
                <UserListOverlay userList={post.dislikes} onClose={handleCloseOverlay} title={'Dislikes'} username={authState.user.username} />
            )}
            </div>
        </div>
    ) : (
        <ExpandedPostLoading />
    );
}

export default ExpandedPostNonOverlay;