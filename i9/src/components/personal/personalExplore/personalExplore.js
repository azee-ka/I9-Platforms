import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../reducers/auth/useAuth';
import API_BASE_URL from '../../../config';
import './personalExplore.css';
import PostsGrid from '../postUI/postGrid/postGrid';

const PersonalExplore = ({ handleExpandPostOpen }) => {
    const { authState } = useAuth();
    const [posts, setPosts] = useState([]);

    const fetchExplorePosts = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Token ${authState.token}`
                }
            };
            const response = await axios.get(`${API_BASE_URL}personal/explore/posts`, config);
            setPosts(response.data);
            // console.log(response.data)
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchExplorePosts();
    }, []);

    return (
        <div className='personal-explore-container'>
            <div className='personal-explore-container-inner'>
                <div className='personal-explore-header'>
                    <h2>Explore</h2>
                </div>
                <div className='personal-explore-content'>
                    <div className='personal-explore-content-left-container'>
                        <div className='personal-explore-posts-grid'>
                            <div className='personal-explore-posts-grid-inner'>
                                {posts.length !== 0 ? (
                                    <PostsGrid classname={'explore'} postsData={posts} handleExpandPostOpen={handleExpandPostOpen} />
                                ) : (
                                    <div>
                                    </div>
                                )
                                }
                            </div>
                        </div>
                    </div>
                    <div className='personal-explore-content-right-container'>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PersonalExplore;