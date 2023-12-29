import React, { useEffect } from 'react';
import IsAuthenticated from '../functions/IsAuthenticated';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import GetUserDetails from '../functions/GetUserDetails';
import { Link } from 'react-router-dom';
// import HomeHeader from '../subpages/HomeHeader';
import MaterialIcon from 'material-icons-react';
// import HomeBody2 from '../subpages/HomeBody2';
import '../css/Home.css';
import logo from '../images/logo.webp';
import Left from '../subpages/Left';
import { useState } from 'react';
const HomePage = () => {
  const navigate = useNavigate();
  const { authenticated, loading } = IsAuthenticated();
  // const [cookies, setCookie, removeCookie] = useCookies(['token']);
  if (!authenticated) {
    navigate('/login');
  }

  // const logout = () => {
  //   removeCookie('token');
  //   navigate('/login');
  // };
  const { userDetails } = GetUserDetails();
  const [data, setData] = useState([]);
  const [studentAttendance, setStudentAttendance] = useState({});

  // Update the checked state for a student by their ID
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
        'http://localhost:4000/api/updateAttendance',
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
        const response = await fetch('http://localhost:4000/api/students');
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

  let sno = 1;
  // change department here
  // const department = data.filter((item) => item.department === 'ECE');
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
                <div className="home-right">
                  <div className="home-right-header">
                    <h1>ECE B Class Attendance</h1>
                    <button
                      className="home-submit-button"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>

                  <table>
                    <tr>
                      <th>S.No</th>
                      <th>Name</th>
                      <th>Department</th>
                      <th>Section</th>
                      <th>Roll No</th>
                      <th>Present?</th>
                      <th>On Duty</th>
                    </tr>

                    {department.map((item) => (
                      <tr key={item._id}>
                        <td>{sno++}</td>
                        <td>{item.name}</td>
                        <td>{item.department}</td>
                        <td>{item.section}</td>
                        <td>{item.rollNo}</td>
                        <td>
                          <input
                            type="checkbox"
                            onChange={() => handleCheckboxChange(item._id)}
                            checked={studentAttendance[item._id] || false}
                          />
                        </td>
                        <td>
                          <input type="checkbox" />
                        </td>
                      </tr>
                    ))}
                  </table>
                </div>
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
