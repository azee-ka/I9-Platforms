// personalProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import './postGrid.css';
import API_BASE_URL from '../../../../config';
import VideoPlayer from '../../utils/videoPlayer';

const PerPostGrid = ({ postData, previousPostId, nextPostId, handleExpandPostOpen }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    console.log("click", postData);
    handleExpandPostOpen(postData.id, window.location.pathname);
    window.history.replaceState(null, null, `/post/${postData.id}`);
  };

  console.log(postData);

  return (
    <div className='post-for-grid'>
      <div className='post-for-grid-inner' onClick={handlePostClick}>
          {postData.thumbnail.media_type === 'mp4' || postData.thumbnail.media_type === 'MOV' ? (
            <VideoPlayer
              mediaFile={postData.thumbnail}
              onEnded={null}
              playable={false}
            />
          ) : (
            <img src={`${API_BASE_URL}${postData.thumbnail.file}`} alt={postData.id} />
          )}
      </div>
    </div>
  );
}

export default PerPostGrid;