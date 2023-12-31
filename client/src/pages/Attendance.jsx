import React, { useEffect } from 'react';
import IsAuthenticated from '../functions/IsAuthenticated';
import { useNavigate } from 'react-router-dom';
import GetUserDetails from '../functions/GetUserDetails';
import '../css/Home.css';
import Left from '../subpages/Left';
import { useState } from 'react';
import AttendanceRight from '../subpages/AttendanceRight';
const Attendance = () => {
  const navigate = useNavigate();
  const { authenticated, loading } = IsAuthenticated();
  if (!authenticated) {
    navigate('/login');
  }
  const { userDetails } = GetUserDetails();
  const [data, setData] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState({});
  const [submissionStatus, setsubmissionStatus] = useState(false);
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
        setsubmissionStatus(true);
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

    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/submissionstatus/${userDetails.username}`
        );
        if (response.ok) {
          const data = await response.json();
          let submissionStatus = false;
          if (data.message === 'true') {
            submissionStatus = true;
          }
          console.log('Submission Status:', submissionStatus);
          setsubmissionStatus(submissionStatus);
        } else {
          throw new Error('Failed to fetch submission status');
        }
      } catch (error) {
        console.error('Error fetching submission status:', error);
      }
    };

    if (userDetails && userDetails.username) {
      fetchData();
    }
  }, [authenticated, userDetails]);
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
                <Left
                  iconBg1=""
                  iconText1=""
                  iconBg2="#3D3B40"
                  iconText2="white"
                  iconBg3=""
                  iconText3=""
                  iconBg4=""
                  iconText4=""
                  iconBg5=""
                  iconText5=""
                />
                <AttendanceRight
                  department={department}
                  handleSubmit={handleSubmit}
                  handleCheckboxChange={handleCheckboxChange}
                  studentAttendance={studentAttendance}
                  submissionStatus={submissionStatus}
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

export default Attendance;
