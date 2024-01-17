import VideoPlayer from "../utils/videoPlayer";
import API_BASE_URL from "../../../config";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from "../../../reducers/auth/useAuth";
import './perPostGrid.css';

const PerPostGrid = ({ cl, handleShowPostOverlay }) => {
  const { authState } = useAuth();
  const [postsData, setPostsData] = useState({});
  const [posts, setPosts] = useState();  

  const fetchProfileData = async () => {
      try {
          const config = {
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Token ${authState.token}`
              }
          };
          const response = await axios.get(`${API_BASE_URL}personal/get-profile/`, config);
          console.log(response.data.my_posts);
          setPosts(response.data.my_posts);
      } catch (error) {
          console.error('Error fetching profile data:', error);
      }
  };

  useEffect(() => {
      fetchProfileData();
  }, []);

  return (
    <div className={`${cl}-content`}>
      {posts ? (
        posts.map((post, index) =>
          post.media !== null ? (
            // Wrap each post with a Link to the ExpandedPost view
            <div onClick={() => handleShowPostOverlay(post, posts, index)} key={index}>
              <div className={`${cl}-post`}>
                {/* Display post content */}
                <div className={`${cl}-media`}>
                  {post.media_files.length > 0 &&
                    (post.media_files[0].media_type === 'mp4' || post.media_files[0].media_type === 'MOV' ? (
                      <VideoPlayer
                        mediaFile={post.media_files[0]}
                        onEnded={null}
                        playable={false}
                      />
                    ) : (
                      <img src={`${API_BASE_URL}${post.media_files[0].file}`} alt={post.id} />
                    ))}
                </div>
              </div>
            </div>
          ) : null
        )
      ) : (
        <div>
        </div>
      )}
    </div>
  );
}


export default PerPostGrid;