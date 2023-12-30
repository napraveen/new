import React, { useEffect } from 'react';
import IsAuthenticated from '../functions/IsAuthenticated';
import { useNavigate } from 'react-router-dom';
import GetUserDetails from '../functions/GetUserDetails';
import '../css/Home.css';
import Left from '../subpages/Left';
import { useState } from 'react';
import HomeRight from '../subpages/HomeRight';
const HomePage = () => {
  const navigate = useNavigate();
  const { authenticated, loading } = IsAuthenticated();
  if (!authenticated) {
    navigate('/login');
  }
  const { userDetails } = GetUserDetails();
  const [data, setData] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState({});
  const handleCheckboxChange = (id) => {
    setStudentAttendance({
      ...studentAttendance,
      [id]: !studentAttendance[id], // Toggle the checked status for the student
    });
  };
  const handleSubmit = async () => {
    const presentStudents = department.filter(
      (item) => studentAttendance[item._id]
    );
    const absentStudents = department.filter(
      (item) => !studentAttendance[item._id]
    );

    try {
      const response = await fetch(
        `http://localhost:4000/api/updateAttendance/${userDetails.username}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ presentStudents, absentStudents }),
        }
      );

      if (response.ok) {
        console.log('Attendance updated successfully');
        // You might want to reset the state after successful submission
        setStudentAttendance({});
      } else {
        throw new Error('Failed to update attendance');
      }
    } catch (error) {
      console.error('Error updating attendance:', error);
    }
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/students`);
        if (response.ok) {
          const studentsData = await response.json();
          setData(studentsData); // Update state with fetched data
        } else {
          throw new Error('Failed to fetch data');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchStudents();
  }, [authenticated]);
  const department = userDetails
    ? data.filter((item) => item.departmentId === userDetails.username)
    : [];

  return (
    <>
      <div className="home-home_page">
        {userDetails ? (
          <>
            <div className="home-container">
              <div className="home-dashboard">
                <Left iconBg1="green" iconBg2="" iconBg3="" iconBg4="" />
                <HomeRight
                  department={department}
                  handleSubmit={handleSubmit}
                  handleCheckboxChange={handleCheckboxChange}
                  studentAttendance={studentAttendance}
                />
              </div>
            </div>
          </>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </>
  );
};

export default HomePage;
