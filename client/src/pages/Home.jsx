import React from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import Left from '../subpages/Left';
const Home = () => {
  const { userDetails } = GetUserDetails();
  return (
    <>
      <div className="home-home_page">
        {userDetails ? (
          <>
            <div className="home-container">
              <div className="home-dashboard">
                <Left
                  iconBg1="#3D3B40"
                  iconText1="white"
                  iconBg2=""
                  iconText2=""
                  iconBg3=""
                  iconText3=""
                  iconBg4=""
                  iconText4=""
                  iconBg5=""
                  iconText5=""
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

export default Home;
