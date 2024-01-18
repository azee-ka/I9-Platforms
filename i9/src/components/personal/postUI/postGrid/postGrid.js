// personalProfile.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../reducers/auth/useAuth';
import './postGrid.css';
import API_BASE_URL from '../../../../config';
import VideoPlayer from '../../utils/videoPlayer';

const PerPostGrid = ({ classname, postData, handleExpandPostOpen }) => {
  const navigate = useNavigate();

  const handlePostClick = () => {
    console.log("click");
    handleExpandPostOpen(postData.id, window.location.pathname);
    window.history.replaceState(null, null, `/post/${postData.id}`);
  };

  console.log(postData);

  return (
    <div className='post-for-grid'>
      <div className='post-for-grid-inner' onClick={handlePostClick}>
        {postData.media_files.length > 0 &&
          (postData.media_files[0].media_type === 'mp4' || postData.media_files[0].media_type === 'MOV' ? (
            <VideoPlayer
              mediaFile={postData.media_files[0]}
              onEnded={null}
              playable={false}
            />
          ) : (
            <img src={`${API_BASE_URL}${postData.media_files[0].file}`} alt={postData.id} />
          ))
        }
      </div>
    </div>
  );
}

export default PerPostGrid;