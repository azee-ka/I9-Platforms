// EducatorProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EducatorProfile = () => {
  const [educatorInfo, setEducatorInfo] = useState({});
  const [coursesTaught, setCoursesTaught] = useState([]);
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    // Fetch educator's profile data from your backend API
    const fetchProfileData = async () => {
      try {
        const infoResponse = await axios.get('/api/educator/profile');
        setEducatorInfo(infoResponse.data);

        const coursesTaughtResponse = await axios.get('/api/educator/coursesTaught');
        setCoursesTaught(coursesTaughtResponse.data);

        const achievementsResponse = await axios.get('/api/educator/achievements');
        setAchievements(achievementsResponse.data);
      } catch (error) {
        console.error('Error fetching educator profile data:', error.message);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <div>
      <h2>Educator Profile</h2>
      <div>
        <h3>Personal Information</h3>
        <p>Name: {educatorInfo.name}</p>
        <p>Email: {educatorInfo.email}</p>
        {/* Add more personal information fields as needed */}
      </div>
      <div>
        <h3>Courses Taught</h3>
        <ul>
          {coursesTaught.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Achievements</h3>
        <ul>
          {achievements.map((achievement) => (
            <li key={achievement.id}>{achievement.title}</li>
          ))}
        </ul>
      </div>
      {/* Include sections for updating profile settings and preferences */}
    </div>
  );
};

export default EducatorProfile;
