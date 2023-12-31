import React, { useState } from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import Left from '../subpages/Left';
import { Link } from 'react-router-dom';
import '../css/edit.css';
import axios from 'axios';
const Home = () => {
  const { userDetails } = GetUserDetails();
  const [isAddStudentClassClicked, setisAddStudentClassClicked] =
    useState(false);

  const addStudentClass = () => {
    setisAddStudentClassClicked(!isAddStudentClassClicked);
  };
  const studentFormClass = {
    display: isAddStudentClassClicked ? 'none' : 'block',
  };

  const [studentData, setStudentData] = useState({
    name: '',
    year: '',
    department: '',
    section: '',
    departmentId: '',
    rollNo: '',
    registerNo: '',
    mobileNo: '',
  });

  const handleSubmitAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/addstudents', studentData); // Assuming your Express server is running at the same origin
      // Clear form after successful submission
      setStudentData({
        name: '',
        year: '',
        department: '',
        section: '',
        departmentId: '',
        rollNo: '',
        registerNo: '',
        mobileNo: '',
      });
    } catch (err) {
      console.error('Error adding student:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };
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
                  iconBg2=""
                  iconText2=""
                  iconBg3="#3D3B40"
                  iconText3="white"
                  iconBg4=""
                  iconText4=""
                  iconBg5=""
                  iconText5=""
                />
                <div className="edit-right">
                  <div onClick={addStudentClass}>
                    <p>add a student</p>
                  </div>

                  <div style={studentFormClass} className="edit-add-student">
                    <form onSubmit={handleSubmitAddStudent}>
                      <input
                        type="text"
                        name="name"
                        value={studentData.name}
                        onChange={handleChange}
                        placeholder="Name"
                      />
                      <input
                        type="text"
                        name="year"
                        value={studentData.year}
                        onChange={handleChange}
                        placeholder="Year of Study"
                      />
                      <input
                        type="text"
                        name="department"
                        value={studentData.department}
                        onChange={handleChange}
                        placeholder="Department"
                      />
                      <input
                        type="text"
                        name="section"
                        value={studentData.section}
                        onChange={handleChange}
                        placeholder="Section"
                      />
                      <input
                        type="text"
                        name="departmentId"
                        value={studentData.departmentId}
                        onChange={handleChange}
                        placeholder="DepartmentId"
                      />
                      <input
                        type="text"
                        name="rollNo"
                        value={studentData.rollNo}
                        onChange={handleChange}
                        placeholder="rollNo"
                      />
                      <input
                        type="text"
                        name="registerNo"
                        value={studentData.registerNo}
                        onChange={handleChange}
                        placeholder="registerNo"
                      />
                      <input
                        type="text"
                        name="mobileNo"
                        value={studentData.mobileNo}
                        onChange={handleChange}
                        placeholder="mobileNo"
                      />
                      <button type="submit">Submit</button>
                    </form>
                  </div>
                  <p>vs</p>
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

export default Home;
