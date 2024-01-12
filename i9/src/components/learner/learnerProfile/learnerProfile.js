// LearnerProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LearnerProfile = () => {
  const [learnerInfo, setLearnerInfo] = useState({});
  const [achievements, setAchievements] = useState([]);
  const [preferences, setPreferences] = useState({});

  useEffect(() => {
    // Fetch learner's profile data from your backend API
    const fetchProfileData = async () => {
      try {
        const infoResponse = await axios.get('/api/learner/profile');
        setLearnerInfo(infoResponse.data);

        const achievementsResponse = await axios.get('/api/learner/achievements');
        setAchievements(achievementsResponse.data);

        const preferencesResponse = await axios.get('/api/learner/preferences');
        setPreferences(preferencesResponse.data);
      } catch (error) {
        console.error('Error fetching learner profile data:', error.message);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h2>Learner Profile</h2>
      <div>
        <h3>Personal Information</h3>
        <p>Name: {learnerInfo.name}</p>
        <p>Email: {learnerInfo.email}</p>
        {/* Add more personal information fields as needed */}
      </div>
      <div>
        <h3>Achievements</h3>
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.id}>{achievement.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Progress</h3>
        <p>Total Courses Completed: {learnerInfo.coursesCompleted}</p>
        {/* Include more progress-related information */}
      </div>
      <div>
        <h3>Preferences</h3>
        <p>Preferred Learning Style: {preferences.learningStyle}</p>
        {/* Add more preference-related information */}
      </div>
      {/* Include sections for updating profile settings and preferences */}
    </div>
  );
};

export default LearnerProfile;
