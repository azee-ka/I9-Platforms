// EducatorDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EducatorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    // Fetch educator-specific data from your backend API
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get('/api/educator/courses');
        setCourses(coursesResponse.data);

        const feedbackResponse = await axios.get('/api/educator/feedback');
        setFeedback(feedbackResponse.data);

        const assignmentsResponse = await axios.get('/api/educator/assignments');
        setAssignments(assignmentsResponse.data);
      } catch (error) {
        console.error('Error fetching educator data:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Educator Dashboard</h2>
      <div>
        <h3>Teaching Courses</h3>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>{course.title}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3>Feedback Received</h3>
        <ul>
          {feedback.map((item) => (
            <li key={item.id}>{item.message}</li>
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
      {/* Include sections for other educator-specific features */}
    </div>
  );
};

export default EducatorDashboard;
