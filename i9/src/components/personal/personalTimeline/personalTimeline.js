// LearnerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './personalTimeline.css';
import { useAuth } from '../../../reducers/auth/useAuth';
import API_BASE_URL from '../../../config';
import TimelinePost from './timelinePost';

const PersonalTimeline = () => {
  const { authState } = useAuth();
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    // Fetch explore page posts from your Django backend using Axios with the token in the headers
    axios.get(`${API_BASE_URL}personal/timeline/posts/`, {
      headers: {
        Authorization: `Token ${authState.token}` // Include the token in headers for authentication
      }
    })
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching timeline page posts:', error);
      });
  }, []);

  return (
    <div className='personal-timeline-container'>
      <div className='personal-timeline-container-inner'>
        <div className='personal-timeline-header'>
          <h2>Timeline</h2>
        </div>
        <div className='personal-timeline-content'>
          <div className="personal-timeline-content-inner">
            <div className="timeline-left-side-container">
              {posts.map((post) =>
                post.media !== null ? (
                  <TimelinePost postData={post} />
                ) : null
              )}
            </div>
            <div className="timeline-right-side-container"></div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalTimeline;
