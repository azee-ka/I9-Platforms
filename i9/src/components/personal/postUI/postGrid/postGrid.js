// personalProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import './postGrid.css';
import API_BASE_URL from '../../../../config';
import VideoPlayer from '../../utils/videoPlayer';

const PostsGrid = ({ classname, postsData, handleExpandPostOpen }) => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState(postsData);

  const handlePostClick = (post, index) => {
    handleExpandPostOpen(post.id, posts, window.location.pathname, index);
  };


  // console.log(posts);

  // {postData.thumbnail.media_type === 'mp4' || postData.thumbnail.media_type === 'MOV' ? (
  //   <VideoPlayer
  //     mediaFile={postData.thumbnail}
  //     onEnded={null}
  //     playable={false}
  //   />
  // ) : (
  //   <img src={`${API_BASE_URL}${postData.thumbnail.file}`} alt={postData.id} />
  // )}

  return posts ? (
    <div className='post-for-grid'>
      <div className='post-for-grid-inner'>
        {posts.map((post, index) => (
          <div className='per-post-grid' key={`${index}-${post.id}`} onClick={() => handlePostClick(post, index)}>
            <div className='grid-per-post' >
              {post.thumbnail.media_type === 'mp4' || post.thumbnail.media_type === 'MOV' ? (
                <VideoPlayer
                  mediaFile={post.thumbnail}
                  onEnded={null}
                  playable={false}
                />
              ) : (
                <img src={`${API_BASE_URL}${post.thumbnail.file}`} alt={post.id} />
              )}
            </div>
          </div>
        ))}

      </div>
    </div>
  ) : (
    <div>Loading...</div>
  )
}

export default PostsGrid;