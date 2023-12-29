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

  return (
    <>
      <div className="home_page">
        {userDetails ? (
          <>
            <div className="container">
              <div className="dashboard">
                <Left iconBg1="yellow" iconBg2="" iconBg3="" iconBg4="" />
                <div className="right">
                  {data.map((item) => (
                    <h1>{item.name}</h1>
                  ))}
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
