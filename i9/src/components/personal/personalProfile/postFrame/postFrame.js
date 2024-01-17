import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './postFrame.css';
import '../postContent/postContent.css';
import '../../expandPost/expandPostOverlay.css';
import '../../expandPost/expandedPost.css';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams and useNavigate from react-router-dom
import API_BASE_URL from '../../../../config.js';
import UserListOverlay from '../../personalTimeline/followListOverlay.js';
// import likedImg from '../../../assets/liked.png';
// import unlikedImg from '../../../assets/unliked.png';
// import dislikedImg from '../../../assets/disliked.png';
// import undislikedImg from '../../../assets/undisliked.png';
// import VideoPlayer from '../timeline/videoPlayer';
import Post from '../../personalTimeline/post';
import PostContent from '../postContent/postContent.js';
import { useAuth } from '../../../../reducers/auth/useAuth.js';

const PostFrame = ({ postIdForOverlay, posts, currentIndex, onClose, originalUrl }) => {

    const { authState } = useAuth();
    const user = authState.user;

    const { postId: postIdParam } = useParams();

    const [displayPost, setDisplayPost] = useState(null);
    const [dispayPostId, setDisplayPostId] = useState(null);

    const [currIndex, setCurrIndex] = useState(currentIndex);
    const [allPosts, setAllPosts] = useState(posts);

    const [showLikesOverlay, setShowLikesOverlay] = useState(false);
    const [showDislikesOverlay, setShowDislikesOverlay] = useState(false);

    const [loading, setLoading] = useState(true);

    const [clickedPreviousOrNext, setClickedPreviousOrNext] = useState(false);

    useEffect(() => {
        //    setOriginalUrl(window.location.href);
        // fetchUserData();
        setLoading(false); // Set loading to false once user data is fetched

    }, [setLoading]);

    useEffect(() => {
        setPostId(postIdForOverlay, postIdParam);
        setAllPosts(posts);
    }, []);


    const setPostId = (postIdForOverlay, postIdParam) => {
        if (postIdForOverlay) {
            setDisplayPostId(postIdForOverlay);
            window.history.replaceState(null, null, `/post/${postIdForOverlay}`);
        } else {
            setDisplayPostId(postIdParam);
        }
    }


    const displayPostContent = () => {
        if (!loading) {

            const headers = new Headers({
                'Authorization': `Token ${authState.token}`,
            });

            fetch(`${API_BASE_URL}posts/${dispayPostId}`, {
                method: 'GET',
                headers: headers,
            })
                .then(response => response.json())
                .then(data => {
                    setDisplayPost(data);
                })
                .catch(error => {
                    console.error('Error fetching expanded post:', error);
                });
        }
    };

    useEffect(() => {
        displayPostContent();
    }, [dispayPostId]);

    const handlePreviousPost = () => {
        if (allPosts) {
            if (allPosts[currIndex - 1] !== undefined) {
                setDisplayPostId(allPosts[currIndex - 1].id);
                setDisplayPost(allPosts[currIndex - 1]);
                setPostId(allPosts[currIndex - 1].id, null);
                setCurrIndex(currIndex - 1);
                setClickedPreviousOrNext(true);
            }
        }
    }

    const handleNextPost = () => {
        if (allPosts) {
            if (allPosts[currIndex + 1] !== undefined) {
                setDisplayPostId(allPosts[currIndex + 1].id);
                setDisplayPost(allPosts[currIndex + 1]);
                setPostId(allPosts[currIndex + 1].id, null);
                setCurrIndex(currIndex + 1);
                setClickedPreviousOrNext(true);
            }
        }
    }

    const handleCloseOverlay = () => {
        setShowLikesOverlay(false);
        setShowDislikesOverlay(false);
    };

    const handleCloseExpandPostOverlay = (event) => {
        //if (event.target.classList.contains('expanded-overlay')) {
            onClose?.();
            window.history.replaceState(null, null, originalUrl);
        //}
    };

    return (
        <div className={`expanded${postIdForOverlay ? '-overlay' : '-non-overlay'}`} onClick={handleCloseExpandPostOverlay}>
            <div className="expanded-post-container" onClick={(e) => e.stopPropagation()}>
                <div className="expanded-close-button" onClick={handleCloseExpandPostOverlay}>&times;</div>

                {allPosts &&
                    <div className='expanded-post-previous-next-post-buttons'>
                        <div className={`expanded-post-previous-post-button`}>
                            {allPosts[currIndex - 1] !== undefined &&
                                <button onClick={handlePreviousPost}>
                                    <FontAwesomeIcon icon={faChevronLeft} />
                                </button>
                            }
                        </div>
                        <div className={`expanded-post-next-post-button`}>
                            {allPosts[currIndex + 1] !== undefined &&
                                <button onClick={handleNextPost}>
                                    <FontAwesomeIcon icon={faChevronRight} />
                                </button>
                            }
                        </div>
                    </div>
                }

                <PostContent
                    post={displayPost}
                    setPost={setDisplayPost}
                    user={user}
                    showLikesOverlay={showLikesOverlay}
                    setShowLikesOverlay={setShowLikesOverlay}
                    showDislikesOverlay={showDislikesOverlay}
                    setShowDislikesOverlay={setShowDislikesOverlay}
                    clickedPreviousOrNext={clickedPreviousOrNext}
                />

            </div>
            {showLikesOverlay && (
                <UserListOverlay
                    userList={displayPost.likes}
                    onClose={handleCloseOverlay}
                    title={'Likes'}
                    username={user.username} />
            )}
            {showDislikesOverlay && (
                <UserListOverlay
                    userList={displayPost.dislikes}
                    onClose={handleCloseOverlay}
                    title={'Dislikes'}
                    username={user.username} />
            )}
        </div>
    );

};

export default PostFrame;