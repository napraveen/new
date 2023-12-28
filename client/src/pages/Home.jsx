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

  return (
    <>
      <div className="home_page">
        {userDetails ? (
          <>
            <div className="container">
              <div className="dashboard">
                <Left iconBg1="yellow" iconBg2="" iconBg3="" iconBg4="" />
                <div className="right">Hello world</div>
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
