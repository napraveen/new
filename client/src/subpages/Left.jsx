import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.webp';
import MaterialIcon from 'material-icons-react';
import GetUserDetails from '../functions/GetUserDetails';
const Left = ({ iconBg1, iconBg2, iconBg3, iconBg4 }) => {
  const { userDetails } = GetUserDetails();
  return (
    <div className="left">
      <div className="logo">
        <Link to="#" id="logo">
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
      <div className="sidebar">
        <Link to="#">
          <div className="group-icon-text" style={{ backgroundColor: iconBg1 }}>
            <div className="icons-bg" id="dashboard-id" onclick="active()">
              <span className="material-symbols-outlined">
                <MaterialIcon icon="dashboard" id="icon-color-1" />
              </span>
            </div>
            <p>Dashboard</p>
          </div>
        </Link>
        <Link to="#">
          <div className="group-icon-text" style={{ backgroundColor: iconBg2 }}>
            <div className="icons-bg">
              <span className="material-symbols-outlined">
                <MaterialIcon icon="person" id="icon-color-2" />
              </span>
            </div>
            <p>Attendance</p>
          </div>
        </Link>
        <Link to="#">
          <div className="group-icon-text" style={{ backgroundColor: iconBg3 }}>
            <div className="icons-bg">
              <span className="material-symbols-outlined">
                <MaterialIcon icon="calendar_today" id="icon-color-3" />
              </span>
            </div>
            <p>Calendar</p>
          </div>
        </Link>

        <Link to="#">
          <div className="group-icon-text" style={{ backgroundColor: iconBg4 }}>
            <div className="icons-bg">
              <span className="material-symbols-outlined">
                <MaterialIcon icon="settings" id="icon-color-4" />
              </span>
            </div>
            <p>Settings</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Left;
