import React, { useState } from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import Left from '../subpages/Left';
import { Link } from 'react-router-dom';
import '../css/edit.css';
import axios from 'axios';
const Home = () => {
  const { userDetails } = GetUserDetails();
  const [isAddStudentClassClicked, setisAddStudentClassClicked] =
    useState(true);
  const [isRemoveStudentClassClicked, setisRemoveStudentClassClicked] =
    useState(true);
  const [registerNo, setRegisterNo] = useState('');
  const [studentFound, setStudentFound] = useState('');

  const addStudentClass = () => {
    setisAddStudentClassClicked(!isAddStudentClassClicked);
  };
  const removeStudentClass = () => {
    setisRemoveStudentClassClicked(!isRemoveStudentClassClicked);
  };
  const studentFormClass = {
    display: isAddStudentClassClicked ? 'none' : 'block',
  };

  const studentRemoveClass = {
    display: isRemoveStudentClassClicked ? 'none' : 'block',
  };

  const findStudent = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/findstudent/${registerNo}`
      );
      if (response.ok) {
        const student = await response.json();
        setStudentFound(student.found);
        console.log(student);
      } else {
        setStudentFound(null); // Reset the state when student is not found
        console.log('Student not found');
      }
    } catch (error) {
      console.error('Error finding student:', error);
    }
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

  const handleRegisterNo = (e) => {
    setRegisterNo(e.target.value);
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
                  <div className="edit-add-a-student" onClick={addStudentClass}>
                    <p>Add a student</p>
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
                        placeholder="Roll No"
                      />
                      <input
                        type="text"
                        name="registerNo"
                        value={studentData.registerNo}
                        onChange={handleChange}
                        placeholder="Register No"
                      />
                      <input
                        type="text"
                        name="mobileNo"
                        value={studentData.mobileNo}
                        onChange={handleChange}
                        placeholder="Mobile No"
                      />
                      <button type="submit">Submit</button>
                    </form>
                  </div>

                  <div
                    className="edit-remove-a-student"
                    onClick={removeStudentClass}
                  >
                    <p>Remove a student</p>
                  </div>

                  <div
                    style={studentRemoveClass}
                    className="edit-remove-student"
                  >
                    <input
                      type="text"
                      placeholder="Register number"
                      value={registerNo}
                      onChange={handleRegisterNo}
                    />
                    <button type="submit" onClick={findStudent}>
                      Submit
                    </button>
                    {studentFound ? (
                      <div className="edit-found-student-details">
                        <table>
                          <tr>
                            <th>Name</th>
                            <th>Year</th>
                            <th>Department</th>
                            <th>Section</th>
                            <th>Roll No</th>
                            <th>Edit</th>
                          </tr>
                          <td>{studentFound.name}</td>
                          <td>{studentFound.year}</td>
                          <td>{studentFound.department}</td>
                          <td>{studentFound.section}</td>
                          <td>{studentFound.rollNo}</td>
                          <td style={{ color: 'red' }}>Remove</td>
                        </table>
                      </div>
                    ) : (
                      <h1>&nbsp;</h1>
                    )}
                    {/* <p>Hi</p> */}
                  </div>
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
