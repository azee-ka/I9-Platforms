// LearnerDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LearnerDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [progress, setProgress] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch learner-specific data from your backend API
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get('/api/learner/courses');
        setCourses(coursesResponse.data);

        const progressResponse = await axios.get('/api/learner/progress');
        setProgress(progressResponse.data);

        const assignmentsResponse = await axios.get('/api/learner/assignments');
        setAssignments(assignmentsResponse.data);
      } catch (error) {
        console.error('Error fetching learner data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Learner Dashboard</h2>
      <div>
        <h3>Enrolled Courses</h3>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Progress</h3>
        <ul>
          {progress.map((item) => (
            <li key={item.id}>{item.title} - {item.completed ? 'Completed' : 'In Progress'}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Upcoming Assignments</h3>
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>{assignment.title} - Due: {assignment.dueDate}</li>
          ))}
        </ul>
      </div>
      {/* Include sections for video platforms, calculators, simulations, notifications, etc. */}
    </div>
  );
};

export default LearnerDashboard;
