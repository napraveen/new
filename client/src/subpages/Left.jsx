import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpeg';
import MaterialIcon from 'material-icons-react';
import GetUserDetails from '../functions/GetUserDetails';
import Attendance from '../pages/Attendance';
const Left = ({
  iconBg1,
  iconText1,
  iconBg2,
  iconText2,
  iconBg3,
  iconText3,
  iconBg4,
  iconText4,
  iconBg5,
  iconText5,
}) => {
  const { userDetails } = GetUserDetails();
  return (
    <div className="home-left">
      <div className="home-logo">
        <Link to="#" id="home-logo">
          <img src={logo} alt="" />
          <span>
            {userDetails ? (
              //change this line as needed
              <h2>{userDetails.username}</h2>
            ) : (
              <h2>Loading...</h2>
            )}
          </span>
        </Link>
      </div>
      <div className="home-sidebar">
        <Link to="/">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg1 }}
          >
            <div
              className="home-icons-bg"
              id="home-dashboard-id"
              onclick="active()"
            >
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="dashboard" id="home-icon-color-1" />
              </span>
            </div>
            <p style={{ color: iconText1 }}>Dashboard</p>
          </div>
        </Link>
        <Link to="/attendance">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg2 }}
          >
            <div className="home-icons-bg">
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="person" id="home-icon-color-2" />
              </span>
            </div>
            <p style={{ color: iconText2 }}>Attendance</p>
          </div>
        </Link>
        <Link to="/edit">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg3 }}
          >
            <div className="home-icons-bg">
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="edit" id="home-icon-color-4" />
              </span>
            </div>
            <p style={{ color: iconText3 }}>Edit</p>
          </div>
        </Link>
        <Link to="#">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg4 }}
          >
            <div className="home-icons-bg">
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="calendar_today" id="home-icon-color-3" />
              </span>
            </div>
            <p style={{ color: iconText4 }}>Calendar</p>
          </div>
        </Link>

        <Link to="#">
          <div
            className="home-group-icon-text"
            style={{ backgroundColor: iconBg5 }}
          >
            <div className="home-icons-bg">
              <span className="home-material-symbols-outlined">
                <MaterialIcon icon="settings" id="home-icon-color-4" />
              </span>
            </div>
            <p style={{ color: iconText5 }}>Settings</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Left;
