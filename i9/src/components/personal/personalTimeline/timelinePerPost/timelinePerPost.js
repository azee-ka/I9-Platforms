import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './timelinePerPost.css';
import { useAuth } from '../../../../reducers/auth/useAuth';
import API_BASE_URL, { CLIENT_BASE_URL } from '../../../../config';
import ProfilePicture from '../../../../utils/getProfilePicture';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

import unliked from '../../../../assets/unliked.png';
import undisliked from '../../../../assets/undisliked.png';
import liked from '../../../../assets/liked.png';
import disliked from '../../../../assets/disliked.png';
import VideoPlayer from '../../utils/videoPlayer';
import UserListOverlay from '../../utils/userListOverlay/userListOverlay';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import { timeAgo } from '../../expandPost/convertDateTIme';

const TimelinePerPost = ({ postId }) => {
    const navigate = useNavigate();
    const { authState } = useAuth();

    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    const [post, setPost] = useState(null);


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
            // console.log(response.data);
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

    const handlePreviousMediaClick = () => {
        if (currentMediaIndex > 0) {
            setCurrentMediaIndex(currentMediaIndex - 1);
        }
    };

    const handleNextMediaClick = () => {
        if (currentMediaIndex <= post.media_files.length - 2) {
            setCurrentMediaIndex(currentMediaIndex + 1);
        }
    };

    const handleCloseOverlay = () => {
        setShowDislikesOverlay(false);
        setShowLikesOverlay(false);
    }

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
                    // console.log(data);

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
                    // console.log(data);

                })
                .catch(error => console.error('Error toggling like:', error));
        };

        handleDislike();
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
        <div className='personal-timeline-per-post'>
            <div className='personal-timeline-per-post-inner'>
                <div className='personal-timeline-post-user-info'>
                    <div className='personal-timeline-post-user-profile-picture'>
                        <ProfilePicture src={post.user.profile_picture} />
                    </div>
                    <div className='personal-timeline-post-user-username'>
                        <a href={`${CLIENT_BASE_URL}/personal/profile/${post.user.username}`}>@{post.user.username}</a>
                    </div>
                    <div className='personal-timeline-post-stats'>
                        <div className='personal-timeline-post-created-at'>
                            <p>Posted {timeAgo(post.created_at)}</p>
                        </div>
                        <div className='personal-timeline-post-stats-count'>
                            <p >{post.comments.length} {post.comments.length === 1 ? 'comment' : 'comments'}</p>
                            <p onClick={() => setShowLikesOverlay(!showLikesOverlay)}>{post.likes.length} {post.likes.length === 1 ? 'like' : 'likes'}</p>
                            <p onClick={() => setShowDislikesOverlay(!showDislikesOverlay)}>{post.dislikes.length} {post.dislikes.length === 1 ? 'dislike' : 'dislikes'}</p>
                        </div>
                    </div>
                </div>
                <div className='personal-timeline-post-media-container'>
                    {renderMediaContent(post.media_files[currentMediaIndex])}
                    <div className='personal-timeline-post-previous-next-post-button-container'>
                        <div className='personal-timeline-post-previous-next-post-button-container-inner'>
                            <div className='personal-timeline-post-previous-post-button-container'>
                                {currentMediaIndex > 0 &&
                                    <div className='personal-timeline-post-previous-post-button-container-inner' onClick={handlePreviousMediaClick}>
                                        <FontAwesomeIcon icon={faChevronLeft} />
                                    </div>
                                }
                            </div>
                            <div className='personal-timeline-post-next-post-button-container'>
                                {currentMediaIndex <= post.media_files.length - 2 &&
                                    <div className='personal-timeline-post-next-post-button-container-inner' onClick={handleNextMediaClick}>
                                        <FontAwesomeIcon icon={faChevronRight} />
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className='personal-timeline-post-comments-caption'>

                </div>
            </div>
            <div className='personal-timeline-per-post-interaction'>
                <div onClick={handlePostLike}>
                    <img src={postLiked ? liked : unliked} />
                </div>
                <div onClick={handlePostDislike}>
                    <img src={postDisliked ? disliked : undisliked} />
                </div>
            </div>
            {showLikesOverlay && (
                <UserListOverlay userList={post.likes} onClose={handleCloseOverlay} title={'Likes'} />
            )}
            {showDislikesOverlay && (
                <UserListOverlay userList={post.dislikes} onClose={handleCloseOverlay} title={'Dislikes'} />
            )}
        </div>
    ) : (
        <div>Loading...</div>
    )
};

export default TimelinePerPost;