import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './createPost.css';
import API_BASE_URL from '../../../config';
import crossIcon from '../../../assets/cross-icon.png';
import VideoPlayer from '../utils/videoPlayer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
// import '@fortawesome/fontawesome-free/css/all.css';
import { useAuth } from '../../../reducers/auth/useAuth';
import CreatePostOverlay from './createPostOverlay/createPostOverlay';
import CreatePostNonOverlay from './createPostNonOverlay/createPostNonOverlay';

const CreatePost = ({ originalUrl, handleCreatePostOverlayClose }) => {

  return originalUrl ? (
    <CreatePostOverlay originalUrl={originalUrl} handleCreatePostOverlayClose={handleCreatePostOverlayClose} />
  ) : (
    <CreatePostNonOverlay />
  );
};

export default CreatePost;