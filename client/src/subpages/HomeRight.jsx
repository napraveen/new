import React from 'react';
import GetUserDetails from '../functions/GetUserDetails';
import { useEffect, useState } from 'react';
const HomeRight = ({
  department,
  handleSubmit,
  handleCheckboxChange,
  studentAttendance,
  submissionStatus,
}) => {
  let sno = 1;
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDetailsData = await GetUserDetails();
        setUserDetails(userDetailsData);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchData();
  }, []);

  const newDate = new Date().toISOString().slice(0, 10);
  const todayPresentStudents = department.filter(
    (item) => item.presentDates[item.presentDates.length - 1] === newDate
  );
  // console.log('today present', presenttodaystudents);

  return (
    <div className="home-right">
      <div className="home-right-header">
        <h1>
          {department[0].department} {department[0].section} Class Attendance
        </h1>
        {submissionStatus ? (
          <div className="home-submit-div">
            <div id="home-tick">&#10004;</div> &nbsp;Submitted
          </div>
        ) : (
          <button className="home-submit-button" onClick={handleSubmit}>
            Submit
          </button>
        )}
      </div>

      <table>
        <tr>
          <th>S.No</th>
          <th>Name</th>
          <th>Department</th>
          <th>Section</th>
          <th>Roll No</th>
          <th>Present?</th>
        </tr>

        {department.map((item) => (
          <tr key={item._id}>
            <td>{sno++}</td>
            <td>{item.name}</td>
            <td>{item.department}</td>
            <td>{item.section}</td>
            <td>{item.rollNo}</td>
            {todayPresentStudents.some(
              (student) => student._id === item._id
            ) ? (
              <td style={{ backgroundColor: 'rgb(146, 255, 132)' }}>Present</td>
            ) : (
              <td style={{ backgroundColor: 'rgb(254, 158, 158)' }}>Absent</td>
            )}
          </tr>
        ))}
      </table>
    </div>
  );
};

export default HomeRight;
